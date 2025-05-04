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
    const to = Number(object?.to) || (Date.now() - 24 * 60 * 60 * 1000) // domyślnie 1 dzien wstecz

    const pipeline = [
      { $match: { "date.unix": { $gte: to, $lte: from } } },
      {
        $group: {
          _id: { user: "$user", ip: "$IP.ip" },
          count: { $sum: 1 },
          city: { $first: "$IP.city" },
          country: { $first: "$IP.country_name" },
          asn: { $first: "$IP.asn_org" },
          lastUnix: { $max: "$date.unix" }
        }
      },
      {
        $addFields: {
          lastDateObj: { $toDate: "$lastUnix" }
        }
      },
      {
        $addFields: {
          dateParts: { $dateToParts: { date: "$lastDateObj", timezone: "UTC" } }
        }
      },
      {
        $project: {
          user: "$_id.user",
          IP: {
            ip: "$_id.ip",
            city: "$city",
            country_name: "$country",
            asn_org: "$asn"
          },
          date: {
            unix: "$lastUnix",
            dateTime: {
              year: { $toString: "$dateParts.year" },
              month: {
                $cond: [
                  { $lt: ["$dateParts.month", 10] },
                  { $concat: ["0", { $toString: "$dateParts.month" }] },
                  { $toString: "$dateParts.month" }
                ]
              },
              day: {
                $cond: [
                  { $lt: ["$dateParts.day", 10] },
                  { $concat: ["0", { $toString: "$dateParts.day" }] },
                  { $toString: "$dateParts.day" }
                ]
              },
              hour: {
                $cond: [
                  { $lt: ["$dateParts.hour", 10] },
                  { $concat: ["0", { $toString: "$dateParts.hour" }] },
                  { $toString: "$dateParts.hour" }
                ]
              },
              min: {
                $cond: [
                  { $lt: ["$dateParts.minute", 10] },
                  { $concat: ["0", { $toString: "$dateParts.minute" }] },
                  { $toString: "$dateParts.minute" }
                ]
              },
              sec: {
                $cond: [
                  { $lt: ["$dateParts.second", 10] },
                  { $concat: ["0", { $toString: "$dateParts.second" }] },
                  { $toString: "$dateParts.second" }
                ]
              }
            }
          },
          count: 1,
          _id: 0
        }
      },
      { $sort: { "date.unix": -1 } }
    ]

    if(object?.GET_STATISTIC){
      bzDB({ req, res, col:'bzStatistic', act:"AGGREGATE", pipeline }, (statisticData)=>{
        res.send({ ...statisticData, result: statisticData?.result || [] })
      })
    }

    if (object?.DELETE_USER_IP) {
      const query = { user:object?.user, "IP.ip": object?.ip, "date.unix":{ $gte:to, $lte:from } }
      bzDB({ req, res, col:'bzStatistic', act:"DELETE_MANY", query }, (deleteData)=>{
        bzDB({ req, res, col:'bzStatistic', act:"AGGREGATE", pipeline }, (statisticData)=>{
          const statistic = statisticData?.result
          const delCount = deleteData?.result?.deletedCount
          res.send({ ...statisticData, result: {statistic, delCount} || [] })
        })
      })
    }

  })

}
