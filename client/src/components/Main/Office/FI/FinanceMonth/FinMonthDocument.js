import React, { useState } from "react"

import ActionBtn from "../../../../All/ActionBtn"
import { DocNameNormalize, SumArray } from "../../../../../AppFunctions"
import EditArea from "../../EditArea"


export function FinMonthDocument({ props:{company, doc, d, RELOAD} }){

  const mode = doc?.nr?.mode
  const color = `${d === 0 ? `` : `FinCell overflow`} FinDocColor${mode} flex`

  const [edit, setEdit] = useState(false)

  const partnerName = (doc)=>{
    const seller = doc?.seller?.name ? `${doc.seller.name}` : ``
    const client = doc?.client?.name ? `${doc.client.name}` : ``
    const brand = doc?.car?.brand ? `${doc.car.brand}` : ``
    const model = doc?.car?.model ?? ``
    if(brand || model) return `${client ? `${client} - ` : ""}${brand ? `${brand} - ` : ""}${model}`
    if(client) return client
    if(seller) return seller
    return "-----"
  }

  const docLine = (doc, d)=>{
    return {
      num: `${d}.`,
      usr: doc?.user,
      nam: (doc?.nr?.assignNr?.length > 0) ? doc.nr.assignNr : DocNameNormalize(doc?.nr),
      inf: partnerName(doc),
      net: SumArray(doc?.articles?.map( (el)=> el?.NET )),
      bru: SumArray(doc?.articles?.map( (el)=> el?.SUM )),
      btn: <ActionBtn props={{name:`edit`, click:()=> setEdit(!edit) }} />
    }
  }

  // console.log(doc)

  return(
    <div className={`FinDoscLine ${doc?.cl} flex wrap stretch`} >
      <div className={`FinNum ${color}`}>{doc?.num ?? docLine(doc, d).num}</div>
      <div className="Between flex wrap stretch">
        <div className={`FinNam  ${color} start`}>{doc?.nam ?? docLine(doc, d).nam}</div>
        <div className={`FinUsr  ${color} start`}>{doc?.usr ?? docLine(doc, d).usr}</div>
        <div className={`FinInf1 ${color} start`}>{doc?.inf ?? docLine(doc, d).inf}</div>
        <div className={`FinNet  ${color} end`}>{doc?.net ?? docLine(doc, d).net}</div>
        <div className={`FinBru  ${color} end`}>{doc?.bru ?? docLine(doc, d).bru}</div>
        <div className={`FinInf2 ${color} start`}>{doc?.inf ?? docLine(doc, d).inf}</div>
      </div>
      <div className={`FinBtn ${color} end`}>{doc?.btn ?? docLine(doc, d).btn}</div>
      { edit && <EditArea props={{company, mode, doc, edit, setEdit, RELOAD}} /> }
    </div>
  )
}