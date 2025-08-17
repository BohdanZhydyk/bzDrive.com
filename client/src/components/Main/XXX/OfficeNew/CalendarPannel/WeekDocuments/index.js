import React from "react"

import { today } from "../../officeLogic"
import { DocWrapper } from "./DocWrapper"


function WeekDocuments({ props:{companies, activeCompany, weekLines, w, documents, docSelect, Reducer} }){
  
  const firstDay = weekLines?.week[0]
  const lastDay = weekLines?.week[weekLines?.week?.length - 1]

  const matchTo = (doc)=>{
    if(doc?.nr?.mode !== "ZL"){ return doc?.nr?.from }
    const isStatus = ( doc?.status === "open" ) || ( doc?.status === "repair" )
    const isToToday = (doc?.nr?.to < today)
    return (isStatus && isToToday) ? today : doc?.nr?.to
  }

  const weekDocuments = documents?.map( (doc)=> ({ ...doc, nr:{...doc?.nr, to: matchTo(doc)} }) )
  ?.sort( (a, b)=> parseInt(a?.nr?.sign) - parseInt(b?.nr?.sign) ) // sort by sign
  ?.sort( (a, b)=> parseInt(b?.nr?.to - b?.nr?.from) - parseInt(a?.nr?.to - a?.nr?.from) ) // sort by length
  ?.sort( (a, b)=> parseInt(a?.nr?.from) - parseInt(b?.nr?.from) ) // sort by date
  ?.filter( doc=>{ // filter based on today's date
    const from = doc?.nr?.from
    const to = doc?.nr?.to
    const status = doc?.status
    const rule1 = (to >= firstDay)
    const rule2 = (from <= lastDay) && ((to >= firstDay) || (status === "edit") || (status === "repair"))
    return (firstDay > today) ? rule1 : rule2
  })
  ?.filter(doc => docSelect.filter(item => item.act).map(item => item.name).includes(doc?.nr?.mode) ) // filter based on active modes

  // console.log("week", today, firstDay, lastDay, weekDocuments)

  return(
    <React.Fragment>
    {
      weekDocuments?.length > 0 &&
      <div className="WeekDocuments flex stretch wrap">
      {
        weekDocuments.map( (doc, d)=>
          <DocWrapper props={{companies, activeCompany, weekLines, w, doc, Reducer}} key={`DocWrapper${w}${d}`} />
        )
      }
      </div>
    }
    </React.Fragment>
  )
}

export default WeekDocuments
