const { bzDB } = require("../bzDB")
const { bzPassCompare } = require("../../safe/bcrypt")


exports.ActionLogin = (req, res)=>{

  const formData = req?.body?.object?.formData

  const bzToken = req?.body?.bzToken
  const login = formData?.login
  const pass = formData?.pass

  if(!login){
    res.send({ ...req?.body, result:{ errors: {login:"Err_1"} } })
    return
  }

  if(!pass){
    res.send({ ...req?.body, result:{errors: {pass:"Err_1"} } })
    return
  }

  bzDB( { req, res, col:'bzUsers', act:"FIND_ONE", query:{login} }, (dbData)=>{

    if(!dbData?.result){
      res.send({ ...req?.body, result:{errors: {login:"UserNotPresent"} } })
      return
    }

    if(!pass){
      res.send({ ...req?.body, result:{errors: {pass:"Err_1"} } })
      return
    }

    const dbPass = dbData?.result?.pass
      
    bzPassCompare( pass, dbPass, (isPass)=>{

      if(!isPass){
        res.send({ ...req?.body, result:{errors: {pass:"WrongPass"} } })
        return
      }

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