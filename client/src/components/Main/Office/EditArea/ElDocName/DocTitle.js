import React from "react"

import { tr } from "../../../../../AppTranslate"
import { DocNameNormalize } from "../../../../../AppFunctions"


export function DocTitle({ props:{lang, mode, nr} }) {

  const docName = `${tr(`DocName_${mode}`,lang)[0]} Nr`
  const docNr = DocNameNormalize(nr)

  return(
    <div className="DocTitle bold flex">

      <div className="DocName flex end">{docName}</div>

      <div className="DocNr flex">{docNr}</div>

    </div>
  )
}