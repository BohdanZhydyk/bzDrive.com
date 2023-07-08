import React, { useEffect, useState } from "react"

import "./NIPinfo.scss"
import Input from "./../Input"
import { GET_VIN, brandPropses, enginePropses, modelPropses, prodPropses, vinPropses } from "./VINDecoderLogic"


function NIPinfo(){

  const [vin, setVin] = useState(false)
  const [car, setCar] = useState(false)
  const [editErr, setEditErr] = useState(false)

  const inputs = [
    {isInput:car?.brand,  cl:"Brand",   pr:brandPropses(car, setCar, editErr, setEditErr)},
    {isInput:car?.model,  cl:"Model",   pr:modelPropses(car, setCar, editErr, setEditErr)},
    {isInput:car?.prod,   cl:"Prod",    pr:prodPropses(car, setCar, editErr, setEditErr)},
    {isInput:car?.engine, cl:"Engine",  pr:enginePropses(car, setCar, editErr, setEditErr)}
  ]

  useEffect( ()=>{
    
    if(vin?.length === 17){

      setEditErr( (prev)=> ({...prev, carVIN:""}) )

      GET_VIN(vin, car, (data)=>{
        setEditErr( (prev)=> ({...prev, carVIN:data?.msg}) )
        setCar( (prev)=> ({...prev, ...data?.carData}) )
      })

    }
    else{ setCar( (prev)=> false ) }

  },[vin])

  // console.log("car", car)
  // console.log("msg", msg)

  return(  
    <div className="VINDecoder flex end wrap">

      {
        inputs.map( (input, i)=>{
          const classes = input?.isInput ? `${input?.cl}Input flex` : ``
          const key = `VINinputs${input?.cl}${i}`
          return(
            <div className={classes} key={key}>
              { input?.isInput && <Input props={input?.pr}/> }
            </div>
          )
        })
      }

      <div className="VINinput flex">
        <Input props={vinPropses(vin, setVin, car, setCar, editErr, setEditErr)}/>
      </div>

    </div>
  )
}

export default NIPinfo