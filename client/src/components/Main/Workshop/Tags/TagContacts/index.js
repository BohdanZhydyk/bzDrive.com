import React, { useState } from "react"

import "./TagContacts.scss"
import { Left } from './Left'
import { Right } from './Right'


function TagContacts({ props:{el, i, user, setWorkshop, editMode, setEditingText} }){

  const [edit, setEdit] = useState(false)

  function CLICK(){ editMode && setEdit(prev=>true)}

  let GoogleMap = el?.body.filter( (EL)=> EL.element === "map" )
  let contacts = el?.body.filter( (EL)=> EL.element !== "map" )

  return(
    <div className={`${editMode ? `AdminBorder` : `Border`} flex`} onClick={CLICK}>

      <div className="TagContacts flex center stretch wrap" onClick={CLICK}>

        <Left props={{edit, GoogleMap, i, setWorkshop, setEditingText}} />
        <Right props={{edit, contacts, i, user, setWorkshop, setEditingText}} />

      </div>

    </div>
  )
}

export default TagContacts