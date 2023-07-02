import React, { useState, useEffect } from "react"

import "./ZL.scss"
import { tr } from "../../../../AppTranslate"
import { GetUser } from "../../../../AppFunctions"
import { ZLreducer } from "./ZLreducer"
import { DaysNamePannel } from "./DaysNamePannel"
import { Week } from "./Week"
import { AddWeekBtn } from "./AddWeekBtn"
import { Title } from "./Title"
import SearchArea from "./SearchArea"


function ZL({ props:{size, company} }) {

  const mode = "ZL"
  const lang = GetUser().lang

  const mobile = ( (size().device === `SD` || size().device === `ESD`) )

  const [calendar, setCalendar] = useState( false )
  const [LPannel, setLPannel] = useState( true )
  const [RPannel, setRPannel] = useState( true )
  const LP = LPannel ? 'flex' : 'none'
  const RP = RPannel ? 'flex' : 'none'
  const TOGGLE_PANNEL = ()=>{ setLPannel(prev=> !prev); setRPannel(prev=> !prev) }

  const pannels = {LP, RP, TOGGLE_PANNEL}

  const RELOAD = ()=>{
    setCalendar(false)
    ZLreducer({type:"GET_CALENDAR"}, (data)=>setCalendar(data))
  }

  const AddWeekBtnMinusProps = {act:'MINUS_WEEK', lang, calendar, pannels, setCalendar, ZLreducer}
  const AddWeekBtnPlusProps = {act:'PLUS_WEEK', lang, calendar, pannels, setCalendar, ZLreducer}
  const WeekProps = (line, l)=> ({line, l, lang, mode, company, pannels, ZLreducer, RELOAD})

  useEffect( ()=>{
    setLPannel(mobile ? true : true)
    setRPannel(mobile ? false : true)
  },[mobile])

  useEffect( ()=>{ RELOAD() },[company])

  // console.log("cal", calendar)

  return(
    <div className="ZL flex column">

      { calendar && <Title props={{mode, lang, calendar}} /> }

      <SearchArea props={{tr, lang, company, mode, ZLreducer, RELOAD}} />

      <AddWeekBtn props={AddWeekBtnMinusProps}/>

      <DaysNamePannel props={{lang, pannels}} />

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