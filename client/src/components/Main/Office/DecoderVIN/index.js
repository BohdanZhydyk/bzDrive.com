import React, { useEffect, useState } from "react"

import "./DecoderVIN.scss"
import InputText from "../../../All/InputText"
import { GET_VIN, vinPropses } from "./DecoderVINLogic"
import { GetUser } from "../../../../AppFunctions"
import { LineVIN } from "./LineVIN"


function DecoderVIN(){

  const lang = GetUser().lang

  const [vin, setVin] = useState(false)
  const [lines, setLines] = useState(false)
  const [editErr, setEditErr] = useState(false)

  useEffect( ()=>{
    
    if(vin?.length === 17){

      setLines(false)
      setEditErr( (prev)=> ({...prev, carVIN:""}) )

      GET_VIN(vin, (data)=>{

        setLines(data)
        data?.length === 0 && setEditErr( (prev)=> ({...prev, carVIN:"Not decoded!"}) )

      })

    }
    else{ setLines( (prev)=> false ) }

  },[vin])

  // console.log("lines", lines)

  return(  
    <div className="DecoderVIN flex column">

      <div className="VINinputPannel flex end">
        <div className="VINinput flex">
          <InputText props={vinPropses(vin, setVin, lines, setLines, editErr, setEditErr, lang)}/>
        </div>
      </div>

      <div className="VINlines flex column">
      {
        lines && lines.map( (line, l)=>{
          return(  
            <div className="VINline flex end stretch wrap" key={`VINinputs${l}`}>
              <div className="LineName txtOrg bold flex end">{line.msg}</div>
              <LineVIN props={{carData:line?.carData, l}} />
            </div>
          )
        })
      }
      </div>

    </div>
  )
}

export default DecoderVIN