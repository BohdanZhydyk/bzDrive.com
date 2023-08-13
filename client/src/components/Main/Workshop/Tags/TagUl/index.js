import React, { useState } from "react"

import "./TagUl.scss"
import { UlWrapper } from "./UlWrapper"
import { UlInputsWrapper } from "./UlInputsWrapper"


function TagUl({ props:{el, nr, user, setWorkshop, editMode, editingTag, setEditingTag} }){

  const [edit, setEdit] = useState(false)

  function CLICK(){
    if(editMode && !editingTag){
      setEdit(prev=>true)
      setEditingTag( prev=>el )
    }
  }

  return(
    <div className={`${editMode ? `AdminBorder` : `Border`} flex`} onClick={CLICK}>

      <div className="TagUl flex column" onClick={CLICK}>

        {
          !edit
          ? <UlWrapper props={{el, user}} />
          : <UlInputsWrapper props={{el, nr, setWorkshop, setEditingTag}} />
        }

      </div>

    </div>
  )
}

export default TagUl