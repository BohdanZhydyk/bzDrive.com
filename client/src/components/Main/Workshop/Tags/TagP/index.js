import React from "react"

import "./TagP.scss"


function TagP({ props:{el, lang} }){
  return(
    <div className="TagP flex stretch">

      {
        el?.body?.startImg &&
        <img src={el.body.startImg} alt="tagImg" />
      }

      <p>{el.body.txt[lang]}</p>

      {
        el?.body?.endImg &&
        <img src={el.body.endImg} alt="tagImg" />
      }

    </div>
  )
}

export default TagP