const { bzDB } = require('./../bzDB')

const { bzPassHash, bzPassCompare } = require('./../../safe/bcrypt')


exports.getAuth = (req, res)=>{

  switch( req?.body?.object?.act ){
    case "login": ActionLogin(req, res); return
    case "signup": return
    case "forgot": return
    default:
      res.send( {...req.body, result:false, errors:'ERR: server app.js!!!'} )
      break
  }

  function ActionLogin(req, res){

    let formData = req?.body?.object?.formData
  
    let login = formData.login
    let pass = formData.pass
  
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

        let result = {
          login: dbData.result.login,
          role: dbData.result.role,
          email: dbData.result.email,
          lang: dbData.result.lang,
          sex: dbData.result.sex,
          ava: dbData.result.ava
        }

        let query = {user:result, bzToken:req?.body?.bzToken}

        bzDB( { req, res, col:'bzTokens', act:"INSERT_ONE", query }, (dbData)=>{

          res.send( {bzToken: req?.body?.bzToken, result} )

        })
  
      })
  
    })
  
  }

}