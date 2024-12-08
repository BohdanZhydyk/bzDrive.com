import React, { useEffect, useState } from "react"

import './Cleaning.scss'
import { GetUser, TimeTo_YYYYMMDD } from "../../../../AppFunctions"
import { CleaningReducer } from "./CleaningReducer"
import SiteIcon from "../../../All/SiteIcon"
import ActionBtn from "../../../All/ActionBtn"
import { DocumentArea } from "./DocumentArea"
import { WeekLine } from "./WeekLine"
import { DayOfWeekName } from "./DayOfWeekName"


function Cleaning() {

  const user = GetUser()
  const lang = user?.lang

  const [week, setWeek] = useState( false )
  const [job, setJob] = useState( false )
  const [isSaveJob, setIsSaveJob] = useState( false )

  const [search, setSearch] = useState( false )
  const [searchObj, setSearchObj] = useState( false )

  const [download, setDownload] = useState( false )

  // const totalPrice = !week ? "0.00" : week.reduce((sum, day) => {
  //   return sum + day.schedule.reduce((daySum, job) => {
  //     return daySum + parseFloat(job.price)
  //   }, 0)
  // }, 0)

  function Reducer(action){ CleaningReducer({action, setWeek, job, setJob, setSearch, setSearchObj, setDownload})}

  const today = TimeTo_YYYYMMDD(new Date())
  const firstDayOfWeek = week[0]?.dayInfo?.date
  const lastDayOfWeek = week[week?.length - 1]?.dayInfo?.date
  const dayOfWeek =  week ? firstDayOfWeek : today

  function SAVE_JOB(){
    Reducer({
      type:"SAVE_JOB",
      dayOfWeek,
      job:{
        author: user?.login,
        status: "actual",
        date: job?.date > 0 ? job.date : today,
        ...job
      }
    })
  }
  function CLOSE_JOB(){
    setIsSaveJob(prev=>false)
    setJob(prev=>false)
  }
  const SHOW_WEEK = (daysOffset) => {
    const getNewDate = (date)=> {
      const newDay = {
        YYYY: String(date.getFullYear()).padStart(4, '0'),
        MM: String(date.getMonth() + 1).padStart(2, '0'),
        DD: String(date.getDate()).padStart(2, '0')
      }
      return parseInt(`${newDay.YYYY}${newDay.MM}${newDay.DD}`)
    }
    const getDate = (date)=> `${date.toString().slice(0, 4)}-${date.toString().slice(4, 6)}-${date.toString().slice(6, 8)}`
    const baseDate = (daysOffset < 0) ? new Date(getDate(firstDayOfWeek)) : new Date(getDate(lastDayOfWeek))
    baseDate.setDate(baseDate.getDate() + daysOffset)
    Reducer({ type: "GET_JOBS", dayOfWeek: getNewDate(baseDate) })
  }

  useEffect( ()=> { !week && Reducer({type:"GET_JOBS", dayOfWeek}) }, [])

  return(
    <div className="Cleaning flex column">
    {
      !week
      ?
      <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
      :
      <React.Fragment>

        <div className="WeekPannelTopLine flex">
          
          <div className="DayOfWeekNamesTop flex">
            <ActionBtn props={{name:'plus', click:()=>setJob(prev=>[])}} />
          </div>

          <div className="WeekLinesTop flex between">

            <ActionBtn props={{name:'left', click:()=>SHOW_WEEK(-7)}} />

            <span>{`${firstDayOfWeek} - ${lastDayOfWeek}`}</span>

            <ActionBtn props={{name:'right', click:()=>SHOW_WEEK(7)}} />

          </div>

        </div>

        <div className="WeekPannel flex stretch">

          <div className="DayOfWeekNames flex column start">

            { week.map( (day, d)=> <DayOfWeekName props={{day, lang}} key={`DayOfWeekName${d}`} /> ) }

          </div>

          <div className="WeekLines flex column start">

            {
              !job
              ? week.map( (day, d)=> <WeekLine props={{day, d, setJob}} key={`WeekLine${d}`} /> )
              : <DocumentArea props={{job, setJob, isSaveJob, setIsSaveJob, SAVE_JOB, CLOSE_JOB}} />
            }

          </div>

        </div>

      </React.Fragment>
    }
    </div>
  )
}

export default Cleaning