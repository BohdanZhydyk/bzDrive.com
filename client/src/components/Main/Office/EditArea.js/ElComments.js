import React from "react"

import { tr } from "../../../../AppTranslate"
import TextArea from "../../../All/TextArea"


export function ElComments({ props:{user, car, setCar, setSave} }) {

  const TextAreaProps = {
    plhol: tr(`PlaceHolder`,user.lang),
    val: car?.comments ?? '',
    cbVal: (val)=>{ setSave(true); setCar( (prev) => ({...prev, comments:val})) },
    cbErr: (val)=> {}
  }

  return(
    <section className="ElComments flex column">

      <div className="CommentsTop bold flex start">{tr(`CommentsTop`,user.lang)}</div>

      <div className="TextAreaSection flex">
        <TextArea props={TextAreaProps}/>
      </div>

    </section>
  )
}