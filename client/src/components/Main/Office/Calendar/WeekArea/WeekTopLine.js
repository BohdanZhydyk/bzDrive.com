import React, { useEffect, useState } from "react"

import { bzGetEarnings, TimeTo_YYYYMMDD } from "../../../../../AppFunctions"
import { Earned } from "./Earned"


export function WeekTopLine({ props:{tr, user, line, l, visibleSide, Reducer} }) {

  const docModeBtnTxt = `pokazac dokumenty`
  const docModes = [`tygodniowo`, `za miesiac`]

  const [earned, setEarned] = useState(false)

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

  useEffect( ()=>{
    setEarned(false)
    const from = line?.week[0]
    const to = line?.week[line?.week?.length - 1]
    const cb = (data)=> setEarned( bzGetEarnings(data) )
    Reducer( { type:"GET_EARNED", from, to, cb} )
  }, [line])

  // console.log(`earned - ${l}`, earned)

  return(
    <div className="DocumentLine flex start stretch">

      {
        (!visibleSide?.mobile || visibleSide?.side) &&
        <div className="LeftPannel flex wrap">
          <div className={`DayNameWeekLeft flex ${l === 0 ? `between` : `end`} stretch`}>

            {/* {
              l === 0 &&
              <div className="DocMode flex column">
                <div>{docModeBtnTxt}</div>
                <div>{docModes[0]}</div>
              </div>
            } */}

            { earned && <Earned props={{earned}}/> }

          </div>
        </div>
      }

      {
        (!visibleSide?.mobile || !visibleSide?.side) &&
        <div className="RightPannel flex wrap">
        {
          line?.week.map( (day, d)=>{
            return( <div className={classes(day, d)} key={`DayNameWeek${l}${d}`}>{ txt(day) }</div> )
          })
        }
        </div>
      }

    </div>
  )
}