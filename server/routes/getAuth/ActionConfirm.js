const { ObjectId } = require('mongodb')
const { bzDB } = require("../bzDB")


exports.ActionConfirm = (req, res)=>{

  const formData = req?.body?.object?.formData

  const bzToken = req?.body?.bzToken
  const confirm = formData?.confirm
  const query = { bzToken, confirm:{$exists: true} }

  if(!confirm){
    res.send({ ...req?.body, result:{ errors: {confirm:"Err_1"} } })
    return
  }

  bzDB( { req, res, col:'bzUsers', act:"FIND", query }, (dbData)=>{

    const result = dbData?.result[0]
    const confirmData = result?.confirm
    const act = result?.act
    const code = result?.confirm?.pass?.code
    const login = result?.confirm?.login
    const email = result?.confirm?.email
    const pass = result?.confirm?.pass?.passHash

    if(!confirm || (code !== confirm )){
      res.send({ ...req?.body, result:{errors: {confirm:"WrongPass"} } })
      return
    }

    if(act === "signup"){
      bzDB( { req, res, col:'bzUsers', act:"INSERT_ONE", query:{...confirmData, pass} }, (insData)=>{
        res.send({ ...req?.body, result:{ chgPannel: "LogIn" } })
      })
    }

    if(act === "forgot"){
      const query = {login, email}
      bzDB( { req, res, col:'bzUsers', act:"FIND_ONE", query }, (userData)=>{

        const _id = ObjectId(userData?.result?._id)
        const query = {...userData?.result, pass, _id}

        bzDB( { req, res, col:'bzUsers', act:"UPDATE_ONE", query }, (updData)=>{
          res.send({ ...req?.body, result:{ chgPannel: "LogIn" } })
        })

      })
    }

  })

}