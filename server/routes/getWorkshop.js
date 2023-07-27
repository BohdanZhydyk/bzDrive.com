const { bzDB } = require('./bzDB')


exports.getWorkshop = (req, res)=>{

  bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id:"WorkshopApp_state"} }, (workshopData)=>{

    res.send({
      ...workshopData, object:{
        ...workshopData.object,
        result: workshopData.result
      }
    })
    return

  })

}