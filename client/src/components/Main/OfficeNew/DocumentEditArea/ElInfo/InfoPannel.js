import React from "react"

import { tr } from "../../../../../AppTranslate"
import InputText from "../../../../All/InputText"
import { InfoPrintPannel } from "./InfoPrintPannel"


export function InfoPannel({ props:{lang, title, InfoProps, printMode} }){

  return(
    <div className="InfoPannel flex column start">

      <div className="InfoPannelTop bold flex start">{tr(title,lang)}</div>

      <div className="InputsPannel flex start wrap">

      {
        printMode
        ?
        <InfoPrintPannel props={{InfoProps}}/>
        :
        InfoProps && InfoProps.map( (input, i)=>{
          return(
            <div className={`Input_${input?.classes}`} key={`Input_${input?.classes}${i}`}>
              <InputText props={ input }/>
            </div>
          )
        })
      }
      </div>

    </div>
  )
}