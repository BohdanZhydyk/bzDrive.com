import React from "react"


export function Paragraph({ props:{txt, lang} }){
  return(
    <div className="Paragraph flex start">{txt[lang]}</div>
  )
}