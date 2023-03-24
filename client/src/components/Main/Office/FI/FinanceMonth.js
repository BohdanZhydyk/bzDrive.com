import React from "react"

import { bzCalc } from "../../../../AppFunctions"


export function FinanceMonth({ props:{fi} }){
  
  const date = `${fi?.date.toString().slice(0,4)} / ${fi?.date.toString().slice(4,6)}`
  const indepMode = fi?.indepMode
  const incomes = fi?.col_9
  const buyMaterials = fi?.col_10
  const elseExpenses = fi?.col_14
  const outgoings = bzCalc("+", buyMaterials, elseExpenses)
  const ZUS = fi.ZUS
  const pVAT = fi?.pVAT
  const pZUS = fi?.pZUS
  const profit = bzCalc("-", bzCalc("-", incomes, outgoings), ZUS)
  const VAT = bzCalc("*", bzCalc("-", incomes, outgoings), "0.23")

  const monthInfo = [
    {grp:"Obliczenia dla bieżącego miesiąca", cl:`underline bold`},
    {txt:"Dochód (netto) :", val:`${profit} zł`, cl:`${parseFloat(profit) >= 0 ? `txtGrn bold` : `txtRed bold`}`},
    {txt:"Przychód (netto) :", val:`${incomes} zł`},
    {txt:"Zakup materjalów (netto) :", val:`${buyMaterials} zł`},
    {txt:"Koszty (netto) :", val:`${elseExpenses} zł`},
    {txt:"Wydatki (netto) :", val:`${outgoings} zł`},
    {txt:"VAT :", val:`${VAT} zł`, cl:`txtYlw`},
    {txt:"ZUS :", val:`${ZUS} zł`, cl:`txtYlw`},
    {grp:"Opłaty za poprzedni miesiąc", cl:`underline bold`},
    {txt:`${pVAT >= 0 ? `Do zapłaty` :`Nadwyższka` } VAT :`, val:`${pVAT} zł`, cl:`txtYlw`},
    {txt:"Do zapłaty ZUS :", val:`${pZUS} zł`, cl:`txtYlw`}
  ]

  return(
    <div className="FinanceMonth flex column">

      <div className="Line TopLine flex start">
        <span className="LineDate txtOrg bold">{date}</span>
        { indepMode && <span>{`- Dane na podstawie dokumentow za miesiac...`}</span> }
      </div>

      {
        monthInfo?.map( (line, l)=>{
          return(
            <div className="Line flex start">
              { line?.grp && <span className={`LineGroup ${line?.cl} flex start`}>{line.grp}</span> }
              { line?.txt && <span className={`LineName ${line?.cl} flex start`}>{line.txt}</span> }
              { line?.val && <span className={`LineVal ${line?.cl} flex end`}>{line.val}</span> }
            </div>
          )
        })
      }

    </div>
  )
}