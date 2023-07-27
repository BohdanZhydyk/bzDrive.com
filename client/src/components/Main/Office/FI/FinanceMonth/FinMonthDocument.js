import React, { useState } from "react"

import { DocNameNormalize, SumArray } from "../../../../../AppFunctions"
import EditArea from "../../EditArea"


export function FinMonthDocument({ props:{company, doc, d, RELOAD} }){

  const top = d === 0

  const mode = doc?.nr?.mode
  const color = `${top ? `FinCell` : `FinCell FinDocColor${mode} overflow`} flex`
  const docCl = doc?.cl ?? `FinDoscLine`

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
      bru: SumArray(doc?.articles?.map( (el)=> el?.SUM ))
    }
  }

  const classes = {
    num: `FinNum ${color}`,
    nam: `FinNam ${color} start`,
    usr: `FinUsr ${color} start`,
    net: `FinNet ${color} end`,
    bru: `FinBru ${color} end`,
    inf1: `FinInf1 ${color} start overflow`,
    inf2: `FinInf2${top ? `Top` : ``} ${color} start overflow`,
  }

  const CLICK = ()=> !top && setEdit(!edit)

  // console.log(doc)

  return(
    <div className={`${docCl} flex wrap stretch`}>
      <div className={classes?.num} onClick={CLICK}>{doc?.num ?? docLine(doc, d).num}</div>
      <div className="Between flex wrap stretch" onClick={CLICK}>
        <div className={classes?.nam}>  {doc?.nam ?? docLine(doc, d).nam} </div>
        <div className={classes?.usr}>  {doc?.usr ?? docLine(doc, d).usr} </div>
        <div className={classes?.inf1}> {doc?.inf ?? docLine(doc, d).inf} </div>
        <div className={classes?.net}>  {doc?.net ?? docLine(doc, d).net} </div>
        <div className={classes?.bru}>  {doc?.bru ?? docLine(doc, d).bru} </div>
        <div className={classes?.inf2}> {doc?.inf ?? docLine(doc, d).inf} </div>
      </div>
      { edit && <EditArea props={{company, mode, doc, edit, setEdit, RELOAD}} /> }
    </div>
  )
}