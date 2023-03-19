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

  const AddWeekBtnMinusProps = {act:'MINUS_WEEK', lang, calendar, setCalendar, more, setMore, ZLreducer}
  const AddWeekBtnPlusProps = {act:'PLUS_WEEK', lang, calendar, setCalendar, more, setMore, ZLreducer}
  const WeekProps = (line, l)=> ({line, l, lang, mode, company, setCalendar, ZLreducer})

  useEffect( ()=>{ !calendar && ZLreducer({type:"GET_CALENDAR"}, (data)=>setCalendar(data)) },[])

  // console.log("cal", calendar)

  return(
    <div className="ZL flex column">

      <AddWeekBtn props={AddWeekBtnMinusProps}/>

      <DaysNamePannel props={{lang}} />

      {
        calendar && calendar.map( (line, l)=>{
          const key = `WeekSection${l}${line?.week[0]}`
          return(
            <Week props={ WeekProps(line, l) } key={key} />
          )
        })
      }

      <AddWeekBtn props={AddWeekBtnPlusProps}/>

    </div>
  )
}

export default ZL