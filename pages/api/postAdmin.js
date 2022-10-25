const { MongoClient } = require('mongodb')

export default async function handler(req, res) {
  try {
    const { account, state } = req.body

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
    )

    const db = client.db('bedrock')
    const collection = db.collection(process.env.MONGODB_COLLECTION_ADMINS)

    var acknowledgement = 'unknown'
    if (!state || !eval(state)) {
      acknowledgement = await collection.deleteMany({ account })
    } else {
      acknowledgement = await collection.insertOne({ account })
    }
    client.close()
    res.status(200).json({ acknowledgement })
  } catch (error) {
    res.status(500).json({ error })
  }
}
