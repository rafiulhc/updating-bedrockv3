const { MongoClient } = require('mongodb')

export default async function handler(req, res) {
  const referrer = req.query.referrer || ''
  if ([referrer].includes('')) {
    return res
      .status(400)
      .json({ message: 'One of the required fields were left empty.' })
  }

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
  )
  const db = client.db('bedrock')
  const collection = db.collection(process.env.MONGODB_COLLECTION_REFERRALS)
  const referrals = await collection
    .find({ referrer, claimed: false })
    .toArray()
  client.close()

  return res.status(200).json({
    message: 'Retrieved',
    referrals,
  })
}
