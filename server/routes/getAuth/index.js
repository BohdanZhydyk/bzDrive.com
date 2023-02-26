const { bzDB } = require('./../bzDB')

const { bzPassHash, bzPassCompare } = require('./../../safe/bcrypt')


exports.getAuth = (req, res)=>{

  switch( req?.body?.object?.act ){
    case "login": ActionLogin(req, res); return
    case "signup": return
    case "forgot": return
    default:
      res.send( {...req.body, object:{result:false, errors:'ERR: server app.js!!!'} } )
      break
  }

  function ActionLogin(req, res){

    let formData = req?.body?.object?.formData
  
    let login = formData.login
    let pass = formData.pass
  
    bzDB( { req, res, col:'bzUsers', act:"FIND_ONE", query:{login} }, (dbData)=>{
  
      if(!dbData?.object?.result){
        res.send({
          ...req?.body,
          object:{
            result:{
              ...formData,
              errors: {login:"UserNotPresent"}
            },
          }
        })
        return
      }

      const dbPass = dbData.object.result.pass
        
      bzPassCompare( pass, dbPass, (isPass)=>{

        if(!isPass){
          res.send({
            ...req?.body,
            object:{
              result:{
                ...formData,
                errors: {pass:"WrongPass"}
              }
            }
          })
          return
        }
  
        res.send({
          ...req?.body,
          object:{
            result:{
              role: dbData.object.result.role,
              login: dbData.object.result.login,
              email: dbData.object.result.email,
              lang: dbData.object.result.lang,
              sex: dbData.object.result.sex,
              ava: dbData.object.result.ava
            }
          }
        })
  
      })
  
    })
  
  }

}