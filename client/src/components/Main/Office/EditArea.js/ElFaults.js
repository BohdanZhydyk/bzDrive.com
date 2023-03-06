import React from "react"

import TextArea from "../../../All/TextArea"


export function ElFaults({ props:{car, setCar} }) {

  const TextAreaProps = {
    plhol: "textarea",//tr(`PlaceHolder`,lang),
    val: car?.faults ?? '',
    cbVal: (val)=> setCar( (prev) => ({...prev, faults:val})),//sanitizeTxt(val, `login`).sanText
    cbErr: (val)=> {}
    // cbErr: (val)=> setFormErr( (prev) => ({
    //   ...prev, login:sanitizeTxt(val, `login`).sanErr
    // }))
  }

  return(
    <div className="ElFaults flex column">

      <div className="FaultsTop bold flex start">CarFaults</div>

      <div className="TextAreaSection flex">
        <TextArea props={TextAreaProps}/>
      </div>

    </div>
  )
}