import React, { useState } from "react"

import BuyPannel from "../BuyPannel"
import ArticleInfo from "../ArticleInfo"


export function Article({ props:{article, a, tr, user, StoreFn} }){

  const {show, ID, ART, IMG, PRI, QUA} = article

  const isNewArticle = ID === "new"
  const isImgs = IMG?.length > 0
  
  const addArtBtn = "https://bzdrive.com/files/ico/icoPlus.png"
  const icoNoImg = "https://bzdrive.com/files/ico/icoNoImg.png"
  
  function SHOW_ART(open){ StoreFn({type:"SHOW_ART", ID, open}) }

  return(
    <div className={`Article Radius flex ${isNewArticle ? `` : `column start`}`}>

      { show && <ArticleInfo props={{article, a, tr, user, StoreFn, SHOW_ART}}/> }

      {
        ART &&
        <div className="ArtName overflow bold flex" onClick={()=>SHOW_ART(true)}>
          {ART}
        </div>
      }

      <div className="ArtImg flex" onClick={()=>SHOW_ART(true)}>
        {
          isNewArticle
          ? <img className="ImgBtnAdd" src={addArtBtn} alt="plus" onClick={()=>SHOW_ART(true)} />
          : <img className="ArtImgAva flex" src={isImgs ? IMG[0] : icoNoImg} alt="ArtImg" />
        }
      </div>

      {
        !isNewArticle &&
        <BuyPannel props={{ID, QUA, PRI, tr, user, StoreFn}}/>
      }

    </div>
  )
}