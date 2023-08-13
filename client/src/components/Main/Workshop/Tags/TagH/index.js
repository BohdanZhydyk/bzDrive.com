import React, { useState } from "react"

import "./TagH.scss"
import Input from "../../../../All/Input"


function TagH({ props:{el, nr, user, setWorkshop, editMode, editingTag, setEditingTag} }){

  const [edit, setEdit] = useState(false)

  function CLICK(){
    if(editMode && !editingTag){
      setEdit(prev=>true)
      setEditingTag( prev=>el )
    }
  }

  const inputPropses = (lan)=>{
    return {
      legend: lan,
      type: `text`,
      val: el.body[lan],
      cbVal: (val)=>{
        const newEl = {...el, body:{...el?.body, [lan]:val} }
        setWorkshop( prev=> prev?.map( (el, e)=> (e !== nr) ? el : newEl ))
        setEditingTag( prev=> newEl )
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
            return <Input props={inputPropses(lan)} key={`EditTagH${nr}${l}`} />
          })
        }
        </div>
      }
      </h3>
    
    </div>
  )
}

export default TagH