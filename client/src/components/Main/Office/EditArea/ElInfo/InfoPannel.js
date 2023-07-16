import React from "react"

import { tr } from "../../../../../AppTranslate"
import Input from "../../../../All/Input"
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
        InfoProps.map( (input, i)=>{
          return(
            <div className={`Input_${input?.classes}`} key={`Input_${input?.classes}${i}`}>
              <Input props={ input }/>
            </div>
          )
        })
      }
      </div>

    </div>
  )
}