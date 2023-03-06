import React, { useState, useEffect } from "react"

import {
  ZLreducer,
  TimeTo_YYYYMMDD,
  TimeTo_YYYYMM,
  TimeToObject
} from "./ZLfunctions"


export function WeekPannel({ props:{line} }) {

  const monthNames = ['jan','feb','mar','apr','maj','jun','jul','aug','sep','oct','nov','dec']

  const key = (day, d)=> `WeekDayName${d}${day}`

  const txt = (day)=> `${TimeToObject(day).day} ${monthNames[parseInt(TimeToObject(day).month - 1)]}`
  
  const classes = (day, d)=>{
    const holyday = (d > 4) ? `HolyDay` : ``
    const isSameDay = ( TimeTo_YYYYMMDD(day) === TimeTo_YYYYMMDD(Date.now()) ) ? `Today` : ``
    const isSameMonth = ( TimeTo_YYYYMM(day) !== TimeTo_YYYYMM(Date.now()) ) ? `SameMonth` : ``
    return `WeekDayName ${holyday} ${isSameDay} ${isSameMonth} txtWht flex`
  }

  return(
    <div className="WeekPannel flex stretch">
      <div className="LeftLine flex"></div>
      <div className="RightLine flex">
      {
        line && line.week.map( (day, d)=>{
          return <div className={classes(day, d)} key={key(day, d)}>{txt(day)}</div>
        })
      }
      </div>
    </div>
  )
}