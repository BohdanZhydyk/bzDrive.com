import React from "react"

import { tr } from "../../../../AppTranslate"


export function AddWeekBtn({ props:{act, lang, calendar, setCalendar, mode, company, pannels, ZLreducer} }){

  const ADD_WEEK = ()=> ZLreducer( {type:act, calendar, mode, company}, (data)=>setCalendar(data) )

  return(
    <div className="DaysNamePannel MinHight flex stretch">

      <div className="LeftLine flex stretch" style={{display:pannels.LP}}>
        <div className="AddWeekBtn flex" onClick={ADD_WEEK}>{tr(`AddWeekBtn_${act}`,lang)}</div>
        <div className="ShowCalendarBtn flex" onClick={pannels.TOGGLE_PANNEL}>{`ShowCalendar`}</div>
      </div>
      
      <div className="RightLine flex stretch" style={{display:pannels.RP}}>
        <div className="ShowTableBtn flex" onClick={pannels.TOGGLE_PANNEL}>{`ShowTable`}</div>
        <div className="AddWeekBtn flex" onClick={ADD_WEEK}>{tr(`AddWeekBtn_${act}`,lang)}</div>
      </div>

    </div>
  )
}