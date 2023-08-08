const { bzDB } = require('./../bzDB')
const { ActionLogin } = require('./ActionLogin')
const { ActionSignup } = require('./ActionSignup')
const { ActionConfirm } = require('./ActionConfirm')
const { ActionForgot } = require('./ActionForgot')
const { ActionLogout } = require('./ActionLogout')


exports.getAuth = (req, res)=>{

  const query = {
    $and:[
      { time:{$lte:Date.now() - 600000} },
      { $or:[{act:"forgot"},{act:"signup"}] }
    ]
  }

  bzDB( { req, res, col:'bzUsers', act:"DELETE_MANY", query }, (delData)=>{

    switch( req?.body?.object?.act ){
      case "login": ActionLogin(req, res); return
      case "signup": ActionSignup(req, res); return
      case "confirm": ActionConfirm(req, res); return
      case "forgot": ActionForgot(req, res); return
      case "logout": ActionLogout(req, res); return
      default: res.send( {...req?.body, result:false, errors:'ERR: server app.js!!!'} ); return
    }

  })

}