import React, { useState, useEffect } from "react"

import "./FS.scss"
import { FSreducer } from "./FSreducer"
import { tr } from "../../../../AppTranslate"
import { GetUser, TimeTo_YYYYMMDD, YYYYMMDD_ToFirstDayOfMonth, YYYYMMDD_ToLastDayOfMonth } from "../../../../AppFunctions"
import { InvLine } from "./InvLine"
import { Title } from "./Title"
import NIPinfo from "../NIPinfo"


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

  const [invoices, setInvoices] = useState([])

  const [dlw, setDlw] = useState(0)

  const date = TimeTo_YYYYMMDD( Date.now() )

  const [firstDay, setFirstDay] = useState( YYYYMMDD_ToFirstDayOfMonth(date) )
  const [lastDay, setLastDay] = useState( YYYYMMDD_ToLastDayOfMonth(date) )

  let intDownloadBtn = null

  const GET_INVOICES = (firstDay, lastDay)=>{

    clearInterval(intDownloadBtn)
    setDlw(0)

    intDownloadBtn = setInterval( ()=>{ setDlw( prev=> prev + (100 - prev)/200 ) }, 5)

    const query = {mode, companyName:company?.shortName, "nr.from":{ $gte:firstDay, $lte:lastDay }}
    FSreducer({type:"GET_INVOICES", query}, (data)=>{

      const sortedData = !data ? [] : data.sort( (a, b) =>{
        return (a.nr.from !== b.nr.from) ? a.nr.from - b.nr.from : a.nr.sign - b.nr.sign
      })
      setInvoices(prev=> prev ? [...sortedData, ...prev] : [...sortedData] )

      clearInterval(intDownloadBtn)
      setDlw(0)
    })

  }

  const MINUS_MONTH = (currentFirstDay)=>{

    const currentYear = currentFirstDay.toString().slice(0, 4)
    const currentMonth = currentFirstDay.toString().slice(4, 6)
  
    const newMonth = (currentMonth === '01') ? '12' : (parseInt(currentMonth, 10) - 1).toString().padStart(2, '0')
    const newYear = (currentMonth === '01') ? (parseInt(currentYear, 10) - 1).toString() : currentYear
  
    const newFirstDay = parseInt(`${newYear}${newMonth}01`, 10)
    const newLastDay = YYYYMMDD_ToLastDayOfMonth(newFirstDay)
  
    setFirstDay(newFirstDay)
    // setLastDay(newLastDay)
  
    GET_INVOICES(newFirstDay, newLastDay)
  }

  const RELOAD = ()=>{
    setInvoices([])
    GET_INVOICES(firstDay, lastDay)
  }

  useEffect( ()=>{ RELOAD() },[company])

  // console.log("invoices", invoices)

  return(
    <div className="FS flex column">

      <Title props={{mode, lang, firstDay, lastDay}} />

      <div className="ToolsArea flex end wrap">

        <NIPinfo props={{}}/>

        <div className="MinusMonthBtn flex" onClick={()=>MINUS_MONTH(firstDay)}>
          <span>{tr(`MinusMonthBtn`,lang)}</span>
        </div>
        
      </div>

      {
        [topLine, ...invoices].map( (invoice, i)=>{

          const key = `InvoiceLine${i}`
          const top = i === 0

          return(
            <InvLine props={{company, mode, top, invoice, dlw, RELOAD}} key={key} />
          )
        })
      }

      {
        (invoices?.length < 1) && (dlw === 0) &&
        <div className="IsInvoices flex bold txtOrg">{`Nie znaleziono dokumentów w bazie danych dla podanego okresu czasu!`}</div>
      }

    </div>
  )
}

export default FS