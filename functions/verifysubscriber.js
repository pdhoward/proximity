require('dotenv').config()

/////////////////////////////////////////////////
///   Handle Beta and Newsletter subscribers  //
//      copyright 2020 Strategic Machines    //
//////////////////////////////////////////////

// logic for verifying a subscriber
const {createConnection} =  require('./db/connection')
const {createClient} =      require('./db/client')
const {isConnected} =       require('./db/isConnected')

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
  let subObj = JSON.parse(event.body) 
      
  try {
    
    let compareToken = parseInt(subObj.userToken)
    // if match, update verified to true else no update    
    if (subObj.token == compareToken) {
        subObj.isVerified = true
        subObj.timestamp = Date.now()
        const response = await client.verifySubscriber(subObj)        
    }
    return {
      headers: {
        'Content-Type': 'application/json'        
      },
      statusCode: 200,
      body: JSON.stringify(subObj)
    }
    
  } catch(err) {
    console.log(`Database error ${err}`)
    return {
      headers: {
        'Content-Type': 'application/json'        
      },
      statusCode: 500,
      body: JSON.stringify({msg: err.message})
    }
  } 
}
