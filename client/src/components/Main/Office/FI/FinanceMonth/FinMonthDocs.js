import React, { useEffect } from "react"

import { NewDocBtns } from "./NewDocBtns"
import { FinMonthDocument } from "./FinMonthDocument"


export function FinMonthDocs({ props:{company, fi, editDocs, setEditDocs, GET_DOCS, ON_CLICK} }){

  const docTop = {
    cl: `FinDoscLineTop txtOrg bold`,
    num: `Lp.`,
    usr: `user`,
    nam: `Nr dokumentu`,
    inf: `Informacja`,
    net: `Kwota netto, zł`,
    bru: `Wartość brutto, zł`
  }

  const documents = fi.doc ? [docTop, ...fi.doc] : [docTop]

  const RELOAD = ()=> GET_DOCS(fi?.date)

  useEffect( ()=>{ RELOAD() },[])

  // console.log("documents", documents)

  return(
    <div className="FinMonthDocs flex column">

      <NewDocBtns props={{company, editDocs, setEditDocs, RELOAD, ON_CLICK}} />

      {
        documents && documents.map( (doc, d)=>{
          const key = `FinDocsLine${d}`
          return <FinMonthDocument props={{company, doc, d, RELOAD}} key={key} />
        })
      }

    </div>
  )
}