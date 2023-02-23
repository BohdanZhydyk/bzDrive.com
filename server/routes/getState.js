const { bzDB } = require('./bzDB')


exports.getState = (req, res)=>{

  bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id:"information"} }, (infoData)=>{
    bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id:"navigation"} }, (navData)=>{

      res.send({
        ...infoData, object:{
          ...infoData.object, result:{
            info: infoData.object.result.info,
            nav: navData.object.result.nav
          }
        }
      })

    })
  })

}