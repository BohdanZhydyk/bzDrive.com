import React, { useState} from "react"

import './InputDate.scss'
import { TimeTo_YYYYMMDD } from "../../../AppFunctions"


function InputDate({ props:{legend, type, plhol, val, err, isImg, imgAct, cbVal, cbErr} }) {

  const emptyValue = val === "" || isNaN(val)

  const [color, setColor] = useState( emptyValue ? "Trs" : "Wht" )

  const dateForInput = (date)=> `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`
  const defaultValue = TimeTo_YYYYMMDD( Date.now() ).toString()
  const inputValue = dateForInput( emptyValue ? defaultValue : val.toString() )

  const onClick = (e)=> setColor( emptyValue ? "Trs" : "Wht" )

  const onChange = (e)=>{
    const value = e?.target?.value
    const sendVal = parseInt( value ? value.split("-").join("") : "" )
    setColor("Wht")
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
        className={`ColorInput-${color}`}
        value={inputValue}
        type={type}
        placeholder={plhol}
        onChange={onChange}
        onClick={onClick}
        autoComplete="off"
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

export default InputDate