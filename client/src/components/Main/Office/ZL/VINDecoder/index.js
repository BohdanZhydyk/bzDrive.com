import React, { useEffect, useState } from "react"

import "./VINDecoder.scss"
import Input from "../../../../All/Input"
import { GET_VIN, brandPropses, enginePropses, modelPropses, prodPropses, vinPropses } from "./VINDecoderLogic"


function VINDecoder(){

  const [vin, setVin] = useState(false)
  const [car, setCar] = useState(false)
  const [editErr, setEditErr] = useState(false)

  const inputs = [
    {isInput:car?.brand,  cl:"Brand",   pr:brandPropses(car, setCar, editErr, setEditErr)},
    {isInput:car?.model,  cl:"Model",   pr:modelPropses(car, setCar, editErr, setEditErr)},
    {isInput:car?.prod,   cl:"Prod",    pr:prodPropses(car, setCar, editErr, setEditErr)},
    {isInput:car?.engine, cl:"Engine",  pr:enginePropses(car, setCar, editErr, setEditErr)}
  ]

  useEffect( ()=>{ (vin?.length === 17) && GET_VIN(vin, car, setCar, editErr, setEditErr) },[vin])

  // console.log("car", car)
  // console.log("msg", msg)

  return(  
    <div className="VINDecoder flex end wrap">

      {
        inputs.map( (input, i)=>{
          return(
            <>
            {
              input?.isInput && 
              <div className={`${input?.cl}Input flex`} key={`VINinputs${i}`}>
                <Input props={input?.pr}/>
              </div>
            }
            </>
          )
        })
      }

      <div className="VINinput flex">
        <Input props={vinPropses(vin, setVin, editErr, setEditErr)}/>
      </div>

    </div>
  )
}

export default VINDecoder