import React from "react"

import "./TagP.scss"


function TagP({ props:{editMode, el, i, lang, setWorkshop} }){
  return(
    <div className="TagP flex stretch">

      {
        el?.body?.startImg &&
        <div className="ImgArea flex column start">
          <img src={el.body.startImg} alt="tagImg" />
        </div>
      }

      <div className="ParagraphArea flex column start">
        { el?.body?.txt.map( (par, p)=> <p key={`ParagraphLine${i}${p}`}>{par[lang]}</p> ) }
      </div>

      {
        el?.body?.endImg &&
        <div className="ImgArea flex column start">
          <img src={el.body.endImg} alt="tagImg" />
        </div>
      }

    </div>
  )
}

export default TagP