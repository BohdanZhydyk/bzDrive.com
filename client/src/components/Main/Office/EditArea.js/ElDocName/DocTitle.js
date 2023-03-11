import React from "react"

import { tr } from "../../../../../AppTranslate"
import { DocNameNormalize} from "../../ZL/ZLfunctions"


export function DocTitle({ props:{lang, mode, nr} }) {
  return(
    <div className="DocTitle bold flex">
      <div className="DocName flex end">{`${tr(`DocName_${mode}`,lang)} Nr`}</div>
      <div className="DocNr flex">{DocNameNormalize(nr)}</div>
    </div>
  )
}