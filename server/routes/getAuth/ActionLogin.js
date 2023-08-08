const { bzDB } = require("../bzDB")
const { bzPassCompare } = require("../../safe/bcrypt")


exports.ActionLogin = (req, res)=>{

  function SEND(errors){ res.send({ ...req?.body, result:{errors} }) }

  const bzToken = req?.body?.bzToken
  const {login, pass} = req?.body?.object?.formData

  if(!login){ return SEND({login:"Err_1"}) }

  if(!pass){ return SEND({pass:"Err_1"}) }

  bzDB( { req, res, col:'bzUsers', act:"FIND_ONE", query:{login} }, (dbData)=>{

    if(!dbData?.result){ return SEND({login:"UserNotPresent"}) }

    if(!pass){ return SEND({pass:"Err_1"}) }

    const dbPass = dbData?.result?.pass
      
    bzPassCompare( pass, dbPass, (isPass)=>{

      if(!isPass){ return SEND({pass:"WrongPass"}) }

      const user = {
        login: dbData?.result?.login,
        role: dbData?.result?.role,
        email: dbData?.result?.email,
        lang: dbData?.result?.lang,
        sex: dbData?.result?.sex,
        ava: dbData?.result?.ava
      }

      const query = {time:Date.now(), user, bzToken}
      bzDB( { req, res, col:'bzTokens', act:"INSERT_ONE", query }, (dbData)=>{
        res.send( {bzToken, result:user} )
        return
      })

    })

  })

}