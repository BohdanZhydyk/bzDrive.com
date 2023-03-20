import React, { useState, useEffect } from "react"

import "./FS.scss"
import { FSreducer } from "./FSreducer"
import { GetUser, TimeTo_YYYYMM, TimeTo_YYYYMMDD } from "../../../../AppFunctions"
import { InvLine } from "./InvLine"
import { Title } from "./Title"


function FS({ props:{company} }){
  
  const mode = "FS"
  const lang = GetUser().lang

  const topLine = {
    nr:"Faktura Nr.",
    seller:"Sprzedawca",
    client:"Nabywca",
    nip:"NIP",
    sum:"Wartość brutto, zł"
  }

  const [invoices, setInvoices] = useState(false)

  const [firstDay, setFirstDay] = useState( parseInt(`${TimeTo_YYYYMM( Date.now() )}01`) )
  const [lastDay, setLastDay] = useState( parseInt(`${TimeTo_YYYYMMDD( Date.now() )}`) )

  const query = {mode, companyName:company?.shortName, "nr.from":{ $gte:firstDay, $lte:lastDay }}
  const SAVE_DOC = (id, docData)=>{
    setInvoices(false)
    FSreducer({type:"SAVE_DOC", id, docData, query}, (data)=>setInvoices(data))
  }

  useEffect( ()=>{ !invoices && FSreducer({type:"GET_INVOICES", query}, (data)=>setInvoices(data)) },[])

  // console.log("invoices", invoices)

  return(
    <div className="FS flex column">

      { invoices && <Title props={{lang, firstDay, lastDay}} /> }

      {
        invoices && [topLine, ...invoices].map( (invoice, i)=>{

          const key = `InvoiceLine${i}`
          const top = i === 0

          return(
            <InvLine props={{company, mode, top, invoice, SAVE_DOC}} key={key} />
          )
        })
      }

    </div>
  )
}

export default FS