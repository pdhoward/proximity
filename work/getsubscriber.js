
// setup for proxy of functions
// https://medium.com/@chimera.zen/how-to-make-a-crud-with-netlify-create-react-app-mongodb-atlas-12adc99610e#6ed3
const {createConnection} =  require('./api/connection')
const {createClient} =      require('./api/server')
const {isConnected} =       require('./api/isConnected')

let conn

exports.handler = async function(event, context) {
  let client 
  if (isConnected(conn)) {
    console.log(`-------------using connection`)
    client = await createClient(conn)
  } else {
    console.log(`------------creating connection`)
    conn = await createConnection()
    client = await createClient(conn)
  }
      
  try {    
    const res = await client.getImages()      
    return {
      statusCode: 200,
      body: JSON.stringify(res)
    }
    
  } catch(err) {
    console.log(`Database error ${err}`)
    return {
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  } 
}
