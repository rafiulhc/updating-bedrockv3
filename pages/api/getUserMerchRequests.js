const { MongoClient } = require('mongodb')

export default async function handler(req, res) {
  console.log('backend merch ', req.query.acc)
  try {
    const acc = req.query.acc

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
    )
    const db = client.db('bedrock')
    const collection = db.collection(process.env.MONGODB_COLLECTION_MERCH)
    const merchrequests = await collection.find({ address: acc }).toArray()
    client.close()

    return res.status(200).json({
      message: 'Retrieved',
      merchrequests,
    })
  } catch {
    ;(err) => console.log(err)
  }
}
