import React, { useState } from "react"
import { Route, Routes } from "react-router-dom"

import "./Store.scss"
import { tr } from "../../../AppTranslate"
import { GetUser } from "../../../AppFunctions"
import Software from "./Software"
import Electronics from "./Electronics"


function Store({ props:{} }){

  const user = GetUser()
  const lang = user?.lang
  
  const [cart, setCart] = useState(false)

  const cartCount = cart?.length
  const isArtInCart = cartCount > 0
  const cartImg = `https://bzdrive.com/files/ico/icoCart${isArtInCart ? `Full` : ``}.png`

  // console.log("store",store)

  return(
    <div className="Store flex column">

      <div className="ToolsPannel flex end wrap">

        <section className="CommingSoon Radius flex column">
          <div>{tr("StoreWarning_1", lang)}</div>
          <div>{tr("StoreWarning_2", lang)}</div>
          <div>{tr("StoreWarning_3", lang)}</div>
        </section>

        <div className="CartWrapper flex">
          <img className="CartBtn flex" src={cartImg} alt="cart" />
          { isArtInCart && <div className="CartCount flex">{cartCount}</div> }
        </div>

      </div>
      
      <Routes>

        <Route path="/software"     element={<Software props={{tr, lang}} />} />
        <Route path="/electronics"  element={<Electronics props={{tr, lang}} />} />
        {/* <Route path="/cart"         element={<Cart props={{tr, lang, cart}} />} /> */}

      </Routes>
      
    </div>
  )
}

export default Store