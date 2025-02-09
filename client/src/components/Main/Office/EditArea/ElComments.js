import React from "react"

import { tr } from "../../../../AppTranslate"
import TextArea from "../../../All/TextArea"


export function ElComments({ props:{user, car, setCar, setSave, printMode} }) {

  const TextAreaProps = {
    plhol: tr(`PlaceHolder`,user.lang),
    val: car?.comments ?? "",
    cbVal: (val)=>{ setSave(true); setCar( (prev) => ({...prev, comments:val})) },
    cbErr: (val)=> {}
  }

  const title = tr(`CommentsTop`,user.lang)

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
    <section className="ElComments flex column">

      <div className="CommentsTop bold flex start">{title}</div>

      <div className="TextAreaSection flex column start">
      {
        printMode
        ? <div className="StrToLines">{ strToLines(car?.comments) }</div>
        : <TextArea props={TextAreaProps}/>
      }
      </div>

    </section>
  )
}