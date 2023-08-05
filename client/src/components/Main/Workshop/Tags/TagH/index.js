import React, { useState } from "react"

import "./TagH.scss"
import Input from "../../../../All/Input"


function TagH({ props:{el, i, user, setWorkshop, editMode, setEditingText} }){

  const [edit, setEdit] = useState(false)

  function CLICK(){ editMode && setEdit(prev=>true)}

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
        setEditingText(prev=>true)
      },
      cbErr: ()=>{}
    }
  }

  return(
    <div className={`${editMode ? `AdminBorder` : `Border`} flex`} onClick={CLICK}>

      <h3 className="TagH flex">
      {
        !edit
        ?
        <span>{el.body[user?.lang]}</span>
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
    
    </div>
  )
}

export default TagH