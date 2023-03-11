import React, { useState } from "react"

import {
  TimeTo_YYYYMMDD,
  TimeTo_YYYYMM,
  TimeToObject
} from "./ZLfunctions"
import { getRandomColor } from "../../../../AppFunctions"
import { tr } from "../../../../AppTranslate"
import EditArea from "../EditArea.js"


export function WeekPannel({ props:{mode, company, line, l, lang, setCalendar} }) {

  const [edit, setEdit] = useState(false)

  const monthNames = tr(`MonthNames`,lang)

  const key = (day, d)=> `WeekDayName${d}${day}`

  const txt = (day)=> `${TimeToObject(day).day} ${monthNames[parseInt(TimeToObject(day).month - 1)]}`
  
  const isSameDay = (day)=> ( TimeTo_YYYYMMDD(day) === TimeTo_YYYYMMDD(Date.now()) )
  const isSameMonth = (day)=> ( TimeTo_YYYYMM(day) !== TimeTo_YYYYMM(Date.now()) )

  const classes = (day, d)=>{
    const Holyday = (d > 4) ? ` HolyDay` : ``
    const Day = isSameDay(day) ? ` Today` : ``
    const Month = isSameMonth(day) ? ` SameMonth` : ``
    return `WeekDayName${Holyday}${Day}${Month} txtWht flex`
  }

  const order = {
    nr:{
      mode,
      from:TimeTo_YYYYMMDD( Date.now() ),
      to:TimeTo_YYYYMMDD( Date.now() ),
      sign: "",
      place:company?.addr?.town,
      method:1
    },
    car:{
      color:getRandomColor()
    }
  }

  return(
    <div className="WeekPannel flex stretch wrap">

      <div className="LeftLine flex start">
      {
        line && line.week.map( (day, d)=>{
          const key = `NewOrderBtn${l}${d}`
          return(
            isSameDay(day)
            ?
            <div className="NewOrderBtn flex" onClick={()=>setEdit(!edit)} key={key}>
              { tr(`NewOrderBtn`,lang) }
            </div>
            :
            <div key={key}></div>
          )
        })
      }
      </div>

      <div className="RightLine flex">
      {
        line && line.week.map( (day, d)=>{
          const NEW_ORDER = ()=> isSameDay(day) ? setEdit(!edit) : setEdit(false)
          const title = isSameDay(day) ? tr(`NewOrderBtn`,lang) : ``
          return(
            <div className={classes(day, d)} title={title} onClick={NEW_ORDER} key={key(day, d)}>
              {txt(day)}
            </div>
          )
        })
      }
      </div>

      {edit && <EditArea props={{company, mode, order, edit, setEdit, setCalendar}} /> }

    </div>
  )
}