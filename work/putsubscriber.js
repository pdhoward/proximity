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
  
  const params = JSON.parse(event.body) 
  const {id, rating} = params  
  try { 
    const res = await client.postRating(id, rating)  
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

