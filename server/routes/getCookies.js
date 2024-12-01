const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')


exports.getCookies = (req, res)=>{
  

  const _id = ObjectId('674cb1f3ec29241217fb867b')
  const companyID = new ObjectId('63fbb7a2ec2924cc69fb867b')

  bzDB( { req, res, col:'bzState', act:"FIND_ONE", query:{_id} }, (CookiesStateData)=>{

    bzDB( { req, res, col:'companies', act:"FIND_ONE", query:{_id:companyID} }, (CompanyData)=>{

      res.send({
        ...CompanyData,
        result: {
          cookies: CookiesStateData?.result,
          company: CompanyData?.result
        }
      })

      return

    })

  })

}
