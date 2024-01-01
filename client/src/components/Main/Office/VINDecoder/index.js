import React, { useEffect, useState } from "react"

import "./VINDecoder.scss"
import Input from "../../../All/Input"
import { GET_VIN, vinPropses } from "./VINDecoderLogic"
import { GetUser } from "../../../../AppFunctions"
import { LineVIN } from "./LineVIN"


function VINDecoder(){

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
    <div className="VINDecoder flex column">

      <div className="VINinputPannel flex end">
        <div className="VINinput flex">
          <Input props={vinPropses(vin, setVin, lines, setLines, editErr, setEditErr, lang)}/>
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

export default VINDecoder