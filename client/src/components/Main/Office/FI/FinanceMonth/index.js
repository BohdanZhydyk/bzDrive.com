import React, { useState } from "react"

import { FinMonthSection } from "./FinMonthSection"
import { FinMonthSummary } from "./FinMonthSummary"
import { FinMonthDocs } from "./FinMonthDocs"


function FinanceMonth({ props:{fi, taxYear, SAVE_MONTH} }){
  
  const [newMonth, setNewMonth] = useState(fi?.newMonth)

  const [edit, setEdit] = useState(fi?.newMonth)
  const [editDocs, setEditDocs] = useState(false)

  const [documents, setDocuments] = useState([])

  return(
    <div className="FinanceMonth flex stretch wrap">

      <FinMonthSummary props={{fi, newMonth, taxYear, edit, setEdit, editDocs, SAVE_MONTH}} />

      <FinMonthSection props={{newMonth, edit, editDocs, setEditDocs}} />

      { editDocs && <FinMonthDocs props={{documents, editDocs, setEditDocs}}/> }

    </div>
  )
}

export default FinanceMonth