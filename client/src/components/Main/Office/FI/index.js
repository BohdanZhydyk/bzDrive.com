import React, { useState, useEffect } from "react"

import "./FI.scss"
import { FIreducer } from "./FIreducer"
import { GetUser, TimeTo_YYYYMM } from "../../../../AppFunctions"
import { Title } from "./Title"
import FinCalc from "./FinCalc"
import FinanceMonth from "./FinanceMonth"
import { prepareFinances } from "./FinLogic"


function FI({ props:{company} }){
  
  const mode = "FI"
  const lang = GetUser().lang

  const [finances, setFinances] = useState(false)

  const [count, setCount] = useState(1)

  const [taxYear, setTaxYear] = useState( parseInt(TimeTo_YYYYMM( Date.now() ).toString().slice(0,4)) )

  const [taxPrevYear, setTaxPrevYear] = useState(false)

  const isLastMonth = count === finances?.length

  const SAVE_MONTH = (obj)=>{
    const query = {companyName:company?.shortName, newMonth:obj?.newMonth, taxYear:obj?.year, month:obj?.month}
    setCount(1)
    setFinances(false)
    FIreducer({type:"SAVE_MONTH", query}, (data)=>{
      setFinances( prepareFinances(data) )
      data?.isPrevTaxYear && setTaxPrevYear(true)
    })
  }

  const GET_YEAR = (year)=>{
    const query = {companyName:company?.shortName, taxYear:year}
    setCount(1)
    setFinances(false)
    setTaxPrevYear(false)
    FIreducer({type:"GET_FINANCES", query}, (data)=>{
      setFinances( prepareFinances(data) )
      data?.isPrevTaxYear && setTaxPrevYear(true)
    })
  }

  const GET_DOCS = (date)=>{
    FIreducer({type:"GET_DOCUMENTS", taxDate:date, company:company?.shortName}, (data)=>{
      setFinances( finances?.map( month=> month?.date === date ? {...month, doc:data} : month ) )
    })
  }

  useEffect( ()=>{ GET_YEAR(taxYear) },[company])

  // console.log("finances", finances)

  return(
    <div className="FI flex column">

      { finances && <Title props={{mode, lang, finances}} /> }

      { finances && <FinCalc props={{lang, finances, taxPrevYear, GET_YEAR}} /> }

      {
        finances && finances.slice(0,count).map( (fi, i)=>{
          const key = `FinanceMonth${i}`
          return <FinanceMonth props={{company, fi, taxYear, SAVE_MONTH, GET_DOCS}} key={key} />
        })
      }

      <div className="BottomLine flex start">
        {
          finances && !isLastMonth &&
          <div className="PrevBtn bold flex" onClick={ ()=>setCount(count+1) }>
            {`Poprzedni miesiąc`}
          </div>
        }
      </div>

    </div>
  )
}

export default FI