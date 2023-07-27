import React from "react"

import "./FinCalc.scss"
import { FinYearSummary } from "./FinYearSummary"


function FinCalc({ props:{lang, finances, taxPrevYear, GET_YEAR} }){
  return(
    <div className="FinCalc flex stretch wrap">

      <FinYearSummary props={{lang, finances, taxPrevYear, GET_YEAR}} />

      <div className="FinCalcSection">empty field...</div>

    </div>
  )
}

export default FinCalc