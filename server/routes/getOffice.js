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
      
      bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (ordersData)=>{

        let to = (zl)=> 
          ( ( zl.status === "open" ) || ( zl.status === "repair" ) ) && ( zl.nr.to < today )
          ? today
          : zl.nr.to

        res.send({
          ...ordersData,
          result: ordersData?.result.map( (zl)=> ({ ...zl, nr:{...zl.nr, to: to(zl)} }) )
            .sort( (a, b)=> parseInt(a.nr.sign) - parseInt(b.nr.sign) ) // sort by sign
            .sort( (a, b)=> parseInt(b.nr.to - b.nr.from) - parseInt(a.nr.to - a.nr.from) ) // sort by length
            .sort( (a, b)=> parseInt(a.nr.from) - parseInt(b.nr.from) ) // sort by date
        })

      })
    }

    // getting information about invoices
    if(object?.getInvoices){

      const mode = object?.query?.mode
      const company = object?.query?.companyName
      const from = object?.query["nr.from"]

      const query = {"nr.mode":mode, company, "nr.from":from}

      bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (invoicesData)=>{
        res.send({
          ...invoicesData,
          result: invoicesData?.result
            .sort( (a, b)=> parseInt(b.nr.sign) - parseInt(a.nr.sign) ) // sort by date
        })
      })

    }

    // getting document by ID
    if(object?.getDocument){

      const _id = object?.docID ? ObjectId(object?.docID) : ""
      const query = {_id}

      bzDB( { req, res, col:'bzDocuments', act:"FIND_ONE", query }, (docData)=>{
        res.send({
          ...docData,
          result: docData?.result
        })
      })

    }

    // save orders
    if(object?.saveDoc){

      const _id = object?.id ? ObjectId(object?.id) : ""

      const docData = {
        company:  object?.docData?.docCompany,
        user:     object?.docData?.docUser,
        status:   object?.docData?.status,
        nr:       object?.docData?.nr,
        car:      object?.docData?.car,
        client:   object?.docData?.client,
        dealer:   object?.docData?.dealer,
        articles: object?.docData?.articles,
        files:    object?.docData?.files
      }

      const fromThatMonth = parseInt( `${parseInt(docData.nr.from / 100)}00` )

      const lastSignQuery = {
        $and:[
          { "company": docData?.company },
          { "nr.mode": docData?.nr?.mode },
          { "nr.from": { $gte:fromThatMonth } }
        ]
      }

      bzDB( { req, res, col:'bzDocuments', act:"FIND_ONE", query:{_id} }, (isDocData)=>{

        isDocData?.result
        ?
        bzDB( { req, res, col:'bzDocuments', act:"UPDATE_ONE", query:{...docData, _id} }, (documentData)=>{
  
          res.send({
            ...documentData,
            result: documentData?.result
          })
  
        })
        :
        bzDB( { req, res, col:'bzDocuments', act:"FIND", query:lastSignQuery }, (isDocData)=>{

          const lastDocSign = isDocData?.result[0]?.nr?.sign

          const newDocSign = lastDocSign ? (lastDocSign + 1) : 1
          const query = { ...docData, nr:{...docData.nr, sign:newDocSign} }

          bzDB( { req, res, col:'bzDocuments', act:"INSERT_ONE", query }, (documentData)=>{
    
            res.send({
              ...documentData,
              result: documentData?.result
            })
    
          })
        })

      })
    }

    // save orders
    if(object?.updateDocFiles){

      const _id = ObjectId(object?.doc?._id)
      const doc = object?.doc

      bzDB( { req, res, col:'bzDocuments', act:"UPDATE_ONE", query:{...doc, _id} }, (updateDocData)=>{

        bzDB( { req, res, col:'bzDocuments', act:"FIND_ONE", query:{_id} }, (docData)=>{
  
          res.send({
            ...docData,
            result: docData?.result
          })

        })

      })

    }

  })

}