require('dotenv').config()

/////////////////////////////////////////////////
///   Handle Beta and Newsletter subscribers  //
//      copyright 2020 Strategic Machines    //
//////////////////////////////////////////////

import fetch from 'node-fetch'
const { EMAIL_TOKEN } = process.env

exports.handler = async (event, context, cb) => {  
    
  let subscriber = JSON.parse(event.body)  
 
  try {
    let response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${EMAIL_TOKEN}`        
        },
      body: JSON.stringify(subscriber)
      })
     
    let data = await response.json()
    
    return {
      headers: {
        'Content-Type': 'application/json'        
      },
      statusCode: 201,
      body: JSON.stringify(data),
    }   
  } catch(err) {
    console.log(`FUNCTION ERROR`)
    return {
      headers: {
        'Content-Type': 'application/json'        
      },
      statusCode: 400,
      body: JSON.stringify(err)
    } 
  }
}
