import React from "react"

import { DocNameNormalize } from "../../../../../AppFunctions"
import Input from "../../../../All/Input"


export function DocTitle({ props:{tr, lang, mode, nr, docNrPr, printMode} }) {

  const docName = `${tr(`DocName_${mode}`,lang)[0]} Nr`
  const docNr = DocNameNormalize(nr)

  return(
    <div className="DocTitle bold flex">

      <div className="DocName flex end">{docName}</div>

      {
        mode === 'FZ'
        ? (!printMode ? <Input props={docNrPr} /> : <div className="DocNr flex">{docNrPr?.val}</div>)
        : <div className="DocNr flex">{docNr}</div>
      }

    </div>
  )
}