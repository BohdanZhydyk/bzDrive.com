const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const { unixToDateTimeConverter } = require('../functions')


exports.getOffice = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object

  function newDoc(){
    const dateTime = unixToDateTimeConverter()
    const nowToYYYYMMDD = parseInt(`${dateTime?.year}${dateTime?.month}${dateTime?.day}`)
    return ({ _id:"NewDoc", nr:{mode:"", from:nowToYYYYMMDD, to:nowToYYYYMMDD, sign:""} })
  }

  bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{bzToken} }, (userData)=>{

    const login = userData?.result?.user?.login
    const query = { $or:[{"director":login},{"personnel.accountants":login},{"personnel.workers":login}] }

    bzDB( { req, res, col:'companies', act:"FIND", query }, (compData)=>{

      const myCompanies = compData?.result?.map( (comp)=> comp?.shortName )

      const newID = Date.now()
      const newCompany = {
        userLogin:login ?? `ID_${newID}`,
        activeCompany:0,
        companiesData:[{
          "id": newID,
          shortName: `MyFirm_${newID}`,
          "director": login ?? `ID_${newID}`
        }]
      }

      // getting information about available companies
      if(object?.getCompany){
      
        if( myCompanies?.length === 0 ){
          res.send({ ...compData, result: newCompany })
          return
        }

        const comp = compData?.result
        const userDirector = comp?.filter(d => d?.director === login)
        const userNotDirector = comp?.filter(d => d?.director !== login)

        const sortedData = userDirector?.sort((a, b) => {
          if (a?.director > b?.director) return 1
          if (a?.director < b?.director) return -1
          return 0
        })

        const companiesData = sortedData?.concat(userNotDirector)

        res.send({ ...compData, result: {userLogin:login, activeCompany:0, companiesData} })
        return

      }

      // getting document by ID
      if(object?.getDocument){
  
        const _id = (!object?.docID || object?.docID === "NewDoc") ? "" : ObjectId(object?.docID)
        const query = {_id}
        const mode = object?.mode
        const company = object?.company
  
        const zusData = {
          dealer: company,
          seller: { name:"Skladka zdrowotna ZUS", account:company?.acc_ZUS },
          articles: [{ART:"Skladka zdrowotna ZUS",PRI:"0.00",QUA:"1",VAT:"0",NET:"0.00",PRV:"0.00",SUM:"0.00"}]
        }
        const vatData = {
          dealer: company,
          seller: { name:"Podatek VAT", account:company?.acc_VAT },
          articles: [{ART:"Podatek VAT",PRI:"0.00",QUA:"1",VAT:"0",NET:"0.00",PRV:"0.00",SUM:"0.00"}]
        }

        const newDocumentBody = { ...newDoc(), nr:{...newDoc()?.nr, mode, place:company?.addr?.town} }
  
        function newDocument(mode){
          switch (mode) {
            case "ZU":  return { ...newDocumentBody, ...zusData }
            case "VA":  return { ...newDocumentBody, ...vatData }
            case "PS":  return { ...newDocumentBody, dealer: company }
            case "PZ":  return { ...newDocumentBody, dealer: company }
            case "FZ":  return { ...newDocumentBody, dealer: company }
            case "ZL":  return { ...newDocumentBody, dealer: company }
            case "FS":  return { ...newDocumentBody, dealer: company }
            default:    break
          }
        }
  
        bzDB( { req, res, col:'bzDocuments', act:"FIND_ONE", query }, (docData)=>{
          res.send({
            ...docData,
            result: docData?.result ?? newDocument(mode)
          })
          return
        })
      }

      // getting information about orders
      if(object?.getDocs){

        const prevWeek = object?.prevWeek

        const YYYYMMDD = (date)=>{
          const year = date.getFullYear().toString().padStart(4, '0')
          const month = (date.getMonth() + 1).toString().padStart(2, '0')
          const day = date.getDate().toString().padStart(2, '0')
          return parseInt(`${year}${month}${day}`)
        }

        function generateWeekObject(prev = 0) {

          const oneDay = 24 * 60 * 60 * 1000
          const offsets = [1, 2, 3].map( el=> el + prev)

          return offsets.map(offset => {
            const weekdays = []
            const today = new Date()
            const weekNumber = today.getDay() === 0 ? 7 : today.getDay()
            const firstDayOfWeek = new Date(today.getTime() - (weekNumber - 1) * oneDay)
            firstDayOfWeek.setDate(firstDayOfWeek.getDate() + (offset * 7))
        
            for (let i = 0; i < 7; i++) {
              const date = new Date(firstDayOfWeek.getTime() + i * oneDay)
              weekdays.push(YYYYMMDD(date))
            }
            return {week: weekdays}
          })
        }
        
        const weekObject = generateWeekObject(prevWeek)

        const modes = object?.modes.filter( el=> el?.act ).map( el=> ({"nr.mode":el?.name}))
        const company = object?.company?.shortName
        const firstDay = weekObject[0]?.week[0]
        const lastDay = weekObject[weekObject?.length - 1]?.week[weekObject[weekObject?.length - 1]?.week?.length - 1]

        let query = {
          $and:[
            { "company":company },
            { $or: modes },
            {
              $or: [
                {
                  $and: [
                    {"nr.from":{ $lte:lastDay }},
                    { $or: [{"nr.to":{ $gte:firstDay }}] }
                  ]
                },
                {
                  $and: [
                    {"nr.mode":"ZL"},
                    {"nr.from":{ $lte:lastDay }},
                    { $or: [{"nr.to":{ $gte:firstDay }}, {"status":"open"}, {"status":"repair"}] }
                  ]
                }
              ]
            }
          ]
        }

        bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (documentsData)=>{

          const today = YYYYMMDD(new Date( Date.now() ))
          
          let to = (doc)=>{
            if(doc?.nr?.mode !== "ZL"){ return doc?.nr?.from }
            const isStatus = ( doc?.status === "open" ) || ( doc?.status === "repair" )
            const isToToday = (doc?.nr?.to < today)
            return (isStatus && isToToday) ? today : doc?.nr?.to
          }

          const sortedWeekObject = weekObject?.map(obj=>{

            const firstDay = obj?.week[0]
            const lastDay = obj?.week[obj?.week?.length - 1]
            
            return {
              ...obj,
              docs:documentsData?.result?.map( (doc)=> ({ ...doc, nr:{...doc?.nr, to: to(doc)} }) )
              // sort by sign
              .sort( (a, b)=> parseInt(a?.nr?.sign) - parseInt(b?.nr?.sign) )
              // sort by length
              .sort( (a, b)=> parseInt(b?.nr?.to - b?.nr?.from) - parseInt(a?.nr?.to - a?.nr?.from) )
              // sort by date
              .sort( (a, b)=> parseInt(a?.nr?.from) - parseInt(b?.nr?.from) )
              .filter( doc=>{
                const rule1 = (doc?.nr?.to >= firstDay)
                const rule2 = ( doc?.nr?.from <= lastDay ) &&
                ( (doc?.nr.to >= firstDay) || (doc?.status === "edit") || (doc?.status === "repair") )

                if(firstDay > today){return rule1}
                else{return rule2}
              })
            }
          })

          res.send({
            ...documentsData,
            result: sortedWeekObject.map( (el, n)=> n === 0 ? {...el, docs: el?.docs ? [newDoc(), ...el?.docs] : [newDoc()]} : el )
              
          })
          return

        })

      }

      // save document
      if(object?.saveDocument){

        const _id = (!object?.docID || object?.docID === "NewDoc") ? "" : ObjectId(object?.docID)

        const docData = {
          company: object?.docData?.docCompany,
          user: object?.docData?.docUser ?? `trial`,
          status: object?.docData?.status,
          nr: object?.docData?.nr,
          ...(object?.docData?.car != null && object?.docData?.car !== false && { car: object.docData.car }),
          ...(object?.docData?.client != null && object?.docData?.client !== false && { client: object.docData.client }),
          ...(object?.docData?.seller != null && object?.docData?.seller !== false && { seller: object.docData.seller }),
          ...(object?.docData?.dealer != null && object?.docData?.dealer !== false && { dealer: object.docData.dealer }),
          ...(object?.docData?.articles != null && object?.docData?.articles !== false && { articles: object.docData.articles }),
          ...(object?.docData?.files != null && object?.docData?.files !== false && { files: object.docData.files }),
          ...(object?.docData?.soft != null && object?.docData?.soft !== false && { soft: object.docData.soft })
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

            bzDB( { req, res, col:'bzDocuments', act:"FIND_ONE", query:{_id} }, (newDocData)=>{
    
              res.send({
                ...newDocData,
                result: newDocData?.result
              })

              return

            })
    
          })
          :
          bzDB( { req, res, col:'bzDocuments', act:"FIND", query:lastSignQuery }, (isDocData)=>{

            const lastDocSign = isDocData?.result[0]?.nr?.sign

            const newDocSign = lastDocSign ? (lastDocSign + 1) : 1
            const query = { ...docData, nr:{...docData?.nr, sign:newDocSign} }

            bzDB( { req, res, col:'bzDocuments', act:"INSERT_ONE", query }, (documentData)=>{

              const insertedId = documentData?.result?.insertedId

              bzDB( { req, res, col:'bzDocuments', act:"FIND_ONE", query:{_id:insertedId} }, (newDocData)=>{
    
                res.send({
                  ...newDocData,
                  result: newDocData?.result
                })
  
                return
  
              })
      
            })
          })

        })
      }

      // update document files
      if(object?.updateDocFiles){

        const _id = ObjectId(object?.doc?._id)

        function cleanDoc(obj) {
          return Object.entries(obj).reduce((acc, [key, value]) => {
            const isExcludedKey = (key === 'downloadStatus' && value === false) || (key === 'editMode' && value === true)
            return !isExcludedKey ? { ...acc, [key]: value } : acc
          }, {})
        }

        bzDB( { req, res, col:'bzDocuments', act:"UPDATE_ONE", query:{...cleanDoc(object?.doc), _id} }, (updateDocData)=>{

          bzDB( { req, res, col:'bzDocuments', act:"FIND_ONE", query:{_id} }, (docData)=>{
    
            res.send({
              ...docData,
              result: docData?.result
            })

            return

          })

        })

      }

      // search documents
      if(object?.searchDocs){

        const company = object?.company?.shortName
        const search = object?.search

        let query = {
          $and: [
            { "company": company },
            {
              $or: search.split(',').map(term => term.trim()).map(term => {
                const regex = { $regex: term, $options: 'i' }
                const numberRegex = { $regex: term.replace(/[-\s]/g, '').split('').join('[-\\s]?'), $options: 'i' }
                return {
                  $or: [
                    { "car.vin": regex },
                    { "car.brand": regex },
                    { "car.model": regex },
                    { "car.numbers": regex },
                    { "car.engine": regex },
                    { "client.name": regex },
                    { "client.nip": numberRegex },
                    { "client.contacts.tel": numberRegex },
                    { "dealer.name": regex },
                    { "dealer.nip": numberRegex },
                    { "dealer.contacts.tel": numberRegex },
                    { "seller.name": regex },
                    { "seller.nip": numberRegex },
                    { "seller.contacts.tel": numberRegex },
                    { "soft": { $elemMatch: { "id": regex } } },
                    { "soft": { $elemMatch: { "programmer": regex } } },
                    { "soft": { $elemMatch: { "ECUType": regex } } }
                  ]
                }
              })
            }
          ]
        }

        
        bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (docsData)=>{

          res.send({
            ...docsData,
            result: docsData?.result
              .sort( (a, b)=> parseInt(a?.nr?.sign) - parseInt(b?.nr?.sign) )
              .sort( (a, b)=> parseInt(a?.nr?.from) - parseInt(b?.nr?.from) )
          })
        
          return
        
        })

      }

      // getting earned
      if(object?.getEarned){

        const company = object?.company?.shortName
        const from = object?.from
        const to = object?.to
        
        let query = {
          $and: [
            { "company": company },
            { "status": { $ne: "delete" } },
            { "articles": { $exists: true, $ne: null, $not: { $size: 0 } } },
            { $nor: [
                { "nr.mode": "ZL", "status": "open" },
                { "nr.mode": "ZL", "status": "repair" }
              ]
            },
            {
              $or: [
                {
                  $and: [
                    { "nr.mode": { $ne: "FS" } },
                    { "nr.to": { $gte: from } },
                    { "nr.to": { $lte: to } }
                  ]
                },
                {
                  $and: [
                    { "nr.mode": "FS" },
                    { "nr.from": { $gte: from } },
                    { "nr.from": { $lte: to } }
                  ]
                }
              ]
            }
          ]
        }

        bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (documentsData)=>{

          res.send({ ...documentsData, result: documentsData?.result.map( el=>
            ({ mode:el?.nr?.mode, art:el?.articles.map( art=> ({NET:art?.NET, PRV:art?.PRV, SUM:art?.SUM}) ) })
          ) })
          
          return

        })

      }

    })

  })

}