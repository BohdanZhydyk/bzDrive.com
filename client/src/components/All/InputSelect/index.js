import React, { useState } from "react"

import './InputSelect.scss'


function InputSelect({ props:{legend, type, plhol, groups, val, err, cbVal, cbErr} }) {

  const onChange = (e) => {
    const V = e?.target?.value
    const sendVal = (V ?? '')
    cbVal(sendVal)
    cbErr(sendVal)
  }

  const [selGroup, setSelGroup] = useState('')

  const GROUP_CHG = (e) => {
    setSelGroup(e.target.value)
    onChange(e)
  }

  return (
    <fieldset className="Input flex">

      <legend className={err ? `txtOrg` : `txtGry`}>
        <span>{legend}</span>
        <span>{`${err ? ` - ${err}` : ``}`}</span>
      </legend>

      <input
        list="groupList"
        value={val}
        type={type}
        placeholder={plhol}
        onChange={onChange}
        autoComplete="off"
        // onKeyUp={ (e)=> e.key === "Enter" && ON_KEYUP_IMG(e) }
      />

      <select value={selGroup} onChange={GROUP_CHG}>
      <option key={`GroupEmpty`} value={''}>{''}</option>
      {
        groups.map( (group, g)=>{
          const key = `Group${group}${g}`
          return(
            <option key={key} value={group}>{group !== selGroup ? group : ''}</option>
          )
        })
      }
      </select>

    </fieldset>
  )
}

// {
//   legend: tr(`translateName`,lang),
//   type: `text`,
//   plhol: tr(`PlaceHolder`,lang),
//   groups: [group1, group2, ...],
//   val: Data?.login ?? '',
//   err: Err?.login ?? '',
//   cbVal: (val)=> setData( (prev) => ({...prev, login:sanitizeTxt(val, `login`).sanText})),
//   cbErr: (val)=> setErr( (prev) => ({...prev, login:sanitizeTxt(val, `login`).sanErr}))
// }

export default InputSelect