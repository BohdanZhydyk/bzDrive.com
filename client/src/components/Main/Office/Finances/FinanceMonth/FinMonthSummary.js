import React, { useEffect, useState } from "react"

import { bzCalc } from "../../../../../AppFunctions"
import ActionBtn from "./../../../../All/ActionBtn"
import InputPrice from "../../../../All/InputPrice"


export function FinMonthSummary({ props:{fi, newMonth, taxYear, edit, setEdit, editDocs, SAVE_FIN_MONTH} }){

  const date = `${fi?.date?.year} / ${fi?.date?.month.toString().padStart(2, '0')}`
  
  const [incomes, setIncomes]             = useState( fi?.col_9 ?? "0.00" )
  const [buyMaterials, setBuyMaterials]   = useState( fi?.col_10 ?? "0.00" )
  const [elseExpenses, setElseExpenses]   = useState( fi?.col_14 ?? "0.00" )
  const [ZUS, setZUS]                     = useState( fi?.ZUS ?? "0.00" )
  const [pVAT, setpVAT]                   = useState("0.00")
  const [pZUS, setpZUS]                   = useState("0.00")

  const [incomesDark, setIncomesDark]     = useState("0.00")
  const [expensesDark, setExpensesDark]   = useState("0.00")
  
  const isFirstMonth = parseInt( fi?.date?.month ) === 1
  const outgoings = bzCalc("+", buyMaterials, elseExpenses)
  const profit = bzCalc("-", incomes, outgoings)
  const VAT = bzCalc("*", bzCalc("-", incomes, outgoings), "0.23")
  const profitDark = bzCalc("-", incomesDark, expensesDark)

  const isEdit = edit
  const isEditFirstMonth = isFirstMonth && edit
  const input = (val, fn)=> <InputPrice props={{val, fn}}/>
  const pricetxt = (price)=> `${price} zł`

  const incomesVal        = isEdit            ? input(incomes, setIncomes)            : pricetxt(incomes)
  const buyMaterialsVal   = isEdit            ? input(buyMaterials, setBuyMaterials)  : pricetxt(buyMaterials)
  const elseExpensesVal   = isEdit            ? input(elseExpenses, setElseExpenses)  : pricetxt(elseExpenses)
  const ZUSVal            = isEdit            ? input(ZUS, setZUS)                    : pricetxt(ZUS)
  const pVATVal           = isEditFirstMonth  ? input(pVAT, setpVAT)                  : pricetxt(pVAT)
  const pZUSVal           = isEditFirstMonth  ? input(pZUS, setpZUS)                  : pricetxt(pZUS)

  const GrnRed = (cost)=> `${parseFloat(cost) >= 0 ? `txtGrn bold` : `txtRed bold`}`

  const monthInfo = [
    {grp:"Obliczenia dla bieżącego miesiąca",                   val:false,                cl:`underline bold` },
    {txt:"Dochód (netto) :",                                    val:pricetxt(profit),     cl:GrnRed(profit)   },
    {txt:"Przychód (netto) :",                                  val:incomesVal,           cl:false            },
    {txt:"Zakup materjalów (netto) :",                          val:buyMaterialsVal,      cl:false            },
    {txt:"Koszty (netto) :",                                    val:elseExpensesVal,      cl:false            },
    {txt:"Wydatki (netto) :",                                   val:pricetxt(outgoings),  cl:false            },
    {txt:`${VAT >= 0 ? `Do zapłaty` :`Nadwyższka` } VAT :`,     val:pricetxt(VAT),        cl:`txtYlw`         },
    {txt:"Do zapłaty ZUS :",                                    val:ZUSVal,               cl:`txtYlw`         }
  ]

  const taxMonthInfo = [
    {grp:"Podatki za poprzedni miesiąc",    val:false,                    cl:`underline bold`   },
    {txt:`VAT :`,                           val:pVATVal,                  cl:`txtYlw`           },
    {txt:"ZUS :",                           val:pZUSVal,                  cl:`txtYlw`           }
  ]
  
  const darkMonthInfo = [
    {grp:`Obliczenia "na czarno"`,          val:false,                    cl:`underline bold`   },
    {txt:"Dochód (brutto) :",               val:pricetxt(profitDark),     cl:GrnRed(profitDark) },
    {txt:"Przychód (brutto) :",             val:pricetxt(incomesDark),    cl:false              },
    {txt:"Wydatki (brutto) :",              val:pricetxt(expensesDark),   cl:false              }
  ]

  const SAVE = ()=>{
    setEdit(false)
    const template = {date:fi?.date, col_9:incomes, col_10:buyMaterials, col_14:elseExpenses, ZUS}
    const month = !isFirstMonth ? template : {...template, pVAT, pZUS}
    SAVE_FIN_MONTH({newMonth, year:taxYear, month})
  }

  const btnPropses = {
    name: newMonth ? "save" : (edit ? "save" : "edit"),
    click: newMonth ? ()=>SAVE() : ()=> !edit ? setEdit(!edit) : SAVE()
  }

  useEffect( ()=>{

    setIncomes( prev=> (fi?.calc && editDocs && fi?.calc?.inc?.NET) ? fi.calc.inc.NET : (fi?.col_9 ?? "0.00") )
    setElseExpenses( prev=> (fi?.calc && editDocs) ? "0.00" : (fi?.col_10 ?? "0.00") )
    setBuyMaterials( prev=> (fi?.calc && editDocs && fi?.calc?.exp?.NET ) ? fi.calc.exp.NET : (fi?.col_14 ?? "0.00") )

    setpVAT( prev=> (fi?.calc && editDocs && fi?.calc?.pVAT) ? fi.calc.pVAT : "0.00" )
    setpZUS( prev=> (fi?.calc && editDocs && fi?.calc?.pZUS) ? fi.calc.pZUS : "0.00" )
  
    setIncomesDark( prev=> (fi?.calc && editDocs && fi?.calc?.incDark) ? fi.calc.incDark : "0.00" )
    setExpensesDark( prev=> (fi?.calc && editDocs && fi?.calc?.expDark) ? fi.calc.expDark : "0.00" )
  
  },[editDocs, fi])

  return(
    <div className="FinMonthSummary">

      <div className="Line TopLine flex start">

        <span className="LineDate txtOrg bold">{date}</span>

        {
          !editDocs &&
          <span className="LineBtn flex end">
            <ActionBtn props={{name:btnPropses?.name, click:btnPropses.click}} />
          </span>
        }
        
      </div>

      <SummaryLines props={{info:monthInfo}} />

      { editDocs && <SummaryLines props={{info:taxMonthInfo}} /> }

      { editDocs && <SummaryLines props={{info:darkMonthInfo}} /> }

    </div>
  )
}

function SummaryLines({ props:{info} }){
  return(
    <>
    {
      info?.map( (line, l)=>{

        const lineGroups = [
          {groupVal:line?.grp, classes:`LineGroup ${line?.cl ?? ``} flex start`},
          {groupVal:line?.txt, classes:`LineName ${line?.cl ?? ``} flex start`},
          {groupVal:line?.val, classes:`LineVal ${line?.cl ?? ``} flex end`},
        ]

        return(
          <div className="Line flex start" key={`MonthInfoLine${l}`}>
          {
            lineGroups.map( (group, g)=> group?.groupVal &&
              <span className={group?.classes} key={`Gr${l}${g}`}>{group?.groupVal}</span>
            )
          }
          </div>
        )
      })
    }
    </>
  )
}