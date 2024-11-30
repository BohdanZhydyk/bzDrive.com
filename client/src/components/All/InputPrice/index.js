import React, { useRef, useState } from "react"


function InputPrice({ props:{val, placeholder, fn, align} }){

  const [inputValue, setInputValue] = useState( val ?? "0.00" )
  const [isFocused, setIsFocused] = useState( false )

  const inputRef = useRef(null)

  const nonNumericRegex = /[^0-9.,-]/g

  function sanitizeQuates(value) {
    if (!value || value === "") return "0.00"
    const sanitized = value.replace(/,/g, ".").replace(nonNumericRegex, "")
    const parsed = parseFloat(sanitized)
    return isNaN(parsed) ? "0.00" : parsed.toFixed(2)
  }

  const handleChange = (event) => {
    setInputValue(event.target.value.replace(nonNumericRegex, ""))
  }

  const handleBlur = () => {
    setIsFocused(false)
    fn( sanitizeQuates(inputValue) )
  }

  const handleFocus = () => {
    setIsFocused(true)
    setInputValue(val)
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleBlur()
      inputRef.current.blur()
    }
  }

  return(
    <input
      ref={inputRef}
      style={{textAlign:align ?? "end"}}
      type="text"
      placeholder={placeholder ?? "0.00"}
      value={isFocused ? inputValue : val}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
    />
  )
}

export default InputPrice
