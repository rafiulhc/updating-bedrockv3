const { MongoClient, ObjectId } = require('mongodb')

export default async function handler(req, res) {
  try {
    const { _id, address, newmailingaddress } = req.body
    console.log(req.body)
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
    )

    const db = client.db('bedrock')
    const collection = db.collection(process.env.MONGODB_COLLECTION_MERCH)
    await collection.findOneAndUpdate(
      { _id: ObjectId(_id) },
      {
        $set: {
          mailingaddress: newmailingaddress,
        },
      },
      (err, result) => {
        client.close()
        if (err) {
          return res.status(500).json({ message: 'Merch Error', err })
        }
        return res
          .status(200)
          .json({ message: 'Merch mailing address updated', result })
      }
    )
  } catch {
    ;(err) => console.log(err)
  }
}
