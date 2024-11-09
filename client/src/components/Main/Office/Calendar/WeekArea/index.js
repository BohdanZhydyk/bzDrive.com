import React from "react"

import { WeekTopLine } from "./WeekTopLine"
import { WeekDocs } from "./WeekDocs"


function WeekArea({ props:{tr, user, company, line, l, visibleSide, Reducer} }) {
  return(
    <div className="WeekArea flex column">

      { line?.week && <WeekTopLine props={{tr, user, line, l, visibleSide, Reducer}} /> }
          
      { line?.docs && <WeekDocs props={{company, line, l, visibleSide, Reducer} } /> }

    </div>
  )
}

export default WeekArea