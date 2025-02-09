const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const { unixToDateTimeConverter } = require('../functions')


exports.getOfficeNew = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object
  let isLogined = false

  bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{bzToken} }, (userData)=>{

    isLogined = !!userData?.result

    const newID = Date.now()
    const today = YYYYMMDD(new Date( Date.now() ))
    const user = userData?.result?.user ? { login:userData?.result?.user?.login, ava:userData?.result?.user?.ava } : false
    const login = userData?.result?.user?.login ?? `User_${newID}`
        
    const newCompany = {
      _id:newID, shortName:`Company_${newID}`,
      personnel:{
        directors: [{ login:userData?.result?.user?.login ?? `Director_${newID}` }]
      }
    }

    function YYYYMMDD(date){
      const year = date.getFullYear().toString().padStart(4, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return parseInt(`${year}${month}${day}`)
    }

    let matchTo = (doc)=>{
      if(doc?.nr?.mode !== "ZL"){ return doc?.nr?.from }
      const isStatus = ( doc?.status === "open" ) || ( doc?.status === "repair" )
      const isToToday = (doc?.nr?.to < today)
      return (isStatus && isToToday) ? today : doc?.nr?.to
    }

    function sortedWeeksObject(weeks, documents){
      function newDoc(){
        const dateTime = unixToDateTimeConverter()
        const nowToYYYYMMDD = parseInt(`${dateTime?.year}${dateTime?.month}${dateTime?.day}`)
        return ({ _id:"newDoc", nr:{from:nowToYYYYMMDD, to:nowToYYYYMMDD} })
      }
      return(
        weeks?.map(obj=>{
          const firstDay = obj?.week[0]
          const lastDay = obj?.week[obj?.week?.length - 1]
          return {
            ...obj,
            docs:documents?.map( (doc)=> ({ ...doc, nr:{...doc?.nr, to: matchTo(doc)} }) )
            .sort( (a, b)=> parseInt(a?.nr?.sign) - parseInt(b?.nr?.sign) ) // sort by sign
            .sort( (a, b)=> parseInt(b?.nr?.to - b?.nr?.from) - parseInt(a?.nr?.to - a?.nr?.from) ) // sort by length
            .sort( (a, b)=> parseInt(a?.nr?.from) - parseInt(b?.nr?.from) ) // sort by date
            .filter( doc=>{ // filter based on today's date
              const from = doc?.nr?.from
              const to = doc?.nr?.to
              const status = doc?.status
              const rule1 = (to >= firstDay)
              const rule2 = (from <= lastDay) && ((to >= firstDay) || (status === "edit") || (status === "repair"))
              return (firstDay > today) ? rule1 : rule2
            })
          }
        })
        .map( (el, n)=> n === 0 ? {...el, docs: el?.docs ? [newDoc(), ...el?.docs] : [newDoc()]} : el )
      )
    }

    // getting information about new company
    if(object?.getNewCompany){
      res.send({ ...userData, result:newCompany })
      return
    }

    // getting information about available companies
    if(object?.getCompanies){
        
      const query = { $or:[{"personnel.directors.login":login},{"personnel.accountants.login":login},{"personnel.workers.login":login}] }
      const sort = {_id:1}

      bzDB( { req, res, col:'companies', act:"FIND", query, sort }, (companiesData)=>{

        const isCompanies = companiesData?.result?.length
        const userData = isCompanies ? user : {login: `User_${newID}`}
        const myCompanies = isCompanies ? companiesData?.result : [newCompany]

        res.send({ ...companiesData, result: {id:newID, user:userData, myCompanies} })
        return

      })

    }

    // save company in DB
    if(object?.saveCompany){

      let { _id, ...newCompany } = object?.myCompany
      _id = object?.myCompany?._id?.length > 20 ? ObjectId(object?.myCompany?._id) : ""

      bzDB( { req, res, col:'companies', act:"FIND_ONE", query:{_id} }, (companyData)=>{

        companyData?.result
        ?
        bzDB( { req, res, col:'companies', act:"UPDATE_ONE", query:{...newCompany, _id} }, (updatedCompanyData)=>{
          res.send({ ...updatedCompanyData })
          return
        })
        :
        bzDB( { req, res, col:'companies', act:"INSERT_ONE", query:newCompany }, (insertedCompanyData)=>{
          res.send({ ...insertedCompanyData })
          return
        })

      })
    }

    // getting information about calendar
    if(object?.getCalendar){

      const {companyShortName, prevWeek, select} = object

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
      
      const calendar = generateWeekObject(prevWeek)

      const modes = select?.filter( el=> el?.act ).map( el=> ({"nr.mode":el?.name}))
      const company = companyShortName
      const firstDay = calendar[0]?.week[0]
      const lastDay = calendar[calendar?.length - 1]?.week[calendar[calendar?.length - 1]?.week?.length - 1]

      const collection = `bzDoc_${company}`
      
      const query = {
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

      bzDB( { req, res, col:collection, act:"FIND", query }, (documentsData)=>{
        const documents = documentsData?.result
        res.send({ ...documentsData, result:{calendar, documents} })
        return
      })

    }

    // get document
    if(object?.getDocument){
      const _id = object?.getDocument?.length > 20 ? ObjectId(object?.getDocument) : ""
      const col = `bzDoc_${object?.companyShortName}`
      bzDB( { req, res, col, act:"FIND_ONE", query:{_id} }, (documentData)=>{
        res.send({ ...documentData, result:documentData?.result })
        return
      })
    }

    // save document
    if(object?.saveDocument){

      // if(isLogined){

      //   const docData = object?.docData
      //   const calendar = object?.calendar
  
      //   function mergeDocsById(data) {
      //     const allDocs = []
      //     const mergedDocs = {}
      //     data.forEach((entry) => {
      //       if (Array.isArray(entry.docs)) {
      //         allDocs.push(...entry.docs)
      //         // entry.docs = []
      //       }
      //     })
      //     allDocs.forEach((doc) => { if (!mergedDocs[doc._id]) { mergedDocs[doc._id] = { ...doc } } })
      //     return Object.values(mergedDocs).filter(el=> el?._id !== "newDoc")
      //   }
  
      //   function processDoc(doc) {
      //     const { id, ...rest } = doc
      //     return (doc.id === 'newDoc') ? { _id:newID, ...rest } : doc
      //   }
  
      //   bzDB( { req, res, col:`bzDoc_`, act:"FIND", query:{} }, (documentsData)=>{
      //     const documents = [...mergeDocsById(calendar), processDoc(docData)]
      //     res.send({ ...documentsData, result: sortedWeeksObject(calendar, documents) })
      //     return
      //   })
      //   return
      // }

      const _id = object?.docData?.id?.length < 20 ? "" : ObjectId(object?.docData?.id)

      const company = object?.docData?.docCompany
      const user = object?.docData?.docUser
      const status = object?.docData?.status
      const nr = object?.docData?.nr
      const car = object?.docData?.car
      const facility = object?.docData?.facility
      const client = object?.docData?.client
      const seller = object?.docData?.seller
      const dealer = object?.docData?.dealer
      const articles = object?.docData?.articles
      const files = object?.docData?.files
      const soft = object?.docData?.soft

      const docData = {
        company, user, status, nr,
        ...(car != null && car !== false && { car }),
        ...(facility != null && facility !== false && { facility }),
        ...(client != null && client !== false && { client }),
        ...(seller != null && seller !== false && { seller }),
        ...(dealer != null && dealer !== false && { dealer }),
        ...(articles != null && articles !== false && { articles }),
        ...(files != null && files !== false && { files }),
        ...(soft != null && soft !== false && { soft })
      }

      const col = `bzDoc_${company}`

      const fromThatMonth = parseInt( `${parseInt(docData?.nr?.from / 100)}00` )
      const toThatMonth = parseInt( `${parseInt(docData?.nr?.from / 100)}31` )

      const lastSignQuery = {
        $and: [
          { "company": docData?.company },
          { "nr.mode": docData?.nr?.mode },
          { "nr.from": { $gte: fromThatMonth, $lte: toThatMonth } }
        ]
      }

      bzDB( { req, res, col, act:"FIND_ONE", query:{_id} }, (isDocData)=>{

        isDocData?.result
        ?
        bzDB( { req, res, col, act:"UPDATE_ONE", query:{...docData, _id} }, (documentData)=>{

          bzDB( { req, res, col, act:"FIND_ONE", query:{_id} }, (newDocData)=>{
            const doc = newDocData?.result
            res.send({ ...newDocData })
            return
          })
  
        })
        :
        bzDB( { req, res, col, act:"FIND", query:lastSignQuery }, (isDocData)=>{

          const lastDocSign = isDocData?.result[0]?.nr?.sign
          const newDocSign = lastDocSign ? (lastDocSign + 1) : 1
          const query = { ...docData, nr:{...docData?.nr, sign:newDocSign} }

          bzDB( { req, res, col, act:"INSERT_ONE", query }, (documentData)=>{

            const insertedId = documentData?.result?.insertedId

            bzDB( { req, res, col, act:"FIND_ONE", query:{_id:insertedId} }, (newDocData)=>{
              const doc = newDocData?.result
              res.send({ ...newDocData })
              return
            })
    
          })
        })

      })
    }

  })

}