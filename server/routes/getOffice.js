const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')


exports.getOffice = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object

  bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{bzToken} }, (userData)=>{

    const login = userData?.result?.user?.login
    const query = { $or:[{"director":login},{"personnel.accountants":login},{"personnel.workers":login}] }

    bzDB( { req, res, col:'companies', act:"FIND", query }, (compData)=>{

      const myCompanies = compData?.result.map( (comp)=> comp?.shortName )

      // getting information about available companies
      if(object?.getCompany){

          const comp = compData?.result
          const userDirector = comp.filter(d => d.director === login)
          const userNotDirector = comp.filter(d => d.director !== login)

          const sortedData = userDirector.sort((a, b) => {
            if (a.director > b.director) return 1
            if (a.director < b.director) return -1
            return 0
          })

          const companiesData = sortedData.concat(userNotDirector)

          res.send({
            ...compData,
            result: {userLogin:login, companiesData}
          })

      }

      // getting information about orders
      if(object?.getOrders){

        const mode = object?.query?.mode
        const company = object?.query?.companyName
        const today = object?.query?.today
        const firstDay = object?.query?.firstDay
        const lastDay = object?.query?.lastDay

        if( !myCompanies.includes(company) ){
          res.send({...compData, result: []})
          return
        }

        const query = ( firstDay > today )
          ?
          {
            $and:[
              { "nr.mode":mode },
              { "company":company },
              {"nr.to":{ $gte:firstDay }}
            ]
          }
          :
          {
            $and:[
              { "nr.mode":mode },
              { "company":company },
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

        if( !myCompanies.includes(company) ){
          res.send({...compData, result: []})
          return
        }

        const query = {"nr.mode":mode, company, "nr.from":from}

        bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (invoicesData)=>{
          res.send({
            ...invoicesData,
            result: invoicesData?.result
              .sort( (a, b)=> parseInt(b.nr.sign) - parseInt(a.nr.sign) ) // sort by date
          })
        })

      }

      // getting information about finances
      if(object?.getFinances){

        const company = object?.query?.companyName
        const taxYear = object?.query?.taxYear

        if( !myCompanies.includes(company) ){
          res.send({...compData, result: []})
          return
        }

        const query = {company}

        bzDB( { req, res, col:'bzFinances', act:"FIND_ONE", query }, (financesData)=>{

          const finances = financesData?.result?.finances
          const taxYearArr = finances?.filter(
            month=> parseInt(month?.date / 100) === taxYear
          )
          const isPrevTaxYear = finances?.filter(
            month=> parseInt(month?.date / 100) === taxYear - 1
          )?.length > 0

          res.send({
            ...financesData,
            result: {taxYearArr, isPrevTaxYear}
          })

        })

      }

      // save month in finances
      if(object?.saveMonth){

        const company = object?.query?.companyName
        const taxYear = object?.query?.taxYear
        const newMonth = object?.query?.newMonth
        const month = object?.query?.month

        if( !myCompanies.includes(company) ){
          res.send({...compData, result: []})
          return
        }

        const query = {company}

        bzDB( { req, res, col:'bzFinances', act:"FIND_ONE", query }, (financesData)=>{

          const _id = ObjectId(financesData?.result?._id)
          const date = object?.query?.month?.date
          const finances = newMonth
            ? [month, ...financesData?.result?.finances]
            : financesData?.result?.finances.map(
              (month)=> month?.date === date ? object?.query?.month : month
            )

          const query = {...financesData?.result, finances, _id}

          bzDB( { req, res, col:'bzFinances', act:"UPDATE_ONE", query }, (updatedFinData)=>{
            
            const query = {company}
            bzDB( { req, res, col:'bzFinances', act:"FIND_ONE", query }, (financesData)=>{

              const finances = financesData?.result?.finances
              const taxYearArr = finances.filter(
                month=> parseInt(month?.date / 100) === taxYear
              )
              const isPrevTaxYear = finances.filter(
                month=> parseInt(month?.date / 100) === taxYear - 1
              )?.length > 0
    
              res.send({
                ...financesData,
                result: {taxYearArr, isPrevTaxYear}
              })

            })

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
          user:     object?.docData?.docUser ?? `trial`,
          status:   object?.docData?.status,
          nr:       object?.docData?.nr,
          car:      object?.docData?.car,
          client:   object?.docData?.client,
          seller:   object?.docData?.seller,
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

      // getting information about documents
      if(object?.getDocuments){

        const company = object?.company

        if( !myCompanies.includes(company) ){
          res.send({...compData, result: []})
          return
        }

        const date = object?.date

        const to = { $gte: parseInt(`${date}00`), $lte: parseInt(`${date}31`) }
        const from = { $gte: parseInt(`${date}00`), $lte: parseInt(`${date}31`) }

        const query = {
          $or: [
              { $and:[{"company":company}, { "nr.mode":"ZU" }, {"nr.from":from}] },
              { $and:[{"company":company}, { "nr.mode":"FS" }, {"nr.from":from}] },
              { $and:[{"company":company}, { "nr.mode":"FZ" }, {"nr.from":from}] },
              { $and:[{"company":company}, { "nr.mode":"PS" }, {"nr.from":from}] },
              { $and:[{"company":company}, { "nr.mode":"PZ" }, {"nr.from":from}] },
              { $and:[{"company":company}, { "nr.mode":"ZL" }, {"nr.to":to}, {"status":"close"}] }
          ]
        }

        bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (documentsData)=>{

          const ZU = documentsData?.result.filter( el=> el?.nr?.mode === "ZU").reverse()
          const FS = documentsData?.result.filter( el=> el?.nr?.mode === "FS").reverse()
          const FZ = documentsData?.result.filter( el=> el?.nr?.mode === "FZ").reverse()
          const PS = documentsData?.result.filter( el=> el?.nr?.mode === "PS").reverse()
          const PZ = documentsData?.result.filter( el=> el?.nr?.mode === "PZ").reverse()
          const ZL = documentsData?.result.filter( el=> el?.nr?.mode === "ZL").reverse()

          res.send({
            ...documentsData,
            result: [...ZU, ...FS, ...FZ, ...PS, ...PZ, ...ZL]
          })

        })
      }

    })

  })

}