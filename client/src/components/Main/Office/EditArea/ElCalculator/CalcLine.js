import React from 'react'

import { ArtInput } from './ArtInput'
import { ArtNameInput } from './ArtNameInput'
import { bzCalc } from '../../../../../AppFunctions'


export function CalcLine({ props:{
  TOT, CLA, NUM, ART, PRI, QUA, VAT, NET, PRV, SUM, FN, BTN, printMode, top, setArticles, setSave
} }){

  const Top = CLA === "TableCellTop"
  const Bottom = CLA === "TableCellBottom"

  const pl = "new product / service name"

  const propsesART = { name:"ART", isDisplay:(Top || printMode), val:ART, align:"start", CLA, FN, pl }
  const propsesPRI = { name:"PRI", isDisplay:(Top || printMode), val:PRI, CLA, FN }
  const propsesQUA = { name:"QUA", isDisplay:(Top || printMode), val:QUA, CLA, FN }
  const propsesVAT = { name:"VAT", isDisplay:(Top || printMode), val:VAT, CLA, FN }
  const propsesNET = { name:"NET", isDisplay:(Top || Bottom || printMode), val:NET, CLA, FN }
  const propsesPRV = { name:"PRV", isDisplay:(Top || Bottom || printMode), val:PRV, CLA, FN }
  const propsesSUM = { name:"SUM", isDisplay:(Top || Bottom || printMode), val:SUM, CLA, FN }

  function CALC_FUEL_COSTS(){
    setArticles( prev=>
      prev?.length > 0
      ? prev.map( art =>{
        const brutto = art?.SUM
        const netto = bzCalc("/", brutto, "1.23")
        const vat = bzCalc("-", brutto, netto)
        const vatDeducted = bzCalc("*", vat, "0.50")
        const totalCost = bzCalc("+", netto, vatDeducted)
        const deductibleCost = bzCalc("*", totalCost, "0.75")
        return {...art, PRI:netto, VAT:"0", NET:deductibleCost, PRV:vatDeducted }
      })
      : prev
    )
    setSave( prev=> true )
  }

  return(
    <div className={`CalcLine ${top ? `` : `BorderBottom`} flex end stretch`}>

      <div className={`TableNUM ${CLA} flex`}>{ !Bottom && NUM }</div>

      <div className="CellsBetween flex end wrap stretch">

        <div className='CellsOne flex stretch'>

          { !Bottom && <ArtNameInput props={propsesART} /> }

          {
            Bottom && !printMode &&
            <div className="VATbtns flex start">
              <div className="CalcFuelBtn flex" onClick={()=>CALC_FUEL_COSTS()}>
                {`Obliczyć koszty paliwa`}
              </div>
            </div>
          }

        </div>

        <div className='CellsTwo flex end stretch'>

          { TOT && <span className={`TableTOT ${CLA} flex end`}>{ TOT }</span> }

          { !Bottom && <ArtInput props={propsesPRI} /> }

          { !Bottom && <ArtInput props={propsesQUA} /> }

          { !Bottom && <ArtInput props={propsesVAT} /> }

          <ArtInput props={propsesNET} />

          <ArtInput props={propsesPRV} />

          <ArtInput props={propsesSUM} />
        
        </div>
        
      </div>
        
      {
        !printMode &&
        <span className={`TableBTN ${CLA} flex`}>{ BTN }</span>
      }

    </div>
  )
}