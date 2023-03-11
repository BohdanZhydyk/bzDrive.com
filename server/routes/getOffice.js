const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')


exports.getOffice = (req, res)=>{

  bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{user:false} }, (userData)=>{

    const login = userData?.user?.login
    const object = req.body.object

    // getting information about available companies
    if(object?.getCompany){
      const query = {
        $or: [
          { "director": login },
          { "personnel.accountants": login },
          { "personnel.workers": login }
        ]
      }
      bzDB( { req, res, col:'companies', act:"FIND", query }, (userData)=>{

        const data = userData?.result

        const userDirector = data.filter(d => d.director === login)
        const userNotDirector = data.filter(d => d.director !== login)

        const sortedData = userDirector.sort((a, b) => {
          if (a.director > b.director) return 1
          if (a.director < b.director) return -1
          return 0
        })

        const finalData = sortedData.concat(userNotDirector)

        res.send({
          ...userData,
          result: finalData
        })

      })
    }

    // getting information about orders
    if(object?.getOrders){

      const companyName = object?.query?.companyName
      const mode = object?.query?.mode
      const today = object?.query?.today
      const firstDay = object?.query?.firstDay
      const lastDay = object?.query?.lastDay

      // const query = object?.query
      const query = ( firstDay > today )
        ?
        {"nr.to":{ $gte:firstDay }}
        :
        {
          $and:[
            { "company":companyName },
            { "nr.mode":mode },
            {
              $and: [
                {"nr.from":{ $lte:lastDay }},
                { $or: [{"nr.to":{ $gte:firstDay }}, {"status":"edit"}, {"status":"repair"}] }
              ]
            }
          ]
        }
      
      bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (documentsData)=>{

        let to = (zl)=> 
          ( ( zl.status === "open" ) || ( zl.status === "repair" ) ) && ( zl.nr.to < today )
          ? today
          : zl.nr.to

        res.send({
          ...documentsData,
          result: documentsData?.result.map( (zl)=> ({ ...zl, nr:{...zl.nr, to: to(zl)} }) )
            .sort( (a, b)=> parseInt(a.nr.sign) - parseInt(b.nr.sign) ) // sort by sign
            .sort( (a, b)=> parseInt(b.nr.to - b.nr.from) - parseInt(a.nr.to - a.nr.from) ) // sort by length
            .sort( (a, b)=> parseInt(a.nr.from) - parseInt(b.nr.from) ) // sort by date
        })

      })
    }

    // save orders
    if(object?.saveOrder){

      let _id = object?.id ? ObjectId(object?.id) : ""

      const orderData = {
        company:  object?.orderData?.orderCompany,
        user:     object?.orderData?.orderUser,
        status:   object?.orderData?.status,
        nr:       object?.orderData?.nr,
        car:      object?.orderData?.car,
        client:   object?.orderData?.client
      }

      const fromThatMonth = parseInt( `${parseInt(orderData.nr.from / 100)}00` )

      const lastSignQuery = {
        $and:[
          { "company": orderData?.company },
          { "nr.mode": orderData?.nr?.mode },
          { "nr.from": { $gte:fromThatMonth } }
        ]
      }

      bzDB( { req, res, col:'bzDocuments', act:"FIND_ONE", query:{_id} }, (isOrderData)=>{

        isOrderData?.result
        ?
        bzDB( { req, res, col:'bzDocuments', act:"UPDATE_ONE", query:{...orderData, _id} }, (orderData)=>{
  
          res.send({
            ...orderData,
            result: orderData?.result
          })
  
        })
        :
        bzDB( { req, res, col:'bzDocuments', act:"FIND", query:lastSignQuery }, (isOrderData)=>{

          const lastDocSign = isOrderData?.result[0]?.nr?.sign

          const newDocSign = lastDocSign ? (lastDocSign + 1) : 1
          const query = { ...orderData, nr:{...orderData.nr, sign:newDocSign} }

          bzDB( { req, res, col:'bzDocuments', act:"INSERT_ONE", query }, (orderData)=>{
    
            res.send({
              ...orderData,
              result: orderData?.result
            })
    
          })
        })

      })
    }

  })

}