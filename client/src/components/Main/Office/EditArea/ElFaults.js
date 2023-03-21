import React from "react"

import { tr } from "../../../../AppTranslate"
import TextArea from "../../../All/TextArea"


export function ElFaults({ props:{user, car, setCar, setSave, printMode} }) {

  const TextAreaProps = {
    plhol: tr(`PlaceHolder`,user.lang),
    val: car?.faults ?? '',
    cbVal: (val)=>{ setSave(true); setCar( (prev) => ({...prev, faults:val})) },
    cbErr: (val)=> {}
  }

  const title = tr(`FaultsTop`,user.lang)

  const strToLines = (str)=>{

    if(!str || str === "") return ""
    
    return(
      str.split('\n').map( (line, l)=>{
        let key = `StrToLines_${l}_${Math.floor(Math.random() * 5)}`
        return (<div className="Line flex start" key={key}>{line}</div>)
      })
    )
  }

  return(
    <section className="ElFaults flex column">

      <div className="FaultsTop bold flex start">{title}</div>

      <div className="TextAreaSection flex">
      {
        printMode
        ? <div className="StrToLines">{ strToLines(car?.faults) }</div>
        : <TextArea props={TextAreaProps}/>
      }
      </div>

    </section>
  )
}