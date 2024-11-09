const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const axios = require('axios')


exports.getCleaning = async (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object

  // console.log(object)

  // save job in DB
  if (object?.GET_JOBS) {

    const dayOfWeek = object?.dayOfWeek
  
    const YYYYMMDDToDate = (yyyymmdd) => {
      const year = Math.floor(yyyymmdd / 10000)
      const month = Math.floor((yyyymmdd % 10000) / 100) - 1
      const day = yyyymmdd % 100
      return new Date(year, month, day)
    }
  
    const YYYYMMDD = (date) => {
      const year = date.getFullYear().toString().padStart(4, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return parseInt(`${year}${month}${day}`)
    }
  
    function generateWeekObject(dayOfWeek) {
      const oneDay = 24 * 60 * 60 * 1000
      const weekdays = []
      const startDate = YYYYMMDDToDate(dayOfWeek)
      const weekNumber = startDate.getDay() === 0 ? 7 : startDate.getDay()
      const firstDayOfWeek = new Date(startDate.getTime() - (weekNumber - 1) * oneDay)
      for (let i = 0; i < 7; i++) {
        const date = new Date(firstDayOfWeek.getTime() + i * oneDay)
        weekdays.push( {dayInfo: { dayOfWeekCount: i, date: YYYYMMDD(date) } } )
      }
      return weekdays
    }
  
    const weekObject = generateWeekObject(dayOfWeek)

    const firstDay = parseInt( weekObject[0]?.dayInfo?.date )
    const lastDay = parseInt( weekObject[weekObject.length - 1]?.dayInfo?.date )

    let query = { "date": { $gte:firstDay, $lte:lastDay } }

    bzDB( { req, res, col:'CleaningDocs', act:"FIND", query  }, (jobsData)=>{

      function sortJobs(jobs){
        return jobs.map( day => ({
          ...day,
          schedule: jobsData.result
            .filter( el => day?.dayInfo?.date === el?.date)
            .sort( (a, b) => {
              const [aHours, aMinutes] = a?.time?.from.split(":").map(Number)
              const [bHours, bMinutes] = b?.time?.from.split(":").map(Number)
              return aHours - bHours || aMinutes - bMinutes
            })
        }))
      }

      res.send({ ...jobsData, result: sortJobs(weekObject) })
      return
    })

  }

  // save job in DB
  if(object?.SAVE_JOB){

    const _id = (!object?.job?._id || object?.job?._id === "new") ? "" : ObjectId(object?.job?._id)

    const jobData = {
      date: object?.job?.date,
      time: object?.job?.time,
      client: object?.job?.client,
      price: object?.job?.price,
      tasks: object?.job?.tasks
    }

    bzDB( { req, res, col:'CleaningDocs', act:"FIND_ONE", query:{_id} }, (isJobData)=>{

      isJobData?.result
      ?
      bzDB( { req, res, col:'CleaningDocs', act:"UPDATE_ONE", query:{...jobData, _id} }, (JobData)=>{

        bzDB( { req, res, col:'CleaningDocs', act:"FIND_ONE", query:{_id} }, (newJobData)=>{
          res.send({ ...newJobData, result: newJobData?.result })
          return
        })

      })
      :
      bzDB( { req, res, col:'CleaningDocs', act:"INSERT_ONE", query:jobData }, (JobData)=>{

        const insertedId = JobData?.result?.insertedId

        bzDB( { req, res, col:'CleaningDocs', act:"FIND_ONE", query:{_id:insertedId} }, (newJobData)=>{
          res.send({ ...newJobData, result: newJobData?.result })
          return
        })

      })

    })

  }

  // save job in DB
  if(object?.DELETE_JOB){

    const _id = ObjectId(object?._id)

    bzDB( { req, res, col:'CleaningDocs', act:"DELETE_ONE", query:{_id} }, (delJobData)=>{
      res.send({ ...delJobData, result: delJobData?.result })
      return
    })

  }

  // search docs in DB
  if(object?.SEARCH_DOCS){

    const search = object?.search

    const regex = { $regex: search, $options: 'i' }
    const numberRegex = { $regex: search.replace(/[-\s]/g, '').split('').join('[-\\s]?'), $options: 'i' }

    let query = {
      $or: [
        { "client.name": regex },
        { "client.shortName": regex },
        { "client.nip": numberRegex },
        { "client.contacts.tel": numberRegex },
        { "client.addr.street": regex }
      ]
    }

    bzDB( { req, res, col:'CleaningDocs', act:"FIND", query }, (searchData)=>{
      res.send({
        ...searchData,
        result: searchData?.result
          .sort( (a, b)=> parseInt(b?.time?.from) - parseInt(a?.time?.from) )
          .sort( (a, b)=> parseInt(b?.date) - parseInt(a?.date) )
      })
      return
    })

  }

}