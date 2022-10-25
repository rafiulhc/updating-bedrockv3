const { MongoClient } = require('mongodb')
import NextCors from 'nextjs-cors'

const { releaseBitcoin } = require(__dirname + '/utils/releaseBitcoin')

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  const wallet = req.query.wallet || ''

  const nextRelease = await releaseBitcoin()

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
  )
  const db = client.db('bedrock')
  const collection = db.collection(process.env.MONGODB_COLLECTION_BITCOINSTAKE)
  const staked = await collection.find({ wallet }).toArray()
  // client.close();
  return res.status(201).json({
    message: 'Retrieved',
    staked,
    moderatorWallet: process.env.BTC_MOD_WALLET,
    nextRelease,
  })
}
