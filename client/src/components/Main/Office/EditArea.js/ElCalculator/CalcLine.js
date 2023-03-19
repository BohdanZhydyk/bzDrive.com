import React from 'react'

import { ArtInput } from './ArtInput'


export function CalcLine({ props:{TOT, CLA, NUM, ART, PRI, QUA, VAT, NET, PRV, SUM, FN, BTN} }){

  const Top = CLA === "TableCellTop"
  const Bottom = CLA === "TableCellBottom"

  return(
    <div className="CalcLine flex">

      <span className={`TableNUM ${CLA} flex`}>
        { NUM }
      </span>

      <span className={`TableART ${CLA} flex start`}>
      {
        Top
        ? <span>{ART}</span>
        : !Bottom ? <ArtInput props={{ val:ART, align:"left", onChange:(data)=>FN("ART", data) }} /> : <span></span>
      }
      </span>

      { TOT && <span className={`TableTOT ${CLA} flex end`}>{ TOT }</span> }

      {
        !Bottom &&
        <span className={`TablePRI ${CLA} flex`}>
        {
          Top
          ? <span>{PRI}</span>
          : <ArtInput props={{ val:PRI, align:"center", onChange:(data)=>FN("PRI", data) }} />
        }
        </span>
      }

      {
        !Bottom &&
        <span className={`TableQUA ${CLA} flex`}>
        {
          Top
          ? <span>{QUA}</span>
          : <ArtInput props={{ val:QUA, align:"center", onChange:(data)=>FN("QUA", data) }} />
        }
        </span>
      }

      {
        !Bottom &&
        <span className={`TableVAT ${CLA} flex`}>
        {
          Top
          ? <span>{VAT}</span>
          : <ArtInput props={{ val:VAT, align:"center", onChange:(data)=>FN("VAT", data) }} />
        }
        </span>
      }

      <span className={`TableNET ${CLA} flex`}>
      {
        Top || Bottom
        ? <span>{NET}</span>
        : <ArtInput props={{ val:NET, align:"center", onChange:(data)=>FN("NET", data) }} />
      }
      </span>

      <span className={`TablePRV ${CLA} flex`}>
      {
        Top || Bottom
        ? <span>{PRV}</span>
        : <ArtInput props={{ val:PRV, align:"center", onChange:(data)=>FN("PRV", data) }} />
      }
      </span>

      <span className={`TableSUM ${CLA} flex`}>
      {
        Top || Bottom
        ? <span>{SUM}</span>
        : <ArtInput props={{ val:SUM, align:"center", onChange:(data)=>FN("SUM", data) }} />
      }
      </span>

      <span className={`TableBTN ${CLA} ImgBtn flex`}> { BTN }  </span>

    </div>
  )
}