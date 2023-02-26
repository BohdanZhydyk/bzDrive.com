import React from "react"

import "./TagUl.scss"


function TagUl({ props:{el, lang} }){
  return(
    <div className="TagUl flex column">

      <span className="Ul">{el.body[lang].ul}</span>

      <ul className="flex column">
      {
        el?.body[lang]?.li && el.body[lang].li.map( (li, l)=>{
          return <li key={`LiEl${l}`}>{li}</li>
        })
      }
      </ul>

    </div>
  )
}

export default TagUl