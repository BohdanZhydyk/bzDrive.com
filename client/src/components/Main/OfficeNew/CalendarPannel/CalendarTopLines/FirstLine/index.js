import React from "react"

import { PrevNextWeekBtn } from "../../CalendarElements/PrevNextWeekBtn"


function FirstLine({ props:{user, Reducer} }){
  return(
    <div className="CalendarLine flex stretch">

      <div className="CalendarLineLeftSide flex"></div>
      
      <div className="CalendarLineRightSide flex">
        <PrevNextWeekBtn props={{user, dir:-1, Reducer}} />
      </div>

    </div>
  )
}

export default FirstLine