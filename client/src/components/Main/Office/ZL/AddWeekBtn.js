import React from "react"


export function AddWeekBtn({ props:{act, calendar, setCalendar, more, setMore, ZLreducer} }){

  const ADD_WEEK = ()=>{
    ZLreducer( {type:act, calendar, setCalendar} )
    setMore(!more)
  }

  return(
    <div className="DaysNamePannel flex stretch">
      <div className="LeftLine flex"></div>
      <div className="RightLine flex">
        <div className="AddWeekBtn flex" onClick={ADD_WEEK}>{act}</div>
      </div>
    </div>
  )
}