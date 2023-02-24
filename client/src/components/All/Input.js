import React from "react"


export function Input({ props:{legend, type, plhol, val} }) {
  return (
    <fieldset className="Input">

      <legend>{legend}</legend>

      <input type={type} placeholder={plhol} value={val}
        // onChange={ (e)=> ON_CHANGE(e) }
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