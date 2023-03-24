import React, { useState, useEffect } from "react"

import "./FI.scss"
import { FIreducer } from "./FIreducer"
import { GetUser, TimeTo_YYYYMM } from "../../../../AppFunctions"
import { Title } from "./Title"
import FinCalc from "./FinCalc"
import { FinanceMonth } from "./FinanceMonth"
import { prepareFinances } from "./FinLogic"


function FI({ props:{company} }){
  
  const mode = "FI"
  const lang = GetUser().lang

  const [finances, setFinances] = useState(false)

  const [count, setCount] = useState(10)

  const [taxYear, setTaxYear] = useState( parseInt(TimeTo_YYYYMM( Date.now() ).toString().slice(0,4)) )

  const [taxPrevYear, setTaxPrevYear] = useState(false)

  const isLastMonth = count === finances?.length

  const SAVE_DOC = (id, docData)=>{
    setFinances(false)
    const query = {companyName:company?.shortName, taxYear}
    FIreducer({type:"SAVE_DOC", id, docData, query}, (data)=>setFinances(data))
  }
  const GET_YEAR = (year)=>{
    const query = {companyName:company?.shortName, taxYear:year}
    setCount(1)
    setTaxPrevYear(false)
    FIreducer({type:"GET_FINANCES", query}, (data)=>{
      setFinances( prepareFinances(data) )
      data?.isPrevTaxYear && setTaxPrevYear(true)
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
          return <FinanceMonth props={{fi}} key={`FinanceMonth${i}`} />
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