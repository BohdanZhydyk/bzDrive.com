import React from "react"

import { tr } from "../../../../AppTranslate"
import { TimeTo_YYYYMMDD } from "../../../../AppFunctions"


export function Title({ props:{mode, lang, finances} }){

  const dateNow = TimeTo_YYYYMMDD( new Date() ).toString()

  const lastMonth= (finances?.length > 0)
    ? `${finances[0].date?.year}${finances[0].date?.month.toString().padStart(2, '0')}`
    : dateNow

  const firstMonth  = (finances?.length > 0)
    ? `${finances[finances.length-1].date?.year}${finances[finances.length-1].date?.month.toString().padStart(2, '0')}`
    : dateNow

  const title = ()=>{
    const months = tr("MonthNames",lang)
    const From = `
      ${months[parseInt(firstMonth.slice(4, 6)) - 1]}
      ${firstMonth.slice(0, 4)}
    `
    const To = `
      ${months[parseInt(lastMonth.slice(4, 6)) - 1]}
      ${lastMonth.slice(0, 4)}
    `
    return `${tr(`DocName_${mode}`,lang)[1]}: ${From} - ${To}`
  }

  return(
    <div className="Title bold flex">
      {title()}
    </div>
  )
}