const { ObjectId } = require('mongodb')
const { bzDB } = require("../bzDB")
const { adminEmailAddr } = require('../../safe/safe')
const { EmailBody } = require('../emailer/EmailBody')
const { sendEmail } = require('../emailer/sendEmail')


exports.ActionConfirm = (req, res)=>{

  function SEND(errors){ res.send({ ...req?.body, result:{errors} }) }

  const bzToken = req?.body?.bzToken
  const lang = req?.body?.object?.lang
  const confirm = req?.body?.object?.formData?.confirm
  const query = { bzToken, confirm:{$exists: true} }

  if(!confirm){ return SEND({confirm:"Err_1"}) }

  bzDB( { req, res, col:'bzUsers', act:"FIND", query }, (dbData)=>{

    const result = dbData?.result[0]
    const act = result?.act
    const confirmData = result?.confirm
    const code = confirmData?.pass?.code
    const login = confirmData?.login
    const email = confirmData?.email
    const pass = confirmData?.pass?.passHash

    if(!confirm || (code !== confirm )){ return SEND({confirm:"WrongPass"}) }

    if(act === "signup"){

      const from = "admin@bzdrive.com"
      const to = adminEmailAddr
      const theme = "bzDrive - newUser"
      const msg = EmailBody({mode:"newUser", email, login, lang})

      sendEmail(from, to, theme, msg, (bzMailData)=>{})

      bzDB( { req, res, col:'bzUsers', act:"INSERT_ONE", query:{...confirmData, pass} }, (insData)=>{
        res.send({ ...req?.body, result:{ chgPannel: "LogIn" } })
        return
      })
    }

    if(act === "forgot"){
      const query = {login, email}
      bzDB( { req, res, col:'bzUsers', act:"FIND_ONE", query }, (userData)=>{

        const _id = ObjectId(userData?.result?._id)
        const query = {...userData?.result, pass, _id}

        bzDB( { req, res, col:'bzUsers', act:"UPDATE_ONE", query }, (updData)=>{
          res.send({ ...req?.body, result:{ chgPannel: "LogIn" } })
          return
        })

      })
    }

  })

}