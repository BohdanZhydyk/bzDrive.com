import React from "react"

import { tr } from "../../../../AppTranslate"


export function Title({ props:{mode, lang, finances} }){

  const firstMonth = parseInt(finances ? finances[0].date : "")
  const lastMonth = parseInt(finances ? finances[finances.length-1].date : "")

  const title = ()=>{
    const months = tr("MonthNames",lang)
    const first = firstMonth.toString()
    const last = lastMonth.toString()
    const To = `
      ${months[parseInt(first.slice(4, 6)) - 1]}
      ${first.slice(0, 4)}
    `
    const From = `
    ${months[parseInt(last.slice(4, 6)) - 1]}
    ${last.slice(0, 4)}
    `
    return `${tr(`DocName_${mode}`,lang)[1]}: ${From} - ${To}`
  }

  return(
    <div className="Title bold flex">
      {title()}
    </div>
  )
}