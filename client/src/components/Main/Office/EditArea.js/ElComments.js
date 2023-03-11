import React from "react"

import { tr } from "../../../../AppTranslate"
import TextArea from "../../../All/TextArea"


export function ElComments({ props:{user, car, setCar} }) {

  const TextAreaProps = {
    plhol: tr(`PlaceHolder`,user.lang),
    val: car?.comments ?? '',
    cbVal: (val)=> setCar( (prev) => ({...prev, comments:val})),//sanitizeTxt(val, `login`).sanText
    cbErr: (val)=> {}
    // cbErr: (val)=> setFormErr( (prev) => ({
    //   ...prev, login:sanitizeTxt(val, `login`).sanErr
    // }))
  }

  return(
    <div className="ElComments flex column">

      <div className="CommentsTop bold flex start">{tr(`CommentsTop`,user.lang)}</div>

      <div className="TextAreaSection flex">
        <TextArea props={TextAreaProps}/>
      </div>

    </div>
  )
}