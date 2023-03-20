import React, { useState, useEffect } from "react"

import "./ZL.scss"
import { GetUser } from "../../../../AppFunctions"
import { ZLreducer } from "./ZLreducer"
import { DaysNamePannel } from "./DaysNamePannel"
import { Week } from "./Week"
import { AddWeekBtn } from "./AddWeekBtn"
import { Title } from "./Title"


function ZL({ props:{company} }) {

  const mode = "ZL"
  const lang = GetUser().lang

  const [calendar, setCalendar] = useState( false )
  const [more, setMore] = useState( true )

  const SAVE_DOC = (id, docData)=> ZLreducer( {type:"SAVE_DOC", id, docData}, (data)=>{ setCalendar(data) })

  const AddWeekBtnMinusProps = {act:'MINUS_WEEK', lang, calendar, setCalendar, more, setMore, ZLreducer}
  const AddWeekBtnPlusProps = {act:'PLUS_WEEK', lang, calendar, setCalendar, more, setMore, ZLreducer}
  const WeekProps = (line, l)=> ({line, l, lang, mode, company, ZLreducer, SAVE_DOC})

  useEffect( ()=>{ !calendar && ZLreducer({type:"GET_CALENDAR"}, (data)=>setCalendar(data)) },[])

  // console.log("cal", calendar)

  return(
    <div className="ZL flex column">

      { calendar && <Title props={{lang, calendar}} /> }

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