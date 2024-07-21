import React from 'react'

import { ArtInput } from './ArtInput'
import { ArtNameInput } from './ArtNameInput'


export function CalcLine({ props:{TOT, CLA, NUM, ART, PRI, QUA, VAT, NET, PRV, SUM, FN, BTN, printMode} }){

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

  return(
    <div className="CalcLine flex end stretch">

      <div className={`TableNUM ${CLA} flex`}>{ !Bottom && NUM }</div>

      <div className="CellsBetween flex end wrap stretch">

        {
          !Bottom && <div className='CellsOne flex stretch'>
            <ArtNameInput props={propsesART} />
          </div>
        }

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