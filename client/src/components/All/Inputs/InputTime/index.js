import React from "react"

import "./InputTime.scss"


function InputTime({ props: { val = "00:00", legend, plhol, onChange } }) {
  return (
    <div className="InputTime flex column">

      <span className="Legend flex start">{legend}</span>

      <input
        value={val || ""}
        type="time"
        placeholder={plhol}
        onChange={(e) => onChange(e?.target?.value)}
        autoComplete="off"
      />

    </div>
  )
}

export default InputTime
