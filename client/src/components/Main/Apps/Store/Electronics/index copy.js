import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"

import "./Store.scss"
import { tr } from "../../../AppTranslate"
import { GetUser } from "../../../AppFunctions"
import SiteIcon from "../../All/SiteIcon"
import Articles from "./Articles"
import Cart from "./Cart"
import { StoreReducer } from "./StoreReducer"


function Store({ props:{} }){

  const user = GetUser()
  const lang = user?.lang

  const [store, setStore] = useState(false)
  const [cart, setCart] = useState(false)

  const [showCart, setShowCart] = useState(false)

  const cartCount = cart?.length
  const isArtInCart = cartCount > 0
  const cartImg = `https://bzdrive.com/files/ico/icoCart${isArtInCart ? `Full` : ``}.png`

  function StoreFn(action){ StoreReducer(store, setStore, cart, setCart, user, action) }

  function GO_TO_CART(){ setShowCart(prev=>!showCart) }
  
  useEffect( ()=>{
    const query = {getArticles:true}
    !store && StoreFn({type:"GET_STORE", query})
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

            <div className="CartWrapper flex" onClick={GO_TO_CART}>
              <img className="CartBtn flex" src={cartImg} alt="cart" />
              { isArtInCart && <div className="CartCount flex">{cartCount}</div> }
            </div>

          </div>
          
          <Routes>

            <Route path="/"
              exact element={
                !showCart
                ? <Articles props={{store, tr, user, StoreFn}}/>
                : <Cart props={{cart, tr, user, StoreFn}} />
              }
            />

            <Route path="/cart"       element={<Cart props={{tr, lang, cart}} />} />

          </Routes>

        </>
      }
      
    </div>
  )
}

export default Store