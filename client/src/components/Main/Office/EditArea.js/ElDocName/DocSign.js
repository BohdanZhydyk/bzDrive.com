import React from "react"

import { tr } from "../../../../../AppTranslate"
import { sanitizeTxt } from "../../../../../AppFunctions"
import { propses } from "./propses"
import Input from "../../../../All/Input"


export function DocSign({ props:{lang, nr, setNr, setSave, editErr, setEditErr} }) {

  const DocSignProps = propses(tr, lang, nr, setNr, editErr, setEditErr, setSave, sanitizeTxt)

  return(
    <div className="DocSign flex end">
    {
      DocSignProps.map( (input, i)=> <Input props={input} key={`DocSignInput${i}`}/> )
    }
    </div>
  )
}