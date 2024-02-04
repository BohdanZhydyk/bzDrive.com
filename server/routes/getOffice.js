const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const { unixToDateTimeConverter } = require('../functions')


exports.getOffice = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object

  function GET_FINANCES(company, taxYear){

    const isPrevTaxYearQuery = {company, "date.year":taxYear-1}
    bzDB( { req, res, col:'bzFinances', act:"FIND", query:isPrevTaxYearQuery }, (PrevTaxYearData)=>{

      const isPrevTaxYear = PrevTaxYearData?.result?.length > 0

      const taxYearQuery = {company, "date.year":taxYear}
      bzDB( { req, res, col:'bzFinances', act:"FIND", query:taxYearQuery }, (financesData)=>{

        const YYYY = unixToDateTimeConverter().year
        const monthCount = YYYY === `${taxYear}` ? parseInt(unixToDateTimeConverter().month) : 12

        let finances = []

        for (let month = monthCount; month > 0; month--) {

          const emptyMonth = { "company": company, "date": { year: taxYear, month } }
          const finEl = financesData?.result.filter( mo=> mo?.date?.month === month)

          finances.push( finEl?.length > 0 ? finEl[0] : emptyMonth )

        }

        const taxYearArr = finances?.filter( month=> month?.date?.year === taxYear )

        res.send({
          ...financesData,
          result: {taxYearArr, isPrevTaxYear}
        })

        return

      })

    })

  }

  bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{bzToken} }, (userData)=>{

    // getting document by ID
    if(object?.getDocument){

      const _id = object?.docID ? ObjectId(object?.docID) : ""
      const query = {_id}

      bzDB( { req, res, col:'bzDocuments', act:"FIND_ONE", query }, (docData)=>{
        res.send({
          ...docData,
          result: docData?.result
        })
        return
      })
    }

    const login = userData?.result?.user?.login
    const query = { $or:[{"director":login},{"personnel.accountants":login},{"personnel.workers":login}] }

    bzDB( { req, res, col:'companies', act:"FIND", query }, (compData)=>{

      const myCompanies = compData?.result?.map( (comp)=> comp?.shortName )
      
      if( myCompanies?.length === 0 ){
        res.send({ ...compData, result:false })
        return
      }

      // getting information about available companies
      if(object?.getCompany){

        const comp = compData?.result
        const userDirector = comp?.filter(d => d?.director === login)
        const userNotDirector = comp?.filter(d => d?.director !== login)

        const sortedData = userDirector?.sort((a, b) => {
          if (a?.director > b?.director) return 1
          if (a?.director < b?.director) return -1
          return 0
        })

        const companiesData = sortedData?.concat(userNotDirector)

        res.send({
          ...compData,
          result: {userLogin:login, companiesData}
        })

        return

      }

      // getting information about orders
      if(object?.getOrders){

        const mode = object?.query?.mode
        const company = object?.query?.companyName
        const today = object?.query?.today
        const firstDay = object?.query?.firstDay
        const lastDay = object?.query?.lastDay

        const searchMode = object?.query?.searchMode
        const vin = object?.query?.vin
        const car = object?.query?.car
        const client = object?.query?.client
        const tel = object?.query?.tel
        
        let query = {
          $and:[
            { "nr.mode":mode },
            { "company":company },
            {
              $and: [
                {"nr.from":{ $lte:lastDay }},
                { $or: [{"nr.to":{ $gte:firstDay }}, {"status":"open"}, {"status":"repair"}] }
              ]
            }
          ]
        }

        // query for searchPannel
        if( searchMode && ((firstDay && lastDay) || vin || car || client || tel) ){
          query = {
            $and:[
              { "nr.mode":mode },
              { "company":company }
            ]
          }
          if (firstDay && lastDay) {
            query.$and.push(
              { "nr.to": { $gte: firstDay } },
              { "nr.from": { $lte: lastDay } }
            )
          }
          if (vin && vin !== '') {
            query.$and.push(
              { "car.vin": { $regex: vin, $options: 'i' } }
            )
          }
          if (car && car !== '') {
            query.$and.push(
              {
                $or:[
                  { "car.brand": { $regex: car, $options: 'i' } },
                  { "car.model": { $regex: car, $options: 'i' } },
                ]
              }
            )
          }
          if (client && client !== '') {
            query.$and.push(
              { "client.name": { $regex: client, $options: 'i' } }
            )
          }
          if (tel && tel !== '') {
            query.$and.push(
              { "client.contacts.tel": { $regex: tel, $options: 'i' } }
            )
          }
        }

        bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (ordersData)=>{

          let to = (zl)=>{
            const isStatus = ( zl?.status === "open" ) || ( zl?.status === "repair" )
            const isToToday = (zl?.nr?.to < today)
            return (isStatus && isToToday) ? today : zl?.nr?.to
          }

          res.send({
            ...ordersData,
            result: ordersData?.result?.map( (zl)=> ({ ...zl, nr:{...zl?.nr, to: to(zl)} }) )
              // sort by sign
              .sort( (a, b)=> parseInt(a?.nr?.sign) - parseInt(b?.nr?.sign) )
              // sort by length
              .sort( (a, b)=> parseInt(b?.nr?.to - b?.nr?.from) - parseInt(a?.nr?.to - a?.nr?.from) )
              // sort by date
              .sort( (a, b)=> parseInt(a?.nr?.from) - parseInt(b?.nr?.from) )
          })

          return

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
              // sort by date
              .sort( (a, b)=> parseInt(b?.nr?.sign) - parseInt(a?.nr?.sign) )
          })
        })

        return

      }

      // getting information about finances
      if(object?.getFinances){

        const company = object?.query?.companyName
        const taxYear = object?.query?.taxYear
        
        GET_FINANCES(company, taxYear)

      }

      // save month in finances
      if(object?.saveMonth){

        const company = object?.query?.companyName
        const taxYear = object?.query?.taxYear
        const month = object?.query?.month
        const date = month?.date

        const query = {company, date}

        bzDB( { req, res, col:'bzFinances', act:"FIND_ONE", query }, (financesData)=>{

          const result = financesData?.result
          const month = object?.query?.month
          const _id = ObjectId(result?._id)
          
          const act = result ? "UPDATE_ONE" : "INSERT_ONE"
          const query = result ? {...result, ...month, _id} : {company, ...month}

          bzDB( { req, res, col:'bzFinances', act, query }, (updatedFinData)=>{
            GET_FINANCES(company, taxYear)
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

        const fromThatMonth = parseInt( `${parseInt(docData?.nr?.from / 100)}00` )

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

            return
    
          })
          :
          bzDB( { req, res, col:'bzDocuments', act:"FIND", query:lastSignQuery }, (isDocData)=>{

            const lastDocSign = isDocData?.result[0]?.nr?.sign

            const newDocSign = lastDocSign ? (lastDocSign + 1) : 1
            const query = { ...docData, nr:{...docData?.nr, sign:newDocSign} }

            bzDB( { req, res, col:'bzDocuments', act:"INSERT_ONE", query }, (documentData)=>{
      
              res.send({
                ...documentData,
                result: documentData?.result
              })

              return
      
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

            return

          })

        })

      }

      // getting information about documents
      if(object?.getDocuments){

        const company = object?.company

        const date = object?.date

        const to = {
          $gte: parseInt(`${date?.year}${date?.month.toString().padStart(2, '0')}00`),
          $lte: parseInt(`${date?.year}${date?.month.toString().padStart(2, '0')}31`)
        }
        const from = {
          $gte: parseInt(`${date?.year}${date?.month.toString().padStart(2, '0')}00`),
          $lte: parseInt(`${date?.year}${date?.month.toString().padStart(2, '0')}31`)
        }

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

          function SORT(mode){
            const RES = documentsData?.result
            return RES?.filter(el=> el?.nr?.mode === mode)?.sort((a, b)=> a?.nr?.from - b?.nr?.from)
          }

          res.send({
            ...documentsData,
            result: [ ...SORT("ZU"),...SORT("FS"),...SORT("PS"),...SORT("FZ"),...SORT("PZ"),...SORT("ZL") ]
          })

          return

        })
      }

    })

  })

}