import React, { useState } from "react"

import "./FinanceMonth.scss"
import { FinMonthSection } from "./FinMonthSection"
import { FinMonthSummary } from "./FinMonthSummary"
import { FinMonthDocs } from "./FinMonthDocs"


function FinanceMonth({ props:{company, fi, taxYear, SAVE_MONTH, GET_DOCS} }){
  
  const [newMonth, setNewMonth] = useState(fi?.newMonth)

  const [edit, setEdit] = useState(fi?.newMonth)
  const [editDocs, setEditDocs] = useState(false)

  const ON_CLICK = ()=>{
    setEditDocs(!editDocs)
    setEdit(newMonth ? !edit : false)
  }

  return(
    <div className="FinanceMonth flex stretch wrap">

      <FinMonthSummary props={{fi, newMonth, taxYear, edit, setEdit, editDocs, SAVE_MONTH}} />

      <FinMonthSection props={{newMonth, edit, editDocs, ON_CLICK}} />

      { editDocs && <FinMonthDocs props={{company, fi, editDocs, setEditDocs, GET_DOCS, ON_CLICK}}/> }

    </div>
  )
}

export default FinanceMonth