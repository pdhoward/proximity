// Disable enter key on input

(function($) {
  const completed = `<h5 style="color: black; text-align: center; line-height: 1.75rem">Your email is already on file. Thank you for applying for the beta program. There are a limited number of slots for early access, and we will contact you if approved. </h5>
  <div class="center-button mt-4"><a href="/" class="btn btn-primary">Home</a></div>`
  const verified = `<h5 style="color: black; text-align: center; line-height: 1.75rem">Your account is verified. Thank you for applying for the Beta program! There are a limited number of slots for early access, and we will contact you if approved. </h5>
  <div class="center-button mt-4"><a href="/" class="btn btn-primary">Home</a></div>`   
  const notverified = `<h5 style="color: black; text-align: center; line-height: 1.75rem">The verification code you entered does not match. Please try again!</h5>
  <div class="center-button mt-4"><a href="/pages/index.html" class="btn btn-primary">Home</a></div>`
  let em

function stopEnterKey(evt) {
  var evt = evt ? evt : event ? event : null;
  var node = evt.target ? evt.target : evt.srcElement ? evt.srcElement : null;
  if (evt.keyCode == 13 && node.type == "text") {
    return false;
  }
}
document.onkeypress = stopEnterKey;

const processBeta = (form, e) => {
  let obj = {}
  obj.name = document.getElementById('name').value
  obj.email = document.getElementById('email').value
  obj.coname = document.getElementById('coname').value
  obj.website = document.getElementById('website').value
  obj.sector = document.getElementById('sector').value
  obj.comments = document.getElementById('comments').value
  console.log(`---------STEP 1 - PROCESS Form ---`)  
  
  return fetch(`/.netlify/functions/betasubscriber`, {
    headers: {
      'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(obj)
  })
  .then( async (result) => {
    console.log(`-----STEP 2 - SWITCH FORMS ----`)
    //console.log(result)
    //const response = await result.json()
    em = await result.json()
    console.log(em)

    // Switch forms. If already a verified subscriber, then all done
    if (!em.isVerified) {
      $('#betaform').css('display','none');
      $('#betaverify').css('display','inline');
    } else {
      form.innerHTML = completed;
    }         
                  
    return {message: 'success'}
  })
  .catch(error => {
    form.innerHTML = `<div class="form--error">Error: ${error}</div>`;
  })

}

const processEmailAuth = (form, e) => {         
  const code = document.getElementById('verify').value
  console.log(`------Match Tokens, Verify email-----`)
  console.log(code)
  em.userToken = code
  fetch(`/.netlify/functions/verifysubscriber`, {
    headers: {
      'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(em)
  })
  .then( async (result) => {
    console.log(`------FINISHED VERIFICATION -----`)       
    const response = await result.json()
    console.log(response)
    // switch forms
    if (!response.isVerified) {
      form.innerHTML = notverified;
    } else {
      form.innerHTML = verified;
    }
    return {message: 'success'}
  })
  .catch(error => {
    form.innerHTML = `<div class="form--error">Error: ${error}</div>`;
  })
}

// submit newletter form
betaform.onsubmit = async (e) => {
  e.preventDefault()
  let result = await processBeta(betaform, e)
  console.log(result)
}

betaverify.onsubmit = async (e) => {
  e.preventDefault()
  let result = await processEmailAuth(betaverify, e)
  console.log(result)
}
})(jQuery)