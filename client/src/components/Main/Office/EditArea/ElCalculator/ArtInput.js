import React from "react"


export function ArtInput({ props:{val, align, onChange} }){
  return(
    <input
      style={{textAlign:align}}
      type="text"
      value={val}
      onChange={ (event)=> onChange(event.target.value) }
    />
  )
}