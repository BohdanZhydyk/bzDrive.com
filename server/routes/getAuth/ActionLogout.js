const { bzDB } = require("../bzDB")
const { tokenLifetime } = require("../../safe/safe")


exports.ActionLogout = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const lang = req?.body?.IP?.country_code ? req?.body?.IP?.country_code?.toLowerCase() : "en"
  const query = {
    $or:[
      { bzToken },
      { "time":{$lt:(Date.now() - tokenLifetime)} }
    ]
  }

  bzDB( { req, res, col:'bzTokens', act:"DELETE_MANY", query }, (dbData)=>{
    res.send( {bzToken, user:{lang}, result:dbData?.result} )
    return
  })

}