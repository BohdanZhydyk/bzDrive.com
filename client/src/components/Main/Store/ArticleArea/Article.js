import React from "react"

import "./ArticleArea.scss"
import { NavLink } from "react-router-dom"
import BuyPannel from "../BuyPannel"


export function Article({ props:{art, a, tr, lang} }){

  const {id, name, imgs, price, quantity} = art

  const isNewArticle = id === "new"
  const isImgs = imgs?.length > 0
  
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
        name &&
        <NavLink className="ArtName overflow bold flex" to={`/store/article/${id}`}>
          {name}
        </NavLink>
      }

      {
        isImgs &&
        <NavLink className="ArtImg flex" to={`/store/article/${id}`}>
          <img src={imgs[0]} alt="ArtImg" />
        </NavLink>
      }

      {
        !isNewArticle &&
        <BuyPannel props={{quantity, price}}/>
      }

    </div>
  )
}