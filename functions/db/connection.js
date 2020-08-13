require('dotenv').config()
const {MongoClient} = require('mongodb')

// Initialize connection to database
const url = process.env.ATLAS_SUBSCRIBERS || "mongodb://localhost/auth"
const options = {
        useNewUrlParser: true,       
        useUnifiedTopology: true }

exports.createConnection = async () => { 
  const client = new MongoClient(url, options)

  try {
    await client.connect()
    return client
  } catch(err) {
    console.log(err)
  }
}