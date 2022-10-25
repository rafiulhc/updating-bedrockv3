const { MongoClient } = require('mongodb')
const Web3 = require('web3')
const BigNumber = require('bignumber.js')
const btcStakeAbi = require(__dirname + '/utils/rockBitcoin.json')

export default async function handler(req, res) {
  const wallet = req.body.wallet || ''
  const proof = req.body.proof || ''
  const value = req.body.value || 0.001

  if ([wallet, proof].includes('')) {
    return res
      .status(400)
      .json({ message: 'One of the required fields were left empty.' })
  }
  const web3 = new Web3(process.env.RPC_URL)

  const reciept = await web3.eth.getTransactionReceipt(proof)
  const tx = await web3.eth.getTransaction(proof)
  const block = await web3.eth.getBlock(tx.blockNumber)
  const transaction = { ...tx, ...reciept, timestamp: block.timestamp }

  if (!transaction.status) {
    return res.status(403).json({ message: 'Fee transaction not mined yet!' })
  }
  if (Date.now() / 1000 - transaction.timestamp > 60 * 15) {
    return res.status(403).json({ message: 'Fee transaction too old!' })
  }
  if (
    transaction.to.toLowerCase() !== process.env.BTC_MOD_WALLET.toLowerCase()
  ) {
    return res.status(403).json({ message: 'Fee not sent to the moderator!' })
  }
  if (parseInt(transaction.value) < value) {
    return res.status(403).json({ message: 'Insufficient gas fee!' })
  }

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
  )
  const db = client.db('bedrock')

  const collection = db.collection(process.env.MONGODB_COLLECTION_BITCOINSTAKE)
  const staked = await collection.find({ wallet }).toArray()

  if (staked.length == 0 || staked[0].amount <= 0) {
    return res.status(403).json({ message: 'No pending rewards!' })
  }

  const rewardAmount = new BigNumber(staked[0].amount).toString()

  await collection.findOneAndUpdate(
    { wallet },
    {
      $set: {
        amount: '0',
      },
    }
  )

  try {
    const contract = new web3.eth.Contract(
      btcStakeAbi,
      process.env.BTCSTAKING_CONTRACT
    )

    const nonce = await web3.eth.getTransactionCount(
      process.env.BTC_MOD_WALLET,
      'latest'
    )

    const tx = {
      from: process.env.BTC_MOD_WALLET,
      to: process.env.BTCSTAKING_CONTRACT,
      nonce: nonce,
      gas: 500000,
      data: contract.methods.claimBitcoin(wallet, rewardAmount).encodeABI(),
    }
    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      process.env.BTC_MOD_WALLET_KEY
    )
    const transactionReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    )

    const releases = db.collection(
      process.env.MONGODB_COLLECTION_BITCOINRELEASE
    )
    var rel = await releases.find({ key: 'rel' }).toArray()
    rel = rel[0].value

    const oldUnclaimed = new BigNumber(rel[1])
    await releases.findOneAndUpdate(
      { key: 'rel' },
      {
        $set: {
          value: [rel[0], oldUnclaimed.minus(rewardAmount).toString()],
        },
      }
    )

    client.close()
    return res.status(200).json({
      message: 'Transaction reciept recieved',
      transactionReceipt,
    })
  } catch (error) {
    await collection.findOneAndUpdate(
      { wallet },
      {
        $set: {
          amount: rewardAmount,
        },
      }
    )
    client.close()
    return res.status(500).json({ message: 'Server errored', error })
  }
}
