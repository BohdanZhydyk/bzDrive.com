const { bzDB } = require('./../bzDB')

const { bzPassHash, bzPassCompare } = require('./../../safe/bcrypt')


exports.getAuth = (req, res)=>{

  switch( req?.body?.object?.act ){
    case "login": ActionLogin(req, res); return
    case "signup": return
    case "forgot": return
    case "logout": ActionLogout(req, res); return
    default:
      res.send( {...req.body, result:false, errors:'ERR: server app.js!!!'} )
      break
  }

  function ActionLogin(req, res){

    const formData = req?.body?.object?.formData
  
    const bzToken = req?.body?.bzToken
    const login = formData.login
    const pass = formData.pass
  
    bzDB( { req, res, col:'bzUsers', act:"FIND_ONE", query:{login} }, (dbData)=>{
  
      if(!dbData?.result){
        res.send({
          ...req?.body,
          result:{
            ...formData,
            errors: {login:"UserNotPresent"}
          }
        })
        return
      }

      const dbPass = dbData.result.pass
        
      bzPassCompare( pass, dbPass, (isPass)=>{

        if(!isPass){
          res.send({
            ...req?.body,
            result:{
              ...formData,
              errors: {pass:"WrongPass"}
            }
          })
          return
        }

        const user = {
          login: dbData.result.login,
          role: dbData.result.role,
          email: dbData.result.email,
          lang: dbData.result.lang,
          sex: dbData.result.sex,
          ava: dbData.result.ava
        }

        const query = {time:Date.now(), user, bzToken}
        bzDB( { req, res, col:'bzTokens', act:"INSERT_ONE", query }, (dbData)=>{
          res.send( {bzToken, result:user} )
        })
  
      })
  
    })
  
  }

  function ActionLogout(req, res){

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

}