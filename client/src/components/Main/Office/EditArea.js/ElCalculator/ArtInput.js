import React from "react"


export function ArtInput({ props:{val, align, onChange} }){

  const handleInputChange = (event) => {
    onChange(event.target.value);
  }
  
  return(
    <input style={{textAlign:align}} type="text" value={val} onChange={handleInputChange} />
  )
}