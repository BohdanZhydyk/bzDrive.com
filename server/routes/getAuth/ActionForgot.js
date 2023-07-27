const { bzDB } = require('./../bzDB')
const { bzPassHash } = require('./../../safe/bcrypt')
const { getRandomInt } = require('../../functions')
const { EmailBody } = require('../emailer/EmailBody')
const { sendEmail } = require('../emailer/sendEmail')


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

          const from = "admin@bzdrive.com"
          const to = email
          const theme = "bzDrive - Forgot code..."
          const msg = EmailBody({mode:"forgot", email, login, lang, code})

          sendEmail(from, to, theme, msg, (bzMailData)=>{

            if(bzMailData.status === 200){
              res.send({ ...req?.body, result:{ chgPannel: "Confirm" } })
              return
            }

            res.send({ ...req?.body, result:{ errors: {email:"EmailNotSent"} } })
            return

          })

        })

      })

    })

  })

}