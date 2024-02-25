import React, { useState } from "react"

import InputText from "../../../All/InputText"
import { brandPropses, enginePropses, modelPropses, prodPropses } from "./VINDecoderLogic"
import { GetUser } from "../../../../AppFunctions"


export function LineVIN({ props:{carData, l} }){

  const lang = GetUser().lang

  const [car, setCar] = useState(carData)
  const [editErr, setEditErr] = useState(false)

  const inputs = [
    {isInput:car?.brand,  cl:"Brand",   pr:brandPropses(car, setCar, editErr, setEditErr, lang)},
    {isInput:car?.model,  cl:"Model",   pr:modelPropses(car, setCar, editErr, setEditErr, lang)},
    {isInput:car?.prod,   cl:"Prod",    pr:prodPropses(car, setCar, editErr, setEditErr, lang)},
    {isInput:car?.engine, cl:"Engine",  pr:enginePropses(car, setCar, editErr, setEditErr, lang)}
  ]

  return(
    <React.Fragment>
    {
      inputs.map( (input, i)=>{
        const classes = input?.isInput ? `${input?.cl}Input flex` : ``
        const key = `VINinputs${input?.cl}${l}${i}`
        return(
          <div className={classes} key={key}>
            { input?.isInput && <InputText props={input?.pr}/> }
          </div>
        )
      })
    }
    </React.Fragment>
  )
}