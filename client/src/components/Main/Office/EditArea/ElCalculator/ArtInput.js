import React from "react"


export function ArtInput({ props:{name, isDisplay, val, align, CLA, FN, pl} }){

  return(
    <span className={`Table${name} ${CLA} ${align ?? "center"} flex`}>
    {
      isDisplay
      ?
      <span>{val}</span>
      :
      <input
        style={{textAlign:align ?? "center"}}
        type="text"
        placeholder={pl}
        value={val}
        onChange={ (event)=> FN(name, event.target.value) }
      />
    }
    </span>
    
  )
}