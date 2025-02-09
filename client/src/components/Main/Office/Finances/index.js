import React, { useState, useEffect } from "react"

import "./Finances.scss"
import { FIreducer } from "./FIreducer"
import { GetUser, SumArray, TimeTo_YYYYMM, bzCalc, bzScroolToDiv } from "../../../../AppFunctions"
import SiteIcon from "../../../All/SiteIcon"
import { Title } from "./Title"
import FinCalc from "./FinCalc"
import FinanceMonth from "./FinanceMonth"


function Finances({ props:{company, finances, setFinances, Reducer} }){
  
  const mode = "FI"
  
  const lang = GetUser().lang

  const [count, setCount] = useState(1)

  const [taxYear, setTaxYear] = useState( parseInt(TimeTo_YYYYMM( Date.now() ).toString().slice(0,4)) )

  const [taxPrevYear, setTaxPrevYear] = useState(false)

  const isLastMonth = count === finances?.length

  function SET_FI(data){
    setFinances( data?.taxYearArr )
    setTaxPrevYear(data?.isPrevTaxYear)
  }

  function SAVE_FIN_MONTH(obj){
    const query = {companyName:company?.shortName, taxYear:obj?.year, month:obj?.month}
    setCount(1)
    setFinances(false)
    FIreducer( {type:"SAVE_FIN_MONTH", query}, (data)=> data && SET_FI(data) )
  }

  function GET_YEAR(year){
    const query = {companyName:company?.shortName, taxYear:year}
    setCount(1)
    setFinances(false)
    setTaxPrevYear(false)
    FIreducer( {type:"GET_FINANCES", query}, (data)=> data && SET_FI(data) )
  }

  function GET_FIN_DOCS(date){
    FIreducer({type:"GET_FIN_DOCS", taxDate:date, company:company?.shortName}, (data)=>{

      function SUM(mode, NetBrut){
        return SumArray(
          data?.filter( el=> el?.nr?.mode === mode )?.map( el=> SumArray( el?.articles?.map( el=> el[NetBrut] ) ) )
        )
      }

      const inc = {
        NET: bzCalc("+",SUM("FS","NET"),SUM("PS","NET")),
        SUM: bzCalc("+",SUM("FS","SUM"),SUM("PS","SUM"))
      }
      const exp = {
        NET: SUM("FZ","NET"),
        SUM: SUM("FZ","SUM")
      }
      const pZUS = SUM("ZU","SUM")
      const pVAT = SUM("VA","SUM")
      const incDark = bzCalc("-", bzCalc("-", bzCalc("-", SUM("ZL","SUM"), inc?.SUM), pZUS), pVAT)
      const expDark = SUM("PZ","SUM")

      setFinances( finances?.map(
        month=> month?.date === date
        // ? {...month, doc:data, calc:{inc,exp,zus,incDark,expDark}}
        ? {...month, doc:data, calc:{inc, exp, pZUS, pVAT, incDark, expDark}}
        : month
      ))
    })
  }

  function SHOW_PREV_MONTH(){
    setCount(count+1)
    bzScroolToDiv("BottomLine", 0)
  }

  useEffect( ()=>{ GET_YEAR(taxYear) },[company])
  // console.log("finances", finances)

  return(
    <div className="Finances flex column">

    {
      !finances
      ?
      <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
      :
      <>

        <Title props={{mode, lang, finances}} />

        <FinCalc props={{lang, finances, taxPrevYear, GET_YEAR}} />

        {
          finances.slice(0,count).map( (fi, i)=>{
            const key = `FinanceMonth${i}`
            return <FinanceMonth props={{company, fi, taxYear, SAVE_FIN_MONTH, GET_FIN_DOCS, Reducer}} key={key} />
          })
        }

        <div className="BottomLine flex start">
          {
            !isLastMonth &&
            <div className="PrevBtn bold flex" onClick={ SHOW_PREV_MONTH }>
              {`Poprzedni miesiąc`}
            </div>
          }
        </div>
        
      </>
    }

    </div>
  )
}

export default Finances
