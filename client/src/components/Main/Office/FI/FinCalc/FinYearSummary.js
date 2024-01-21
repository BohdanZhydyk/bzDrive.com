import React from "react"

import { bzCalc, SumArray, TimeTo_YYYYMM } from "../../../../../AppFunctions"
import { calcTaxProfit } from "./../FinLogic"


export function FinYearSummary({ props:{lang, finances, taxPrevYear, GET_YEAR} }){

  const nowYear = parseInt( TimeTo_YYYYMM( Date.now() ).toString().slice(0,4) )
  const finYear = parseInt( (finances?.length > 0) ? finances[0]?.date?.year : new Date().getFullYear() )
  const isNowYear = nowYear === finYear

  // netRevenue - przychód netto
  const netRevenue = SumArray(finances.map( el=> el?.col_9 ?? "0.00"))
  // netCosts - wydatki netto
  const netCosts = SumArray(finances.map( el=> bzCalc("+", el?.col_10 ?? "0.00", el?.col_14 ?? "0.00") ))
  // Składki zdrowotne ZUS
  const taxZUS = SumArray(finances.map( el=> el?.ZUS ?? "0.00"))

  const incomeTaxThreshold = "120000.00" // próg podatkowy
  const taxReductionAmount = "3600.00" // kwota zmniejszająca podatek
  const incomeTaxRate1 = "12" // stawka podatku poniżej progu
  const incomeTaxRate2 = "32" // stawka podatku powyżej progu
  const taxVatRate = "23" // stawka podatku VAT

  const calkulatedData = calcTaxProfit(
    netRevenue, netCosts,
    incomeTaxRate1, incomeTaxRate2, taxVatRate,
    incomeTaxThreshold, taxReductionAmount,
    taxZUS
  )

  const finInfo = [
    {grp:`Forma opodatkowania - "na zasadach ogólnych"`, cl:`underline bold`},
    {txt:`Próg podatkowy:`, val:`${incomeTaxThreshold} zł`},
    {txt:`Kwota zmniejszająca podatek:`, val:`${taxReductionAmount} zł`},
    {txt:`Stawka podatku poniżej progu:`, val:`${incomeTaxRate1} %`},
    {txt:`Stawka podatku powyżej progu:`, val:`${incomeTaxRate2} %`},
    {grp:`Obliczenia dla bieżącego roku`, cl:`underline bold`},
    {txt:`Przychód za rok podatkowy (netto):`, val:`${netRevenue} zł`},
    {txt:`Wydatki za rok podatkowy (netto):`, val:`${netCosts} zł`},
    {txt:`Podatek VAT:`, val:`${calkulatedData.vat} zł`},
    {txt:`Składki zdrowotne ZUS:`, val:`${taxZUS} zł`},
    {txt:`Podatek dochodowy:`, val:`${calkulatedData.tax} zł`},
    {
      txt:`Dochód (netto) :`, val:`${calkulatedData.profit} zł`,
      cl:parseFloat(calkulatedData.profit) >=0 ? `txtGrn bold` : `txtRed bold`
    },
  ]

  const prevBtnCl = taxPrevYear ? `GrnBtn bold` : ``
  const nextBtnCl = !isNowYear ? `GrnBtn` : ``

  const GET_PREV_YEAR = ()=> taxPrevYear && GET_YEAR(finYear - 1)
  const GET_NEXT_YEAR = ()=> !isNowYear && GET_YEAR(finYear + 1)

  return(
    <div className="FinYearSummary flex column start">

      <div className="FinYear flex between">

        <div className={`YearBtn ${prevBtnCl} flex`} onClick={GET_PREV_YEAR} >
          {`${finYear - 1}`}
        </div>

        <span className="YearNow txtOrg bold flex">{ finYear }</span>

        <div className={`YearBtn ${nextBtnCl} flex`} onClick={GET_NEXT_YEAR} >
          {`${finYear + 1}`}
        </div>
        
      </div>

      {
        finInfo.map( (sect, i)=>{
          const key = `FinYearInfo${i}`
          return(
            <div className="FinYearInfo flex" key={key}>
              {
                sect?.grp &&
                <span className={`FinYearInfoGroup ${sect?.cl} flex start`}>
                  {sect.grp}
                </span>
              }
              {
                sect?.txt &&
                <span className={`FinYearInfoTxt ${sect?.cl} flex start`}>
                  {sect.txt}
                </span>
              }
              {
                sect?.val &&
                <span className={`FinYearInfoVal ${sect?.cl} flex end`}>
                  {sect.val}
                </span>
              }
            </div>
          )
        })
      }

    </div>
  )
}