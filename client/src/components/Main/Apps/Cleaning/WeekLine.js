import React from "react"

import { sanitizeTxt } from "../../../../AppFunctions"


export function WeekLine({ props:{day, d, setJob} }) {

  return(
    <div className="WeekLine flex">
    {
      day?.schedule && day.schedule.map( (job, j)=>{
        const key = `Job${d}${j}${job?._id}`
        const time = `${job?.time?.from}-${job?.time?.to}`
        const shortName = sanitizeTxt(job?.client?.shortName, "CompanyNameShort")?.sanText
        const price = sanitizeTxt(job?.price, "price")?.sanText
        // const tel = sanitizeTxt(job?.client?.contacts?.tel, "tel")?.sanText
        return(
          <div className="JobElement flex column" onClick={()=>setJob(prev=>job)} key={key}>
            <div className="CellTimePrice flex between">
              <div className="CellTime flex start">{time}</div>
              <div className="CellPrice flex end">{`${price} zł`}</div>
            </div>
            <div className="CellName flex start">{shortName}</div>
          </div>
        )
      })
    }
    </div>
  )
}