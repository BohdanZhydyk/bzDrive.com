import React from "react"

import { tr } from "../../../../AppTranslate"
import TextArea from "../../../All/TextArea"


export function ElFaults({ props:{user, car, setCar, setSave} }) {

  const TextAreaProps = {
    plhol: tr(`PlaceHolder`,user.lang),
    val: car?.faults ?? '',
    cbVal: (val)=>{ setSave(true); setCar( (prev) => ({...prev, faults:val})) },
    cbErr: (val)=> {}
  }

  return(
    <section className="ElFaults flex column">

      <div className="FaultsTop bold flex start">{tr(`FaultsTop`,user.lang)}</div>

      <div className="TextAreaSection flex">
        <TextArea props={TextAreaProps}/>
      </div>

    </section>
  )
}