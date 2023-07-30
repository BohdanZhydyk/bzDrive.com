import React from "react"

import "./TagH.scss"
import Input from "../../../../All/Input"


function TagH({ props:{editMode, el, i, lang, setWorkshop} }){

  const inputPropses = (lan)=>{
    return {
      legend: lan,
      type: `text`,
      val: el.body[lan],
      cbVal: (val)=>{
        setWorkshop( (prev)=> prev?.map( (el, e)=> e !== i
          ? el
          : {...el, body:{...el?.body, [lan]:val} }
        ))
      },
      cbErr: ()=>{}
    }
  }

  return(
    <h3 className="TagH flex">
    {
      !editMode
      ?
      <span>{el.body[lang]}</span>
      :
      <div className="TagHInputs flex wrap">
      {
        ["en","ua","pl"]?.map( (lan, l)=>{
          return <Input props={inputPropses(lan)} key={`EditTagH${i}${l}`} />
        })
      }
      </div>
    }
    </h3>
  )
}

export default TagH