import React from "react"


export function Title({ props:{txt, lang} }){
  return(
    <div className="Title flex start bold">{txt[lang]}</div>
  )
}