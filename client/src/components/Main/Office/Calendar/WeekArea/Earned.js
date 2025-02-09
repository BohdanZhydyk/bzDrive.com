import React from "react"


export function Earned({ props:{earned} }) {

  const tax = earned?.white?.tax
  const vat = earned?.white?.vat
  const income = earned?.white?.income
  const expense = earned?.white?.expense
  const total = earned?.white?.total

  const incomeBlack = earned?.black?.income
  const expenseBlack = earned?.black?.expense
  const totalBlack = earned?.black?.total

  const classes = "AmountElement flex end"
  const cl = (val)=> `txt${val > 0 ? `Grn` : `Red`} bold`

  return(
    <div className="Earned flex column">

      <div className="AmountLine flex end">
        { parseInt(tax) > 0 && <div className={`${classes} txtYlw`}>{tax}</div> }
        <div className={`${classes} txtBlu`}>{vat}</div>
        <div className={`${classes} txtGrn`}>{income}</div>
        <div className={`${classes} txtRed`}>{expense}</div>
        <div className={`${classes} ${cl(total)}`}>{total}</div>
      </div>

      <div className="AmountLine flex end">
        <div className={`${classes} txtGrn`}>{incomeBlack}</div>
        <div className={`${classes} txtRed`}>{expenseBlack}</div>
        <div className={`${classes} ${cl(totalBlack)}`}>{totalBlack}</div>
      </div>

    </div>
  )
}