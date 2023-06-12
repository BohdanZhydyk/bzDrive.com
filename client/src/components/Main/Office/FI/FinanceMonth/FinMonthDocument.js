import React, { useState } from "react"

import ActionBtn from "../../../../All/ActionBtn"
import { DocNameNormalize, SumArray } from "../../../../../AppFunctions"
import EditArea from "../../EditArea"


export function FinMonthDocument({ props:{company, doc, d, RELOAD} }){

  const mode = doc?.nr?.mode

  const [edit, setEdit] = useState(false)

  const color = `FinDocColor${mode}`

  const docLine = (doc, d)=>{
    return {
      num: `${d}.`,
      usr: doc?.user,
      nam: DocNameNormalize(doc?.nr),
      inf: doc?.client?.name ?? (doc?.car ? `${doc?.car?.brand} - ${doc?.car?.model}` : "-----"),
      net: SumArray(doc?.articles?.map( (el)=> el?.NET )),
      bru: SumArray(doc?.articles?.map( (el)=> el?.SUM )),
      btn: <ActionBtn props={{name:`edit`, click:()=> setEdit(!edit) }} />
    }
  }

  return(
    <div className={`FinDoscLine ${doc?.cl} flex wrap stretch`} >
      <div className={`FinNum ${color} flex`}>{doc?.num ?? docLine(doc, d).num}</div>
      <div className={`FinUsr ${color} flex start`}>{doc?.usr ?? docLine(doc, d).usr}</div>
      <div className={`FinNam ${color} flex start`}>{doc?.nam ?? docLine(doc, d).nam}</div>
      <div className={`FinInf ${color} flex start`}>{doc?.inf ?? docLine(doc, d).inf}</div>
      <div className={`FinNet ${color} flex end`}>{doc?.net ?? docLine(doc, d).net}</div>
      <div className={`FinBru ${color} flex end`}>{doc?.bru ?? docLine(doc, d).bru}</div>
      <div className={`FinBtn ${color} flex end`}>{doc?.btn ?? docLine(doc, d).btn}</div>
      { edit && <EditArea props={{company, mode, doc, edit, setEdit, RELOAD}} /> }
    </div>
  )
}