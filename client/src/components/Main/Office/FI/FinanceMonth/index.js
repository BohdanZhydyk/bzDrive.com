import React, { useState } from "react"

import { FinMonthSection } from "./FinMonthSection"
import { FinMonthSummary } from "./FinMonthSummary"
import { FinMonthDocs } from "./FinMonthDocs"


function FinanceMonth({ props:{company, fi, taxYear, SAVE_MONTH, GET_DOCS} }){
  
  const [newMonth, setNewMonth] = useState(fi?.newMonth)

  const [edit, setEdit] = useState(fi?.newMonth)
  const [editDocs, setEditDocs] = useState(false)

  return(
    <div className="FinanceMonth flex stretch wrap">

      <FinMonthSummary props={{fi, newMonth, taxYear, edit, setEdit, editDocs, SAVE_MONTH}} />

      <FinMonthSection props={{newMonth, edit, setEdit, editDocs, setEditDocs}} />

      { editDocs && <FinMonthDocs props={{company, fi, editDocs, setEditDocs, GET_DOCS}}/> }

    </div>
  )
}

export default FinanceMonth