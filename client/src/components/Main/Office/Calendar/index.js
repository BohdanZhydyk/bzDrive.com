import React from "react"

import "./Calendar.scss"
import { tr } from "../../../../AppTranslate"
import WeekArea from "./WeekArea"
import { AddWeekBtn } from "./AddWeekBtn"
import { DaysOfWeek } from "./DaysOfWeek"


function Calendar({ props:{user, company, docs, prevWeek, setPrevWeek, docSelect, setDocSelect, docSelectDlBar, setDocSelectDlBar, Reducer} }) {

  return(
    <div className="Calendar flex column">

      <AddWeekBtn props={{tr, user, act:'MINUS_WEEK', increment:-1, setPrevWeek}} />

      <DaysOfWeek props={{tr, user, docs, prevWeek, docSelect, setDocSelect, docSelectDlBar, setDocSelectDlBar, Reducer}} />

      { docs?.map( (line, l)=> <WeekArea props={{tr, user, company, line, l, Reducer}} key={`WeekArea${l}`} /> )}

      <AddWeekBtn props={{tr, user, act:'PLUS_WEEK', increment:1, setPrevWeek}} />

    </div>
  )
}

export default Calendar