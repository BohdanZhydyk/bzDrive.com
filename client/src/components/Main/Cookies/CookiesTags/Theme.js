import React from "react"


export function Theme({ props:{txt, lang} }){
  return(
    <div className="Theme flex start bold">{txt[lang]}</div>
  )
}