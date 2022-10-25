const Web3 = require('web3')
const { MongoClient } = require('mongodb')
const { Transaction } = require('ethereumjs-tx')
const BigNumber = require('bignumber.js')
const Common = require('@ethereumjs/common')
const erc20Abi = require(__dirname + '/utils/erc20Abi.json')

const BEDROCK_ADDRESS = process.env.BEDROCK_CONTRACT
const REWARD_WALLET = process.env.REWARDS_WALLET
const REWARD_WALLET_KEY = process.env.REWARDS_WALLET_KEY
const common = Common.default.forCustomChain(
  'mainnet',
  {
    name: 'BSC',
    networkId: process.env.NETWORK_ID,
    chainId: process.env.NETWORK_ID,
  },
  'petersburg'
)

// Reentrancy guard
const reentrancyGuarded = {}

export default async function handler(req, res) {
  const referrer = req.body.referrer || ''

  if ([referrer].includes('')) {
    return res
      .status(400)
      .json({ message: 'One of the required fields were left empty.' })
  }
  if (reentrancyGuarded[referrer]) {
    return res.status(403).json({ message: 'Redemption in progress' })
  }
  const web3 = new Web3(process.env.RPC_URL)

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
  )
  const db = client.db('bedrock')
  const collection = db.collection(process.env.MONGODB_COLLECTION_REFERRALS)
  const referrals = await collection
    .find({ referrer, claimed: false })
    .toArray()

  let rewardAmount = new BigNumber(0)
  for (let i = 0; i < referrals.length; i++) {
    const referral = referrals[i]
    if (parseInt(referral.stakeTime) === 6 * 2592000) {
      rewardAmount = new BigNumber(rewardAmount).plus(
        new BigNumber(referral.amount).multipliedBy(0.02)
      )
    } else if (parseInt(referral.stakeTime) === 12 * 2592000) {
      rewardAmount = new BigNumber(rewardAmount).plus(
        new BigNumber(referral.amount).multipliedBy(0.05)
      )
    }
  }
  rewardAmount = rewardAmount.toFixed()

  const txCount = await web3.eth.getTransactionCount(REWARD_WALLET)
  if (!parseInt(txCount) && parseInt(txCount) != 0) {
    client.close()
    return res.status(500).json({ message: 'Unable to get rewarder nonce.' })
  }

  const bedrockContract = new web3.eth.Contract(erc20Abi, BEDROCK_ADDRESS)
  const txObject = {
    to: BEDROCK_ADDRESS,
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(1000000),
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    data: bedrockContract.methods.transfer(referrer, rewardAmount).encodeABI(),
  }

  if (rewardAmount == 0) {
    client.close()
    return res
      .status(400)
      .json({ message: 'User does not have any pending rewards!' })
  }

  const tx = new Transaction(txObject, { common })
  tx.sign(Buffer.from(REWARD_WALLET_KEY, 'hex'))

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  var error = null
  var transaction = null
  try {
    transaction = await web3.eth.sendSignedTransaction(raw)
  } catch (err) {
    console.log('caught', err)
    error = err
  }

  if (error) {
    client.close()
    return res.status(500).json({
      message: 'Error while sending signed transaction!',
      error,
    })
  }

  const result = await collection.updateMany(
    { referrer },
    { $set: { claimed: true } }
  )
  delete reentrancyGuarded[referrer]
  client.close()

  return res.status(200).json({
    message: `Successfully redeemed ${Math.floor(
      rewardAmount / 10 ** 18
    )} ROCK`,
    transaction,
    result,
  })
}
