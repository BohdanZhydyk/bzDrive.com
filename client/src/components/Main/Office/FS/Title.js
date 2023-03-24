import React from "react"

import { tr } from "../../../../AppTranslate"


export function Title({ props:{mode, lang, firstDay, lastDay} }){

  const title = ()=>{
    const months = tr("MonthNames",lang)
    const timeFrom = firstDay.toString()
    const timeTo = lastDay.toString()
    const From = `
      ${timeFrom.slice(6, 8)}
      ${months[parseInt(timeFrom.slice(4, 6)) - 1]}
      ${timeFrom.slice(0, 4)}
    `
    const To = `
    ${timeTo.slice(6, 8)}
    ${months[parseInt(timeTo.slice(4, 6)) - 1]}
    ${timeTo.slice(0, 4)}
    `
    return `${tr(`DocName_${mode}`,lang)[1]}: ${From} - ${To}`
  }

  return(
    <div className="Title bold flex">
      {title()}
    </div>
  )
}