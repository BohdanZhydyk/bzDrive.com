const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const { generateArticleNr } = require('../safe/safe')

const {subscribe, publish} = require('./longPull')


exports.getConnect = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object

  bzDB( { req, res, col:'bzTokens', act:"FIND", query:{bzToken} }, (userData)=>{

    if(userData?.result?.length === 0){
      res.send({ ...userData, result:{err:"nie masz uprawnien, zeby korzystac z bzConnect!"} })
      return
    }

    // get messages from DB
    if(object?.GetMessages){

      bzDB( { req, res, col:'bzConnect', act:"FIND", query:{}, lim:20 }, (msgsData)=>{
        res.send({ ...msgsData, result:msgsData?.result.sort((a, b) => a.id - b.id) })
        return
      })

    }

    // get messages from DB
    if(object?.Subscribe){

      bzDB( { req, res, col:'bzConnect', act:"FIND", query:{}, lim:20 }, (msgsData)=>{
        subscribe(req, res, msgsData)
        return
      })

    }

    // add new message to DB
    if(object?.AddMessage){

      const id = Date.now()
      const login = userData?.result[0]?.user?.login
      const ava = userData?.result[0]?.user?.ava
      const txt = object?.AddMessage
  
      const query = {id, author:{login, ava}, txt}

      bzDB( { req, res, col:'bzConnect', act:"INSERT_ONE", query }, (userData)=>{

        bzDB( { req, res, col:'bzConnect', act:"FIND", query:{}, lim:20 }, (msgsData)=>{
          publish(req, res, msgsData)
          return
        })
        
      })

    }
      
  })

}