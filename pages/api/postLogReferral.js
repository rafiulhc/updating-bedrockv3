const Web3 = require('web3')
const { MongoClient } = require('mongodb')

export default async function handler(req, res) {
  const transaction = req.body.transaction || ''
  const referrer = req.body.referrer || ''

  
  if ([transaction, referrer].includes('')) {
    return res
      .status(400)
      .json({ message: 'One of the required fields were left empty.' })
  }
  const web3 = new Web3(process.env.RPC_URL)

  const txn = await web3.eth.getTransaction(transaction)
  
  const input_data = '0x' + txn.input.slice(10)
  const params = web3.eth.abi.decodeParameters(
    ['uint256', 'uint256'],
    input_data
  )
  const block = await web3.eth.getBlock(txn.blockNumber)
  const refObj = {
    timestamp: block.timestamp,
    transaction,
    referrer,
    referred: txn.from,
    amount: params[0],
    stakeTime: params[1],
    claimed: false,
  }

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
  )
  const db = client.db('bedrock')
  const collection = db.collection(process.env.MONGODB_COLLECTION_REFERRALS)

  const firstEntry = await collection
    .find({ referrer, referred: txn.from })
    .sort({ _id: 1 })
    .limit(1)
    .toArray()
  if (firstEntry.length > 0) {
    const daysDifference =
      (block.timestamp - firstEntry[0].timestamp) / (60 * 60 * 24)
    if (daysDifference >= 30) {
      client.close()
      return res.status(406).json({ message: 'Referral link expired!' })
    }
  }
  if (txn.from == referrer) {
    client.close()
    return res.status(403).json({ message: 'Cannot refer yourself!' })
  }

  await collection.insertOne(refObj, (err, result) => {
    client.close()
    if (err) {
      return res
        .status(500)
        .json({ message: 'Transaction already redeemed', err })
    }
    return res.status(200).json({ message: 'Referral recorded!', result })
  })
}
