import React from "react"


export function Actualization({ props:{txt, lang} }){
  return(
    <div className="Actualization txtGrn flex start bold">{txt[lang]}</div>
  )
}