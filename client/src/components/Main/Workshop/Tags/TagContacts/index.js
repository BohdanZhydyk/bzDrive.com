import React from "react"

import "./TagContacts.scss"
import { Left } from './Left'
import { Right } from './Right'


function TagContacts({ props:{el, lang} }){

  let GoogleMap = el?.body.filter( (EL)=> EL.element === "map" )
  let contacts = el?.body.filter( (EL)=> EL.element !== "map" )

  return(
    <section className="tag">
      <div className="TagContacts flex center stretch wrap">

        <Left props={{GoogleMap}} />
        <Right props={{contacts, lang}} />

      </div>
    </section>
  )
}

export default TagContacts