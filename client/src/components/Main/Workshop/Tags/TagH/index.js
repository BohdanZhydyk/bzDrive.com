import React from "react"

import "./TagH.scss"


function TagH({ props:{el, lang} }){
  return(
    <h3 className="TagH flex">{el.body[lang]}</h3>
  )
}

export default TagH