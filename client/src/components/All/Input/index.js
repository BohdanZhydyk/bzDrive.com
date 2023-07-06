import React from "react"

import './Input.scss'


function Input({ props:{legend, type, plhol, val, err, isImg, imgAct, cbVal, cbErr} }) {

  const dateForInput = (date)=> `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`
  const dateForDiv = (date)=> `${date.slice(6,8)}.${date.slice(4,6)}.${date.slice(0,4)}`

  const Val = type === "date" ? dateForInput(val.toString()) : val

  const onChange = (e) => {
    const V = e?.target?.value
    const sendVal = type === "date" ? parseInt( V ? V.split("-").join("") : "" ) : (V ?? '')
    cbVal(sendVal)
    cbErr(sendVal)
  }

  return (
    <fieldset className="Input flex">

      <legend className={err ? `txtOrg` : `txtGry`}>
        <span>{legend}</span>
        <span>{`${err ? ` - ${err}` : ``}`}</span>
      </legend>

      <input
        value={Val}
        type={type}
        placeholder={plhol}
        onChange={onChange}
        autoComplete="off"
        onKeyUp={ (e)=> (e.key === "Enter") && imgAct() }
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

export default Input