const { MongoClient } = require('mongodb')

export default async function handler(req, res) {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
    )

    const db = client.db('bedrock')
    const collection = db.collection(process.env.MONGODB_COLLECTION_ADMINS)
    const admins = await collection.find().toArray()
    client.close()
    return res.status(200).json({ message: 'Retrieved', admins })
  } catch (error) {
    console.log(error)
  }
}
