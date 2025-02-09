import React from "react"

import { tr } from "../../../../../../AppTranslate"


export function RightSide({ props:{user} }){

  const lang = user?.lang
  const dayNames = tr("DayNames", lang)

  return(
    <div className="CalendarLineRightSide flex">
    {
      dayNames.map( (dayOfWeek, d)=>{
        return(
          <div className={`DayName ${(d > 4) ? `HolyDay` : ``} radius flex`} key={`DayName${d}`}>
            { dayOfWeek.toUpperCase() }
          </div>
        )
      })
    }
    </div>
  )
}
