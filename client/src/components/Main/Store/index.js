import React, { useEffect, useState } from "react"
import { NavLink, Route, Routes } from "react-router-dom"

import "./Store.scss"
import { tr } from "../../../AppTranslate"
import { GetUser, PostToApi } from "../../../AppFunctions"
import SiteIcon from "../../All/SiteIcon"
import ArticleSection from "./ArticleSection"
import ArticleInfo from "./ArticleInfo"
import Cart from "./Cart"


function Store({ props:{} }){

  const {lang, role} = GetUser()
  const isAdmin = role === "admin"

  const [store, setStore] = useState(false)
  const [cart, setCart] = useState(false)

  const cartCount = cart?.length
  const isArtInCart = cartCount > 0
  const cartImg = `https://bzdrive.com/files/ico/icoCart${isArtInCart ? `Full` : ``}.png`

  const newArt = {"ID": "new"}

  function ADD_TO_CART(ID, qua){
    const query = {addToCart:true, ID, qua}
    PostToApi( '/getStore', query, (data)=>{
      setStore( prev=> isAdmin ? [newArt, ...data?.articles] : data?.articles )
      setCart( prev=> data?.cart )
    })
  }
  
  useEffect( ()=>{
    const query = {getArticles:true}
    !store &&
    PostToApi( '/getStore', query, (data)=>{
      setStore( prev=> isAdmin ? [newArt, ...data?.articles] : data?.articles )
      setCart( prev=> data?.cart )
    })
  }, [])

  // console.log("store",store)

  return(
    <div className="Store flex column">

      {
        !store
        ?
        <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
        :
        <>

          <div className="ToolsPannel flex end wrap">

            <section className="CommingSoon Radius flex column">
              <div>{tr("StoreWarning_1", lang)}</div>
              <div>{tr("StoreWarning_2", lang)}</div>
              <div>{tr("StoreWarning_3", lang)}</div>
            </section>

            <NavLink className="CartWrapper flex" to={"/store/cart"}>
              <img className="CartBtn flex" src={cartImg} alt="cart" />
              { isArtInCart && <div className="CartCount flex">{cartCount}</div> }
            </NavLink>

          </div>
          
          <Routes>
            <Route path="/"     exact element={<ArticleSection props={{store, tr, lang, ADD_TO_CART}}/>} />
            <Route path="/article/*"  element={<ArticleInfo props={{tr, lang, ADD_TO_CART}}/>} />
            <Route path="/cart"       element={<Cart props={{tr, lang, cart}} />} />
          </Routes>

        </>
      }
      
    </div>
  )
}

export default Store