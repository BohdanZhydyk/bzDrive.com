import React from "react"

import { WeekTopLine } from "./WeekTopLine"
import { WeekDocs } from "./WeekDocs"


function WeekArea({ props:{tr, user, company, line, l, Reducer} }) {
  return(
    <div className="WeekArea flex column">

      { line?.week && <WeekTopLine props={{tr, user, line, l}} /> }
          
      { line?.docs && <WeekDocs props={{company, line, l, Reducer} } /> }

    </div>
  )
}

export default WeekArea