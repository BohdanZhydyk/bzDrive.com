import React from "react"

import { tr } from "../../../../../AppTranslate"
import { sanitizeTxt } from "../../../../../AppFunctions"
import { placeProps, fromProps, toProps } from "./propses"
import Input from "../../../../All/Input"


export function DocSign({ props:{lang, mode, nr, setNr, setSave, editErr, setEditErr} }) {
  return(
    <div className="DocSign flex end">

      <Input props={ placeProps(tr, lang, nr, setNr, editErr, setEditErr, setSave, sanitizeTxt) } />

      <Input props={ fromProps(tr, lang, nr, setNr, setSave) } />
      
      { ["ZL"].includes(mode) && <Input props={ toProps(tr, lang, nr, setNr, setSave) } /> }

    </div>
  )
}