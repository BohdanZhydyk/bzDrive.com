import React from "react"

import "./InputText.scss"


function InputText({ props:{val = "", legend, plhol, onChange} }){
  return(
    <div className="InputText flex column">

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

export default InputText
