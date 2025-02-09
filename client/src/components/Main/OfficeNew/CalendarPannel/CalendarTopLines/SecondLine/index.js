import React from "react"

import { LeftSide } from "./LeftSide"
import { RightSide } from "./RightSide"
import DocumentEditArea from "../../../DocumentEditArea"


function SecondLine({ props:{user, docSelect, newDoc, companies, activeCompany, dowloadBar, Reducer} }){

  const active = newDoc?.active
  const company = companies?.myCompanies[activeCompany]
  const scroolTo = {divName:"SecondLine", offset:0}
  const doc = newDoc

  function SAVE(docData){ Reducer({ type:"SAVE_DOCUMENT", docData, scroolTo }) }
  function CLOSE(){ Reducer({ type:"OPEN_CLOSE_NEW_DOCUMENT", scroolTo }) }

  return(
    <div className="SecondLine CalendarLine flex stretch wrap">

      <LeftSide props={{user, docSelect, scroolTo, dowloadBar, Reducer}} />

      <RightSide props={{user}} />

      { active && <DocumentEditArea props={{doc, company, SAVE, CLOSE}} /> }
      
    </div>
  )
}

export default SecondLine