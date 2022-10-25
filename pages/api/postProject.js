const { MongoClient } = require('mongodb')
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {


  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });


  console.log("request_body :",req.body);
  try {

    console.log("req_body :",req.body);
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const cnic = req.body.cnic
    const phoneno = req.body.phoneno
    const email = req.body.email
    const tempaddress = req.body.tempaddress
    const permaddress = req.body.permaddress
    const address = req.body.address
    const businessname = req.body.businessname
    const title = req.body.title
    const raisegoal = req.body.raisegoal
    const term = req.body.term
    const returnpercentage = req.body.returnpercentage
    const linkedhandle = req.body.linkedhandle
    const instahandle = req.body.instahandle
    const fbhandle = req.body.fbhandle
    const websitelink = req.body.websitelink
    const description = req.body.description
    const youtubelink = req.body.youtubelink

    const status = 'pending'
    const logo = req.body.logo
    const photoidfront = req.body.photoidfront
    const photoidback = req.body.photoidback

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.vzlal.mongodb.net/`
    )

    const db = client.db('bedrock')
    const collection = db.collection(process.env.MONGODB_COLLECTION_PROJECTS)

    const newUser = {
      firstname,
      lastname,
      cnic,
      phoneno,
      email,
      tempaddress,
      permaddress,
      address,
      businessname,
      title,
      raisegoal,
      term,
      returnpercentage,
      linkedhandle,
      instahandle,
      fbhandle,
      websitelink,
      description,
      youtubelink,
      status,
      logo,
      photoidfront,
      photoidback,
    }

    await collection.insertOne(newUser, (err, result) => {
      client.close()
      console.log(err)
      if (err) {
        return res.status(500).json({ message: 'Project Error', err })
      }
      return res.status(200).json({ message: 'Project Added', result })
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Project Error', err })
  }
}
