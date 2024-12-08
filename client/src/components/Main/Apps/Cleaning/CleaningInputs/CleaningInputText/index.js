import React from "react"

import "./CleaningInputText.scss"


function CleaningInputText({ props:{val = "", legend, plhol, onChange} }){
  return(
    <div className="CleaningInputText flex column">

      <span className="Legend flex start">{legend}</span>

      <input
        value={val}
        type={`text`}
        placeholder={plhol}
        onChange={ (e)=> onChange(e?.target?.value) }
        autoComplete="off"
        // onKeyUp={ (e)=> ((e.key === "Enter") && isImg) && imgAct() }
      />

    </div>
  )
}

export default CleaningInputText
