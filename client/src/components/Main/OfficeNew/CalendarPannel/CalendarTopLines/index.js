import React from "react"

import FirstLine from "./FirstLine"
import SecondLine from "./SecondLine"


function CalendarTopLines({ props:{user, docSelect, newDoc, companies, activeCompany, dowloadBar, Reducer} }){
  return(
    <div className="CalendarTopLines flex column start">

      <FirstLine props={{user, Reducer}} />

      <SecondLine props={{user, docSelect, newDoc, companies, activeCompany, dowloadBar, Reducer}} />

    </div>
  )
}

export default CalendarTopLines