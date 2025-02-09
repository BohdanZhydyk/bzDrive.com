import React from "react"

import "./InputTextArea.scss"


function InputTextArea({ props:{val = "", legend, plhol, onChange} }){
  return(
    <div className="InputTextArea flex column">

      <span className="Legend flex start">{legend}</span>

      <textarea
        placeholder={plhol}
        value={val}
        onChange={ (e)=> onChange(e?.target?.value) }
        // onKeyUp={ (e)=> e.key === "Enter" && ON_KEYUP_IMG(e) }
      ></textarea>

    </div>
  )
}

export default InputTextArea
