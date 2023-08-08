const { bzDB } = require("../bzDB")
const { bzPassHash } = require("../../safe/bcrypt")
const { getRandomInt } = require("../../functions")
const { EmailBody } = require("../emailer/EmailBody")
const { sendEmail } = require('../emailer/sendEmail')


exports.ActionSignup = (req, res)=>{

  function SEND(errors){ res.send({ ...req?.body, result:{errors} }) }

  const bzToken = req?.body?.bzToken
  const lang = req?.body?.object?.lang
  const {login, email, pass, verify} = req?.body?.object?.formData

  if(!login){ return SEND({login:"Err_1"}) }

  if(!email){ return SEND({email:"Err_1"}) }

  if(!pass){ return SEND({pass:"Err_1"}) }

  bzDB( { req, res, col:'bzUsers', act:"FIND_ONE", query:{login} }, (dbData)=>{

    if(dbData?.result){ return SEND({login:"UserPresent"}) }

    bzDB( { req, res, col:'bzUsers', act:"FIND_ONE", query:{email} }, (dbData)=>{

      if(dbData?.result){ return SEND({email:"EmailPresent"}) }
      
      const passCompare = (pass, verify, cb)=> cb(pass === verify)
      passCompare( pass, verify, (isPass)=>{

        if(!isPass){ return SEND({verify:"SamePass"}) }

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

              return SEND({email:"EmailNotSent"})

            })

          })

        })
  
      })

    })

  })

}