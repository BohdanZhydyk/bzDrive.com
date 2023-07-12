const { bzDB } = require("../bzDB")
const { bzPassHash } = require("../../safe/bcrypt")
const { getRandomInt } = require("../../functions")
const { EmailBody } = require("../emailer/EmailBody")
const { sendEmail } = require('../emailer/sendEmail')


exports.ActionSignup = (req, res)=>{

  const formData = req?.body?.object?.formData

  const bzToken = req?.body?.bzToken
  const lang = req?.body?.object?.lang
  const login = formData?.login
  const email = formData?.email
  const pass = formData?.pass
  const verify = formData?.verify

  if(!login){
    res.send({ ...req?.body, result:{ errors: {login:"Err_1"} } })
    return
  }

  if(!email){
    res.send({ ...req?.body, result:{ errors: {email:"Err_1"} } })
    return
  }

  if(!pass){
    res.send({ ...req?.body, result:{errors: {pass:"Err_1"} } })
    return
  }

  bzDB( { req, res, col:'bzUsers', act:"FIND_ONE", query:{login} }, (dbData)=>{

    if(dbData?.result){
      res.send({ ...req?.body, result:{ errors: {login:"UserPresent"} } })
      return
    }

    bzDB( { req, res, col:'bzUsers', act:"FIND_ONE", query:{email} }, (dbData)=>{

      if(dbData?.result){
        res.send({ ...req?.body, result:{ errors: {email:"EmailPresent"} } })
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
          const role = "user"
          const sex = false
          const ava = false
          const passHash = hash
          const code = getRandomInt(100000000, 999999999)

          const user = {
            time, bzToken, act:"signup",
            confirm: { login, email, role, lang, sex, ava, pass: {passHash, code} }
          }
          
          bzDB( { req, res, col:'bzUsers', act:"INSERT_ONE", query:user }, (dbData)=>{

            const from = "admin@bzdrive.com"
            const to = email
            const theme = "bzDrive - SignIn code..."
            const msg = EmailBody({mode:"signin", email, login, lang, code})

            sendEmail(from, to, theme, msg, (bzMailData)=>{

              if(bzMailData.status === 200){
                res.send({ ...req?.body, result:{ chgPannel: "Confirm" } })
                return
              }

              res.send({ ...req?.body, result:{ errors: {email:"EmailNotSent"} } })

            })

          })

        })
  
      })

    })

  })

}