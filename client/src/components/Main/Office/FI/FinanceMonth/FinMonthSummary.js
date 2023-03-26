import React, { useState } from "react"

import { bzCalc } from "../../../../../AppFunctions"
import ActionBtn from "./../../../../All/ActionBtn"


export function FinMonthSummary({ props:{fi, newMonth, taxYear, edit, setEdit, editDocs, SAVE_MONTH} }){

  const date = `${fi?.date.toString().slice(0,4)} / ${fi?.date.toString().slice(4,6)}`
  
  const [incomes, setIncomes] = useState(fi?.col_9)
  const [buyMaterials, setBuyMaterials] = useState(fi?.col_10)
  const [elseExpenses, setElseExpenses] = useState(fi?.col_14)
  const [ZUS, setZUS] = useState(fi?.ZUS)
  const [pVAT, setpVAT] = useState(fi?.pVAT)
  const [pZUS, setpZUS] = useState(fi?.pZUS)
  
  const isFirstMonth = parseInt( fi?.date.toString().slice(4,6) ) === 1
  const outgoings = bzCalc("+", buyMaterials, elseExpenses)
  const profit = bzCalc("-", bzCalc("-", incomes, outgoings), ZUS)
  const VAT = bzCalc("*", bzCalc("-", incomes, outgoings), "0.23")

  function CHG(fn, e){
    let val = e?.target?.value
    if(val === ""){val = "0.00"}
    const regex = /[^0-9.-]/g
    const sanitized = val.replace(regex, "")
    fn( parseFloat(sanitized).toFixed(2) )
  }

  const incomesInput = <input type="text" value={incomes} onChange={(e)=>CHG(setIncomes, e)} />
  const buyMaterialsInput = <input type="text" value={buyMaterials} onChange={(e)=>CHG(setBuyMaterials, e)} />
  const elseExpensesInput = <input type="text" value={elseExpenses} onChange={(e)=>CHG(setElseExpenses, e)} />
  const ZUSInput = <input type="text" value={ZUS} onChange={(e)=>CHG(setZUS, e)} />
  const pVATInput = <input type="text" value={pVAT} onChange={(e)=>CHG(setpVAT, e)} />
  const pZUSInput = <input type="text" value={pZUS} onChange={(e)=>CHG(setpZUS, e)} />

  const clProfit = `${parseFloat(profit) >= 0 ? `txtGrn bold` : `txtRed bold`}`

  const monthInfo = [
    {grp:"Obliczenia dla bieżącego miesiąca", cl:`underline bold`},
    {txt:"Dochód (netto) :", val:`${profit} zł`, cl:clProfit},
    {txt:"Przychód (netto) :", val:edit ? incomesInput : `${incomes} zł`},
    {txt:"Zakup materjalów (netto) :", val:edit ? buyMaterialsInput : `${buyMaterials} zł`},
    {txt:"Koszty (netto) :", val:edit ? elseExpensesInput : `${elseExpenses} zł`},
    {txt:"Wydatki (netto) :", val:`${outgoings} zł`},
    {txt:"VAT :", val:`${VAT} zł`, cl:`txtYlw`},
    {txt:"ZUS :", val:edit ? ZUSInput : `${ZUS} zł`, cl:`txtYlw`},
    {grp:"Opłaty za poprzedni miesiąc", cl:`underline bold`},
    {txt:`${pVAT >= 0 ? `Do zapłaty` :`Nadwyższka` } VAT :`, val:isFirstMonth && edit ? pVATInput : `${pVAT} zł`, cl:`txtYlw`},
    {txt:"Do zapłaty ZUS :", val:isFirstMonth && edit ? pZUSInput : `${pZUS} zł`, cl:`txtYlw`}
  ]

  const SAVE = ()=>{
    setEdit(false)
    const template = {date:fi?.date, col_9:incomes, col_10:buyMaterials, col_14:elseExpenses, ZUS}
    const month = isFirstMonth ? {...template, pVAT, pZUS} : template
    SAVE_MONTH({newMonth, year:taxYear, month})
  }

  return(
    <div className="FinMonthSummary">

      <div className="Line TopLine flex start">

        <span className="LineDate txtOrg bold">{date}</span>

        {
          editDocs &&
          <span className="LineBtn flex end">
            {
              newMonth
              ? <ActionBtn props={{name:"save", click:()=>SAVE()}} />
              : <ActionBtn props={{name:edit ? "save" : "edit", click:()=> !edit ? setEdit(!edit) : SAVE()}} />
            }
          </span>
        }
        
      </div>

      {
        monthInfo?.map( (line, l)=>{
          return(
            <div className="Line flex start" key={`MonthInfoLine${l}`}>
            {
              line?.grp &&
              <span className={`LineGroup ${line?.cl} flex start`}>
                {line.grp}
              </span>
            }
            {
              line?.txt &&
              <span className={`LineName ${line?.cl} flex start`}>
                {line.txt}
              </span>
            }
            {
              line?.val &&
              <span className={`LineVal ${line?.cl} flex end`}>
                {line.val}
              </span>
            }
            </div>
          )
        })
      }

    </div>
  )
}