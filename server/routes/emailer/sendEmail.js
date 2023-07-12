const axios = require('axios')
const { emailPass } = require("../../safe/safe")


exports.sendEmail = (from, to, theme, msg, callback)=>{

  let emailData = JSON.parse(JSON.stringify(
    { pass: emailPass, from, to, theme, msg }
  ))
  
  axios.post( 'https://bz83.usermd.net/', emailData )
    .then( (bzMailData)=> callback( bzMailData ) )
    .catch( (err)=> console.log('err',err) )

}