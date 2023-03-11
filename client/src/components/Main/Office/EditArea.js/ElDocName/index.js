import React from "react"

import "./ElDocName.scss"
import { DocTitle } from "./DocTitle"
import { DocSign } from "./DocSign"


function ElDocName({ props:{user, mode, nr, setNr, setSave, editErr, setEditErr} }) {

  const lang = user.lang

  return(
    <div className="ElDocName flex column">

      <DocTitle props={{lang, mode, nr}} />

      <DocSign props={{lang, nr, setNr, setSave, editErr, setEditErr}} />

    </div>
  )
}

export default ElDocName