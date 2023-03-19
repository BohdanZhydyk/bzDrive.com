import React from "react"

import { tr } from "../../../../AppTranslate"


export function AddWeekBtn({ props:{act, lang, calendar, setCalendar, more, setMore, ZLreducer} }){

  const ADD_WEEK = ()=>{
    ZLreducer( {type:act, calendar}, (data)=>setCalendar(data) )
    setMore(!more)
  }

  return(
    <div className="DaysNamePannel flex stretch">

      <div className="LeftLine flex"></div>
      
      <div className="RightLine flex">
        <div className="AddWeekBtn flex" onClick={ADD_WEEK}>{tr(`AddWeekBtn_${act}`,lang)}</div>
      </div>

    </div>
  )
}