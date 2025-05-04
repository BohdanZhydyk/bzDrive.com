import React from "react"

import './InputText.scss'


function InputText({ props:{legend, type, plhol, autoComplete, val, err, isImg, imgAct, cbVal, cbErr} }) {

  const onChange = (e) => {
    const sendVal = (e?.target?.value ?? '')
    cbVal && cbVal(sendVal)
    cbErr && cbErr(sendVal)
  }

  return (
    <fieldset className="Input flex">

      <legend className={`${err ? `txtOrg` : `txtGry`} overflow`}>
        <span>{legend}</span>
        <span>{`${err ? ` - ${err}` : ``}`}</span>
      </legend>

      <input
        value={val}
        type={type}
        placeholder={plhol}
        onChange={onChange}
        autoComplete={autoComplete ?? "off"}
        onKeyUp={ (e)=> ((e.key === "Enter") && isImg) && imgAct() }
      />

      {
        isImg &&
        <img className="ImgBtnSmall"
          src={`https://bzdrive.com/files/ico/ico${isImg}.png`}
          alt={`${isImg}`}
          onClick={ ()=> imgAct() }
        />
      }

    </fieldset>
  )
}

// {
//   legend: tr(`translateName`,lang),
//   type: `text`,
//   plhol: tr(`PlaceHolder`,lang),
//   val: Data?.login ?? '',
//   err: Err?.login ?? '',
//   cbVal: (val)=> setData( (prev) => ({...prev, login:sanitizeTxt(val, `login`).sanText})),
//   cbErr: (val)=> setErr( (prev) => ({...prev, login:sanitizeTxt(val, `login`).sanErr}))
// }

export default InputText