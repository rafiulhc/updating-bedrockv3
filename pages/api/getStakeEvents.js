const { MongoClient } = require('mongodb')
const Web3 = require('web3')
const calculateStakes = require(__dirname + '/utils/calculateStakes')

export default async function handler(req, res) {
  const web3 = new Web3(process.env.RPC_URL)
  const latestBlock = await web3.eth.getBlockNumber()
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
    )
    const db = client.db('bedrock')
    const collection = db.collection(process.env.MONGODB_COLLECTION_CONFIG)
    const stakes = await collection.findOne({ key: 'stakes' })
    await client.close()

    
    if (latestBlock - stakes.value.lastBlockFetched >= 10000) {
      calculateStakes(stakes.value.lastBlockFetched, latestBlock)
    }

    return res.status(200).json({ message: 'Retrieved', stakes })
  } catch (err) {
    return res.status(500).json({ message: 'Server errored!', err })
    console.log(err)
  }
}
