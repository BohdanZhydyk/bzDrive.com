import React from "react"

import { tr } from "../../../../AppTranslate"
import { TimeToObject } from "../../../../AppFunctions"


export function Title({ props:{mode, lang, calendar} }){

  const title = ()=>{
    const months = tr("MonthNames",lang)
    const timeFrom = calendar[0].week[0]
    const timeTo = calendar[calendar.length - 1].week[calendar[calendar.length - 1].week.length - 1]
    const From = `
      ${timeFrom.toString().slice(6, 8)}
      ${months[parseInt(timeFrom.toString().slice(4, 6)) - 1]}
      ${timeFrom.toString().slice(0, 4)}
    `
    const To = `
      ${timeTo.toString().slice(6, 8)}
      ${months[parseInt(timeTo.toString().slice(4, 6)) - 1]}
      ${timeTo.toString().slice(0, 4)}
    `
    return `${tr(`DocName_${mode}`,lang)[1]}: ${From} - ${To}`
  }

  return(
    <div className="Title bold flex column">

      <span className="TitleTxt flex">{title()}</span>
      
    </div>
  )
}