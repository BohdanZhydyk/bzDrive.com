import React, { useState, useEffect } from "react"

import "./ZL.scss"
import { ZLreducer } from "./ZLfunctions"
import { DaysNamePannel } from "./DaysNamePannel"
import { Week } from "./Week"
import { AddWeekBtn } from "./AddWeekBtn"


function ZL({ props:{company} }) {

  const mode = "ZL"

  const [calendar, setCalendar] = useState( false )
  const [more, setMore] = useState( true )

  useEffect( ()=>{ !calendar && ZLreducer( {type:"GET_CALENDAR", calendar, setCalendar} ) },[])

  // console.log("cal", calendar)

  return(
    <div className="ZL flex column">

      <AddWeekBtn props={{act:'MINUS_WEEK', calendar, setCalendar, more, setMore, ZLreducer}}/>

      <DaysNamePannel props={{}} />

      {
        calendar && calendar.map( (line, l)=>{
          return(
            <Week props={{line, l, mode, company}} key={`WeekSection${l}`} />
          )
        })
      }

      <AddWeekBtn props={{act:'PLUS_WEEK', calendar, setCalendar, more, setMore, ZLreducer}}/>

    </div>
  )
}

export default ZL