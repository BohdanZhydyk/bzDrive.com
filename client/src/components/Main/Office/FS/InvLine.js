import React, { useState } from "react"

import { DocNameNormalize, SumArray, TimeTo_YYYYMMDD } from "../../../../AppFunctions"
import ActionBtn from "../../../All/ActionBtn"
import EditArea from "../EditArea"


export function InvLine({ props:{company, mode, top, invoice, SAVE_DOC} }){

  const [edit, setEdit] = useState(false)
  
  const statusColor = top ? `` : `ColorStat_${invoice?.status}`
  const nr = top ? invoice?.nr : DocNameNormalize(invoice?.nr)
  const seller = top ? invoice?.seller : `${invoice?.company}-${invoice?.user}`
  const client = top ? invoice?.client : invoice?.client?.name
  const nip = top ? invoice?.nip : invoice?.client?.nip
  const sum = top ? invoice?.sum : SumArray(invoice?.articles?.map( (el)=> el.SUM ))

  const today = TimeTo_YYYYMMDD( Date.now() )
  const place = company?.addr?.town

  const doc = top ? {nr:{ mode, from:today, to:today, sign:"", place, method:0 }} : invoice

  const ADD_EDIT_INV = ()=> setEdit(!edit)

  return(
    <div className="InvLine flex wrap stretch">
      
      <span className={`InvNr Cell ${top ? `TopCell` : statusColor} flex`}>{nr}</span>
      <span className={`InvSel Cell ${top ? `TopCell` : statusColor} flex start`}>{seller}</span>
      <span className={`InvCli Cell ${top ? `TopCell` : statusColor} flex start`}>{client}</span>
      <span className={`InvNIP Cell ${top ? `TopCell` : statusColor} flex`}>{nip}</span>
      <span className={`InvSUM Cell ${top ? `TopCell` : statusColor} flex end`}>{sum}</span>

      <span className={`InvBtns Cell ${top ? `TopCell` : statusColor} flex end`}>
        <ActionBtn props={{name:top ? "plus" : "edit", click:ADD_EDIT_INV}}/>
      </span>

      {edit && <EditArea props={{company, mode, doc, edit, setEdit, SAVE_DOC}} /> }

    </div>
  )
}