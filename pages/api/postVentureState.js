const { MongoClient, ObjectId } = require('mongodb')

export default async function handler(req, res) {
  try {
    const { id, status } = req.body
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
    )

    const db = client.db('bedrock')
    const collection = db.collection(process.env.MONGODB_COLLECTION_PROJECTS)
    await collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { venturestate: status } },
      (err, result) => {
        client.close()
        if (err) {
          return res.status(500).json({ message: 'Project Error', err })
        }
        return res.status(200).json({ message: 'Venture State Updated' })
      }
    )
  } catch {
    ;(err) => console.log(err)
  }
}
