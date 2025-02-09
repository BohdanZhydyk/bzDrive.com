import React from "react"

import { tr } from "../../../../../AppTranslate"
import { today } from "../../officeLogic"


export function DayDates({ props:{user, week, w} }){

  const isSameDay = (date)=> ( date === today )
  const isSameMonth = (date)=> ( date.toString().slice(0, 6) !== today.toString().slice(0, 6) )

  const classes = (date, d)=>{
    const Holyday = (d > 4) ? `HolyDay` : ``
    const Day = isSameDay(date) ? `Today` : ``
    const Month = isSameMonth(date) ? `SameMonth` : ``
    return `DayDate ${Holyday} ${Day} ${Month} radius flex`
  }

  const monthNames = tr(`MonthNames`,user?.lang)
  const dayDate = (date)=> `${date.toString().slice(6, 8)} ${monthNames[parseInt(date.toString().slice(4, 6) - 1)]}`

  return(
    <React.Fragment>
    {
      week && week.map( (date, d)=>{
        return(
          <div className={classes(date, d)} key={`DayDate${w}${d}`}>
            {dayDate(date)}
          </div>
        )
      })
    }
    </React.Fragment>
  )
}
