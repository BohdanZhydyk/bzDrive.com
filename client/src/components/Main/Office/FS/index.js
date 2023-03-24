import React, { useState, useEffect } from "react"

import "./FS.scss"
import { FSreducer } from "./FSreducer"
import { tr } from "../../../../AppTranslate"
import { GetUser, TimeTo_YYYYMM, TimeTo_YYYYMMDD } from "../../../../AppFunctions"
import { InvLine } from "./InvLine"
import { Title } from "./Title"


function FS({ props:{company} }){
  
  const mode = "FS"
  const lang = GetUser().lang

  const topLine = {
    nr: `${tr(`DocName_${mode}`,lang)[0]} Nr`,
    seller: tr(`TableSeller`,lang),
    client: tr(`TableBuyer`,lang),
    nip: "NIP",
    sum: `${tr(`TableSUM`,lang)}, zł`
  }

  const [invoices, setInvoices] = useState(false)

  const [firstDay, setFirstDay] = useState( parseInt(`${TimeTo_YYYYMM( Date.now() )}01`) )
  const [lastDay, setLastDay] = useState( parseInt(`${TimeTo_YYYYMMDD( Date.now() )}`) )

  const query = {mode, companyName:company?.shortName, "nr.from":{ $gte:firstDay, $lte:lastDay }}
  const SAVE_DOC = (id, docData)=>{
    setInvoices(false)
    FSreducer({type:"SAVE_DOC", id, docData, query}, (data)=>setInvoices(data))
  }

  useEffect( ()=>{ FSreducer({type:"GET_INVOICES", query}, (data)=>setInvoices(data)) },[company])

  // console.log("invoices", invoices)

  return(
    <div className="FS flex column">

      { invoices && <Title props={{mode, lang, firstDay, lastDay}} /> }

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