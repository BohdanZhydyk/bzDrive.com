import React, { useState } from "react"


export function Input({ props:{legend, type, plhol, val, sanit, cb, setServErr} }) {

  const [value, setValue] = useState('')
  const [err, setErr] = useState(false)

  value === '' && val && setValue(val)

  const ON_CHANGE = (e) => {
    let sanitizedValue = sanit(e.target.value)
    setValue( sanitizedValue.sanText )
    cb( sanitizedValue.sanText )
    setErr(sanitizedValue.sanErr)
    setServErr(false)
  }

  return (
    <fieldset className="Input">

      <legend>
        <span>{legend}</span>
        <span className="txtOrg">{`${err ? ` - ${err}` : ``}`}</span>
      </legend>

      <input
        value={value}
        type={type}
        placeholder={plhol}
        onChange={ (e)=> ON_CHANGE(e) }
        autoComplete="off"
        // onKeyUp={ (e)=> e.key === "Enter" && ON_KEYUP_IMG(e) }
      />

      <img className="ImgBtnSmall"
        src={`https://bzdrive.com/files/ico/icoSearch.png`}
        alt={`search`}
        // onClick={ ()=> ON_KEYUP_IMG({ target:{value:val}, key:"Enter" }) }
      />

    </fieldset>
  )
}