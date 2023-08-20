import React from "react"

import { NavLink } from "react-router-dom"
import BuyPannel from "../BuyPannel"


export function Article({ props:{article, a, tr, lang, ADD_TO_CART} }){

  const {ID, ART, IMG, PRI, QUA} = article

  const isNewArticle = ID === "new"
  const isImgs = IMG?.length > 0
  
  const addArtBtn = "https://bzdrive.com/files/ico/icoPlus.png"

  return(
    <div className={`Article Radius flex ${isNewArticle ? `` : `column start`}`}>

      {
        isNewArticle &&
        <NavLink className="flex" to={"/store/article/new"}>
          <img className="ImgBtnAdd" src={addArtBtn} alt="plus" />
        </NavLink>
      }

      {
        ART &&
        <NavLink className="ArtName overflow bold flex" to={`/store/article/${ID}`}>
          {ART}
        </NavLink>
      }

      {
        isImgs &&
        <NavLink className="ArtImg flex" to={`/store/article/${ID}`}>
          <img src={IMG[0]} alt="ArtImg" />
        </NavLink>
      }

      {
        !isNewArticle &&
        <BuyPannel props={{ID, QUA, PRI, tr, lang, ADD_TO_CART}}/>
      }

    </div>
  )
}