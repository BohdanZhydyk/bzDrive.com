import React, { useState } from "react"

import "./TagContacts.scss"
import { Left } from './Left'
import { Right } from './Right'


function TagContacts({ props:{el, nr, user, setWorkshop, editMode, editingTag, setEditingTag} }){

  const [edit, setEdit] = useState(false)

  function CLICK(){
    if(editMode && !editingTag){
      setEdit(prev=>true)
      setEditingTag( prev=>el )
    }
  }

  let GoogleMap = el?.body.filter( (EL)=> EL.element === "map" )
  let contacts = el?.body.filter( (EL)=> EL.element !== "map" )

  return(
    <div className={`${editMode ? `AdminBorder` : `Border`} flex`} onClick={CLICK}>

      <div className="TagContacts flex center stretch wrap" onClick={CLICK}>

        <Left props={{edit, GoogleMap, el, nr, setWorkshop, setEditingTag}} />
        <Right props={{edit, contacts, el, nr, user, setWorkshop, setEditingTag}} />

      </div>

    </div>
  )
}

export default TagContacts