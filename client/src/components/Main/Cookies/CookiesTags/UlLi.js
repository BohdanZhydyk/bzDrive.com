import React from "react"


export function UlLi({ props:{txt, li, lang} }){
  return(
    <ul className="LiWrapper flex column">

      <span className="UL flex start">{txt[lang]}</span>

      {
        li && li.map( (line, l)=>{
          const keyLi = `LiEl${l}`
          return <li className="Li flex start" key={keyLi}>{`- ${line[lang]}`}</li>
        })
      }

    </ul>
  )
}