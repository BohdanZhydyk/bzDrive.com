const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')


exports.getStatistic = (req, res)=>{
  
  const bzToken = req?.body?.bzToken
  const object = req?.body?.object

  // console.log(object)

  bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{bzToken} }, (userData)=>{

    const isAdmin = userData?.result?.user?.role === "admin"

    if (!isAdmin) return res.send({ ...userData, result: [] })

    const from = Number(object?.from) || Date.now()
    const to = Number(object?.to) || (Date.now() - 24 * 60 * 60 * 1000)

    function sendFinalStatistic(delMsg) {
      const pipeline = [{ $match: { "logins": { $elemMatch: { lastUnix: { $gte: to, $lte: from } } } } }]
      bzDB({ req, res, col: 'bzStatistic', act: "AGGREGATE", pipeline }, (statisticData) => {
        res.send({ ...statisticData, result: { statistic: statisticData?.result, delMsg } })
      })
    }

    if(object?.GET_STATISTIC){ sendFinalStatistic(false) }

    if(object?.DELETE_LINE){

      const { id, unix } = object

      const _id = new ObjectId(id)
      const query = { _id }
    
      bzDB({ req, res, col: 'bzStatistic', act: "FIND_ONE", query }, (findData) => {

        const doc = findData?.result

        if(!doc){ sendFinalStatistic( { user:null, ip:null, count:0 } ) }

        const ip = doc?.IP?.ip
        const updatedLogins = (doc.logins || []).filter(l => l.lastUnix !== unix)
        const updatedDoc = { ...doc, logins: updatedLogins }
        const user = doc?.logins?.find(l => l.lastUnix === unix)?.user
        const delMsg = { ip, user, count:1 }
    
        updatedLogins.length === 0
        ? bzDB({ req, res, col: 'bzStatistic', act: "DELETE_ONE", query }, (deletedData)=>{ sendFinalStatistic(delMsg) })
        : bzDB({ req, res, col:'bzStatistic', act:"UPDATE_ONE", query:{...updatedDoc, _id} }, (updatedData)=>{ sendFinalStatistic(delMsg) })

      })
    }

  })

}
