import React from "react"

import './TextArea.scss'


function TextArea({ props:{plhol, val, cbVal, cbErr} }) {

  // {
  //   plhol: tr(`PlaceHolder`,lang),
  //   val: formData?.login ?? '',
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
    <textarea className="TextArea" placeholder={plhol} value={val} onChange={onChange} ></textarea>
    // onKeyUp={ (e)=> e.key === "Enter" && ON_KEYUP_IMG(e) }
  )
}

export default TextArea