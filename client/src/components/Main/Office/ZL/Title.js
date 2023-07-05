import React from "react"

import { tr } from "../../../../AppTranslate"
import { TimeToObject } from "../../../../AppFunctions"
import VINDecoder from "./VINDecoder"


export function Title({ props:{mode, lang, calendar} }){

  const title = ()=>{
    const months = tr("MonthNames",lang)
    const timeFrom = calendar[0].week[0]
    const timeTo = calendar[calendar.length - 1].week[calendar[calendar.length - 1].week.length - 1]
    const From = `
      ${TimeToObject(timeFrom).day}
      ${months[parseInt(TimeToObject(timeFrom).month) - 1]}
      ${TimeToObject(timeFrom).year}
    `
    const To = `
      ${TimeToObject(timeTo).day}
      ${months[parseInt(TimeToObject(timeTo).month) - 1]}
      ${TimeToObject(timeTo).year}
    `
    return `${tr(`DocName_${mode}`,lang)[1]}: ${From} - ${To}`
  }

  return(
    <div className="Title bold flex column">

      <span className="TitleTxt flex">{title()}</span>

      <VINDecoder props={{}}/>
      
    </div>
  )
}