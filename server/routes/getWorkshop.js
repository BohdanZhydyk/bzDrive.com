const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const axios = require('axios')
const { YOUTUBE_API_KEY, YOUTUBE_CHANNEL_ID } = require('../safe/safe')


exports.getWorkshop = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object
  const id = "WorkshopApp_state"

  function SEND_WORKSHOP(){
    bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id} }, (workshopData)=>{
      res.send({ ...workshopData, object:{...workshopData?.object, result: workshopData?.result} })
      return
    })
  }

  // getting workshop
  if(object?.getWorkshop){
    SEND_WORKSHOP()
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

  // add new YouTube Short
  if(object?.addNewShort){

    const insertIndex = object?.i ?? 0
    const newShort = {id:Date.now(), name:object?.newShort?.name, videoId:object?.newShort?.videoId}

    bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id} }, (workshopData)=>{

      const newWorkshop = {
        ...workshopData?.result,
        workshop: workshopData?.result?.workshop.map(element =>
          element?.tag !== "youtube"
            ? element
            : {
                ...element,
                body: [
                  ...(element?.body || []).slice(0, insertIndex),
                  newShort,
                  ...(element?.body || []).slice(insertIndex)
                ]
              }
        )
      }   

      const query = { ...newWorkshop, id }

      bzDB( { req, res, col:'bzState', act:"UPDATE_ONE", query }, (updatedData)=>{
        bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id} }, (workshopData)=>{
          res.send({ ...workshopData, result: workshopData?.result?.workshop.find(el => el.tag === "youtube") })
          return
        })
      })
    })

  }

  // delete YouTube Short
  if(object?.deleteShort){

    const delId = object?.id

    bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id} }, (workshopData)=>{

      const newWorkshop = {
        ...workshopData?.result,
        workshop:workshopData?.result?.workshop.map( element=>
          element?.tag !== "youtube"
          ? element
          : {...element, body:element?.body.filter( short=> short?.id !== delId)}
        )
      }

      const query = { ...newWorkshop, id }

      bzDB( { req, res, col:'bzState', act:"UPDATE_ONE", query }, (updatedData)=>{
        bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{id} }, (workshopData)=>{
          res.send({ ...workshopData, result: workshopData?.result?.workshop.find(el => el.tag === "youtube") })
          return
        })
      })
    })

  }

}