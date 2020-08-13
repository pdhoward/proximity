require('dotenv').config()
///////////////////////////////////////////////////////////////////////
/////////////////// configure chaoticbot nodemailer////////////////////
//////////////////////////////////////////////////////////////////////
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.PROXIMITY_SENDGRID);
console.log(`---------------debug sendgrid key----------`)
console.log(process.env.PROXIMITY_SENDGRID)
module.exports = sgMail;
