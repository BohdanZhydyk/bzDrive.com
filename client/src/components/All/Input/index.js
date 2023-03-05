import React from "react"

import './Input.scss'


function Input({ props:{legend, type, plhol, val, err, cbVal, cbErr} }) {

  // {
  //   legend: tr(`translateName`,lang),
  //   type: `text`,
  //   plhol: tr(`PlaceHolder`,lang),
  //   val: formData?.login ?? '',
  //   err: formErr?.login ?? '',
  //   cbVal: (val)=> setFormData( (prev) => ({
  //     ...prev, login:sanitizeTxt(val, `login`).sanText
  //   })),
  //   cbErr: (val)=> setFormErr( (prev) => ({
  //     ...prev, login:sanitizeTxt(val, `login`).sanErr
  //   }))
  // }

  const onChange = (e) => {
    cbVal(e?.target?.value ?? '')
    cbErr(e?.target?.value ?? '')
  }

  return (
    <fieldset className="Input">

      <legend>
        <span>{legend}</span>
        <span className="txtOrg">{`${err ? ` - ${err}` : ``}`}</span>
      </legend>

      <input
        value={val}
        type={type}
        placeholder={plhol}
        onChange={onChange}
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

export default Input