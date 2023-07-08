const axios = require('axios')
const { bzDB } = require('./../bzDB')
const { bzPassHash } = require('./../../safe/bcrypt')
const { emailPass } = require('../../safe/safe')
const { getRandomInt } = require('../../functions')
const { EmailBody } = require('./EmailBody')


exports.ActionForgot = (req, res)=>{

  const formData = req?.body?.object?.formData

  const bzToken = req?.body?.bzToken
  const email = formData?.email
  const pass = formData?.pass
  const verify = formData?.verify

  if(!email){
    res.send({ ...req?.body, result:{ errors: {email:"Err_1"} } })
    return
  }

  if(!pass){
    res.send({ ...req?.body, result:{errors: {pass:"Err_1"} } })
    return
  }

  bzDB( { req, res, col:'bzUsers', act:"FIND_ONE", query:{email} }, (dbData)=>{

    if(!dbData?.result){
      res.send({ ...req?.body, result:{ errors: {email:"EmailNotPresent"} } })
      return
    }
    
    const passCompare = (pass, verify, cb)=> cb(pass === verify)
    passCompare( pass, verify, (isPass)=>{

      if(!isPass){
        res.send({ ...req?.body, result:{ errors: {verify:"SamePass"} } })
        return
      }
      
      bzPassHash(pass, (hash) => {

        const time = Date.now()
        const login = dbData?.result?.login
        const email = dbData?.result?.email
        const role = dbData?.result?.role
        const lang = dbData?.result?.lang
        const sex = dbData?.result?.sex
        const ava = dbData?.result?.ava
        const passHash = hash
        const code = getRandomInt(100000000, 999999999)

        const user = {
          time, bzToken, act:"forgot",
          confirm: { login, email, role, lang, sex, ava, pass: {passHash, code} }
        }
        
        bzDB( { req, res, col:'bzUsers', act:"INSERT_ONE", query:user }, (dbData)=>{

          let emailData = JSON.parse(JSON.stringify(
            {
              pass: emailPass,
              from: "admin@bzdrive.com",
              to: email,
              theme: "bzDrive - Forgot code...",
              msg: EmailBody({mode:"forgot", email, login, lang, code})
            }
          ))

          axios.post( 'https://bz83.usermd.net/', emailData ).then( (bzMailData)=>{

            if(bzMailData.status === 200){
              res.send({ ...req?.body, result:{ chgPannel: "Confirm" } })
              return
            }

            res.send({ ...req?.body, result:{ errors: {email:"EmailNotSent"} } })

          }).catch( (err)=> console.log('err',err) )

        })

      })

    })

  })

}