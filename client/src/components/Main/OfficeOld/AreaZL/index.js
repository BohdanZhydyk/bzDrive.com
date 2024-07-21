import React, { useState, useEffect } from "react"

import "./ZL.scss"
import { tr } from "../../../../AppTranslate"
import { GetUser } from "../../../../AppFunctions"
import { ZLreducer } from "./ZLreducer"
import { DaysNamePannel } from "./DaysNamePannel"
import { Week } from "./Week"
import { AddWeekBtn } from "./AddWeekBtn"
import { Title } from "./Title"
import SearchArea from "../SearchArea"
import VINDecoder from "../VINDecoder"


function ZL({ props:{size, company, search, setSearch, toggleSearchPannel, calendar, setCalendar, Reducer} }) {

  const mode = "ZL"
  const lang = GetUser().lang

  const mobile = ( (size().device === `SD` || size().device === `ESD`) )

  const [LPannel, setLPannel] = useState( true )
  const [RPannel, setRPannel] = useState( true )
  const LP = LPannel ? 'flex' : 'none'
  const RP = RPannel ? 'flex' : 'none'
  const TOGGLE_PANNEL = ()=>{ setLPannel(prev=> !prev); setRPannel(prev=> !prev) }

  const pannels = {LP, RP, TOGGLE_PANNEL}

  const RELOAD = ()=>{
    setCalendar(false)
    setSearch( {query:{}, docs:[]} )
    ZLreducer( {type:"GET_CALENDAR", calendar, mode, company}, (data)=>setCalendar(prev=>data) )
  }

  const AddWeekBtnMinusProps = {act:'MINUS_WEEK', lang, calendar, setCalendar, mode, company, pannels, ZLreducer}
  const AddWeekBtnPlusProps = {act:'PLUS_WEEK', lang, calendar, setCalendar, mode, company, pannels, ZLreducer}
  const WeekProps = (line, l)=> ({line, l, lang, mode, company, pannels, ZLreducer, Reducer})

  useEffect( ()=>{
    setLPannel(mobile ? true : true)
    setRPannel(mobile ? false : true)
  },[mobile])

  useEffect( ()=>{ RELOAD() },[company])

  // console.log("cal", calendar)
  // console.log("search", search)

  return(
    <div className="ZL flex column">

      {
        toggleSearchPannel && 
        <SearchArea props={{tr, lang, company, mode, search, setSearch, ZLreducer, Reducer}} />
      }

      { calendar && <Title props={{mode, lang, calendar}} /> }

      <VINDecoder props={{}}/>

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