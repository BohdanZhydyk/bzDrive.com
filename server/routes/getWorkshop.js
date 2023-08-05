const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')


exports.getWorkshop = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object
  const id = "WorkshopApp_state"

  function SEND_WORKSHOP(data){
    bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id} }, (workshopData)=>{
      res.send({ ...workshopData, object:{...workshopData.object, result: workshopData.result} })
      return
    })
  }

  // getting workshop
  if(object?.getWS){ SEND_WORKSHOP() }
  
  // setting workshop
  if(object?.setWS){

    bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{bzToken} }, (userData)=>{

      userData?.result?.user?.role !== "admin"
      ?
      SEND_WORKSHOP()
      :
      bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id} }, (workshopData)=>{

        const workshop = object?.workshop
        const _id = ObjectId(workshopData?.result?._id)

        bzDB( { req, res, col:'bzState', act:"UPDATE_ONE", query:{workshop, _id} }, (updatedWorkshopData)=>{

          SEND_WORKSHOP()

        })

      })

    })

  }

}