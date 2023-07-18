import React, { useState } from "react"

import { TimeTo_YYYYMMDD, TimeTo_YYYYMM, TimeToObject } from "../../../../AppFunctions"
import { getRandomColor } from "../../../../AppFunctions"
import { tr } from "../../../../AppTranslate"
import EditArea from "../EditArea"


export function WeekPannel({ props:{line, l, mode, company, pannels, lang, RELOAD} }) {

  const [edit, setEdit] = useState(false)

  const monthNames = tr(`MonthNames`,lang)

  const today = TimeTo_YYYYMMDD( Date.now() )
  const place = company?.addr?.town

  const key = (date, d)=> `WeekDayName${d}${date}`

  const txt = (date)=> `${date.toString().slice(6, 8)} ${monthNames[parseInt(date.toString().slice(4, 6) - 1)]}`
  
  const isSameDay = (date)=> ( date === today )
  const isSameMonth = (date)=> ( date.toString().slice(0, 6) !== today.toString().slice(0, 6) )

  const classes = (date, d)=>{
    const Holyday = (d > 4) ? ` HolyDay` : ``
    const Day = isSameDay(date) ? ` Today` : ``
    const Month = isSameMonth(date) ? ` SameMonth` : ``
    return `WeekDayName${Holyday}${Day}${Month} txtWht flex`
  }

  const order = {// newOrder
    nr:{ mode, from:today, to:today, sign:"", place, method:0 },
    car:{ color:getRandomColor() }
  }

  return(
    <div className="WeekPannel MinHight flex stretch wrap">

      <div className="LeftLine flex start" style={{display:pannels.LP}}>
      {
        line && line.week.map( (date, d)=>{
          const key = `NewOrderBtn${l}${d}`
          return(
            isSameDay(date)
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

      <div className="RightLine flex" style={{display:pannels.RP}}>
      {
        line && line.week.map( (date, d)=>{
          const NEW_ORDER = ()=> isSameDay(date) ? setEdit(!edit) : setEdit(false)
          const title = isSameDay(date) ? tr(`NewOrderBtn`,lang) : ``
          return(
            <div className={classes(date, d)} title={title} onClick={NEW_ORDER} key={key(date, d)}>
              {txt(date)}
            </div>
          )
        })
      }
      </div>

      {edit && <EditArea props={{company, mode, doc:order, edit, setEdit, RELOAD}} /> }

    </div>
  )
}