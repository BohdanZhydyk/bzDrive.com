import React, { useState, useEffect } from "react"

import "./ZL.scss"
import { GetUser } from "../../../../AppFunctions"
import { ZLreducer } from "./ZLfunctions"
import { DaysNamePannel } from "./DaysNamePannel"
import { Week } from "./Week"
import { AddWeekBtn } from "./AddWeekBtn"


function ZL({ props:{company} }) {

  const mode = "ZL"
  const lang = GetUser().lang

  const [calendar, setCalendar] = useState( false )
  const [more, setMore] = useState( true )

  useEffect( ()=>{ !calendar && ZLreducer({type:"GET_CALENDAR"}, (data)=>setCalendar(data)) },[])

  // console.log("cal", calendar)

  return(
    <div className="ZL flex column">

      <AddWeekBtn props={{act:'MINUS_WEEK', lang, calendar, setCalendar, more, setMore, ZLreducer}}/>

      <DaysNamePannel props={{lang}} />

      {
        calendar && calendar.map( (line, l)=>{
          const key = `WeekSection${l}${line?.week[0]}`
          return(
            <Week props={{line, l, lang, mode, company, setCalendar, ZLreducer}} key={key} />
          )
        })
      }

      <AddWeekBtn props={{act:'PLUS_WEEK', lang, calendar, setCalendar, more, setMore, ZLreducer}}/>

    </div>
  )
}

export default ZL