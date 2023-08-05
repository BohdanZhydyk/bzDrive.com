import React, { useState } from "react"

import "./TagUl.scss"
import { UlWrapper } from "./UlWrapper"
import { UlInputsWrapper } from "./UlInputsWrapper"


function TagUl({ props:{el, i, user, setWorkshop, editMode, setEditingText} }){

  const [edit, setEdit] = useState(false)

  function CLICK(){ editMode && setEdit(prev=>true)}

  return(
    <div className={`${editMode ? `AdminBorder` : `Border`} flex`} onClick={CLICK}>

      <div className="TagUl flex column" onClick={CLICK}>

        {
          !edit
          ? <UlWrapper props={{el, user}} />
          : <UlInputsWrapper props={{el, i, setWorkshop, setEditingText}} />
        }

      </div>

    </div>
  )
}

export default TagUl