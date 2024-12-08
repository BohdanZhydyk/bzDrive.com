import React from "react"

import "./CleaningInputTime.scss"


function CleaningInputTime({ props: { val = "00:00", legend, plhol, onChange } }) {
  return (
    <div className="CleaningInputTime flex column">

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

export default CleaningInputTime
