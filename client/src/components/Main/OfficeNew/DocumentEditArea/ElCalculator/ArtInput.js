import React, { useRef, useState } from "react"

import { SanQuantity, SanQuates } from "./ElCalculatorLogic";


export function ArtInput({ props:{name, isDisplay, val, align, CLA, FN, pl} }){

  const [inputValue, setInputValue] = useState(val)
  const [isFocused, setIsFocused] = useState(false)

  const inputRef = useRef(null)

  const handleChange = (event) => {
    const regex = /[^0-9.,-]/g
    setInputValue( prev=> event.target.value.replace(regex, "") )
  }
  
  const handleBlur = () => {
    setIsFocused(false)
    FN( name, name === "QUA" || name === "VAT" ? SanQuantity(inputValue) : SanQuates(inputValue) )
  }
  
  const handleFocus = () => {
    setIsFocused(true)
    setInputValue( prev=> val )
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleBlur();
      inputRef.current.blur()
    }
  }

  return(
    <span className={`Table${name} ${CLA} ${align ?? "center"} flex`}>
    {
      isDisplay
      ?
      <span>{val}</span>
      :
      <input
        ref={inputRef}
        style={{textAlign:align ?? "center"}}
        type="text"
        placeholder={pl}
        value={isFocused ? inputValue : val}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
    }
    </span>
    
  )
}