import React from "react"

import "./TagContacts.scss"
import { Left } from './Left'
import { Right } from './Right'


function TagContacts({ props:{editMode, el, i, lang, setWorkshop} }){

  let GoogleMap = el?.body.filter( (EL)=> EL.element === "map" )
  let contacts = el?.body.filter( (EL)=> EL.element !== "map" )

  return(
    <div className="TagContacts flex center stretch wrap">

      <Left props={{editMode, GoogleMap, i, setWorkshop}} />
      <Right props={{editMode, contacts, i, lang, setWorkshop}} />

    </div>
  )
}

export default TagContacts