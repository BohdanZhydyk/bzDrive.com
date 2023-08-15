const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const { generateArticleNr } = require('../safe/safe')


exports.getStore = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object
  const id = object?.articleID

  // getting articles
  if(object?.getArticles){
    bzDB( { req, res, col:'bzStoreArt', act:"FIND", query:{} }, (articlesData)=>{
      res.send({ ...articlesData, object:{...articlesData.object, result: articlesData?.result} })
      return
    })
  }

  // getting article by articleID
  if(object?.getArticle){
    bzDB( { req, res, col:'bzStoreArt', act:"FIND_ONE", query:{id} }, (articlesData)=>{

      const newArticle = {
        "id": generateArticleNr(),
        "lastModify": Date.now()
      }

      id !== "new"
      ? res.send({ ...articlesData, result: articlesData?.result })
      : res.send({ ...articlesData, result:newArticle })

      return
    })
  }

}