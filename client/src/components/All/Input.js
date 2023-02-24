import React, { useState } from "react"


export function Input({ props:{legend, type, plhol, val, sanit, cb} }) {

  const [value, setValue] = useState('')
  const [err, setErr] = useState(false)

  value === '' && val && setValue(val)

  const ON_CHANGE = (e) => {
    let sanitizedValue = sanit(e.target.value)
    setValue( sanitizedValue.sanText )
    cb( sanitizedValue.sanText )
    setErr(sanitizedValue.sanErr)
  }

  return (
    <fieldset className="Input">

      <legend>
        <span>{legend}</span>
        <span className="txtOrg">{`${err ? ` - ${err}` : ``}`}</span>
      </legend>

      <input type={type} placeholder={plhol} value={value} onChange={ (e)=> ON_CHANGE(e) }
        // onKeyUp={ (e)=> e.key === "Enter" && ON_KEYUP_IMG(e) }
      />

      <img className="ImgBtnSmall"
        src={`https://bzdrive.com/files/ico/icoSearch.png`}
        // onClick={ ()=> ON_KEYUP_IMG({ target:{value:val}, key:"Enter" }) }
        alt={`search`}
      />

    </fieldset>
  )
}