const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')


exports.getWorkshop = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object
  const id = "WorkshopApp_state"

  function SEND_WORKSHOP(){
    bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id} }, (workshopData)=>{
      res.send({ ...workshopData, object:{...workshopData?.object, result: workshopData?.result} })
    })
  }

  // getting workshop
  if(object?.getWorkshop){
    SEND_WORKSHOP()
    return
  }
  
  // setting workshop
  if(object?.setWorkshop){

    const tag = object?.tag
    
    bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{bzToken} }, (userData)=>{

      (userData?.result?.user?.role !== "admin" || !tag)
      ?
      SEND_WORKSHOP()
      :
      bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id} }, (workshopData)=>{

        const _id = ObjectId(workshopData?.result?._id)

        const Data = workshopData?.result?.workshop
        const workshop = Data?.map( tagEl=> (tagEl?.id !== tag?.id) ? tagEl : tag )

        bzDB( { req, res, col:'bzState', act:"UPDATE_ONE", query:{workshop, _id} }, (updatedWorkshopData)=>{

          SEND_WORKSHOP()
          return

        })

      })

    })

  }

  // save navigation
  if(object?.saveNavigation){

    bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id:"navigation"} }, (navData)=>{

      const _id = ObjectId(navData?.result?._id)

      const query = { ...navData.result, nav: object?.nav, _id }

      bzDB( { req, res, col:'bzState', act:"UPDATE_ONE", query }, (newNavData)=>{
        res.send({ ...newNavData, result: newNavData?.result })
        return
      })

    })

  }

}