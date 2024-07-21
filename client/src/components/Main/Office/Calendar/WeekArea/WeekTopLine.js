import React from "react"

import { TimeTo_YYYYMMDD } from "../../../../../AppFunctions"


export function WeekTopLine({ props:{tr, user, line, l} }) {

  const today = TimeTo_YYYYMMDD( Date.now() )
  const isSameDay = (date)=> ( date === today )
  const isSameMonth = (date)=> ( date.toString().slice(0, 6) !== today.toString().slice(0, 6) )
  const classes = (date, d)=>{
    const Holyday = (d > 4) ? ` HolyDay` : ``
    const Day = isSameDay(date) ? ` Today` : ``
    const Month = isSameMonth(date) ? ` SameMonth` : ``
    return `DayNameWeek${Holyday}${Day}${Month} txtWht flex`
  }

  const monthNames = tr(`MonthNames`,user?.lang)
  const txt = (date)=> `${date.toString().slice(6, 8)} ${monthNames[parseInt(date.toString().slice(4, 6) - 1)]}`

  return(
    <div className="WeekDocs flex stretch">

      <div className="LeftPannel flex wrap">
        <div className="DayNameWeekEmpty"></div>
      </div>
      
      <div className="RightPannel flex wrap">
      {
        line?.week.map( (day, d)=>{
          return( <div className={classes(day, d)} key={`DayNameWeek${l}${d}`}>{ txt(day) }</div> )
        })
      }
      </div>

    </div>
  )
}