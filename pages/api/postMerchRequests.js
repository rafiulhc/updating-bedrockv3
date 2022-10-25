const { MongoClient } = require('mongodb')

export default async function handler(req, res) {
  const { address, txHash, mailed, mailingaddress, rewardType } = req.body

  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
    )

    const db = client.db('bedrock')
    const collection = db.collection(process.env.MONGODB_COLLECTION_MERCH)

    const newMerchReq = {
      address,
      txHash,
      mailed,
      mailingaddress,
      rewardType,
    }

    await collection.insertOne(newMerchReq, (err, result) => {
      client.close()
      if (err) {
        return res.status(500).json({ message: 'Merch Request Error', err })
      }
      return res.status(200).json({ message: 'Merch Request Sent', result })
    })
  } catch {
    ;(err) => console.log(err)
  }
}
