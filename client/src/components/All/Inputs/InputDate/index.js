import React from "react"

import "./InputDate.scss"


function InputDate({ props: { val = 0, legend, plhol, onChange } }) {

  const formatDate = (intDate) => `${intDate.slice(0, 4)}-${intDate.slice(4, 6)}-${intDate.slice(6, 8)}`
  const parseDate = (strDate) => parseInt(strDate.replace(/-/g, ""))

  return (
    <div className="InputDate flex column">

      <span className="Legend flex start">{legend}</span>

      <input
        value={val ? formatDate(val.toString()) : ""}
        type="date"
        placeholder={plhol}
        onChange={(e) => onChange(parseDate(e?.target?.value))}
        autoComplete="off"
      />

    </div>
  )
}

export default InputDate
