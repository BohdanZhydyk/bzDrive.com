const { bzDB } = require("../bzDB")


exports.ActionLogout = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const login = req?.body?.object?.login
  const tokenLifetime = (3600000 * 24)
  const query = {
    $or:[
      { "user.login":login },
      { "time":{$lt:(Date.now() - tokenLifetime)} }
    ]
  }

  bzDB( { req, res, col:'bzTokens', act:"DELETE_MANY", query }, (dbData)=>{
    res.send( {bzToken, result:dbData?.result} )
  })

}