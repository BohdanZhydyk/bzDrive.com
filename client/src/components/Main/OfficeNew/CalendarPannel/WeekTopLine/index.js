import React from "react"

import { DayDates } from "./DayDates"


function WeekTopLine({ props:{user, weekLines, w} }){
  return(
    <div className="WeekTopLine CalendarLine flex stretch">

      <div className="CalendarLineLeftSide flex"></div>

      <div className="CalendarLineRightSide flex">
        <DayDates props={{user, week:weekLines?.week, w}} />
      </div>

    </div>
  )
}

export default WeekTopLine