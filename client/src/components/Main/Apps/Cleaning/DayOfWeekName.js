import React from "react"

import { tr } from "../../../../AppTranslate"


export function DayOfWeekName({ props:{day, lang} }) {
  
  const dayName = tr("DayNames", lang)[day?.dayInfo?.dayOfWeekCount].toUpperCase()
  const date = day?.dayInfo?.date.toString()
  const dayOfMonth = date.slice(6, 8)
  const monthName = tr("MonthNames", lang)[parseInt(date.slice(4, 6) - 1)]
  const shortDate = `${dayOfMonth} ${monthName}`

  return(
    <div className="DayOfWeekName flex column">
      <span>{dayName}</span>
      <span>{shortDate}</span>
    </div>
  )
}