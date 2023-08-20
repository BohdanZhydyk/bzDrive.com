import React, { useState } from "react"

import "./BuyPannel.scss"
import QuaBtns from "../QuaBtns"


function BuyPannel({ props:{ID, QUA, PRI, tr, lang, ADD_TO_CART} }){

  const [qua, setQua] = useState(0)

  const isQua = qua > 0
  const artPRI = PRI ?? "0.00"

  function ADD(){
    setQua(prev=> 0)
    ADD_TO_CART(ID, qua)
  }

  const icoAddToCart = "https://bzdrive.com/files/ico/icoAddToCart.png"

  const title = `Add to Cart...`

  return(
    <div className="BuyPannel flex end">

      <div className="BuyLeft flrx column">

        {
          isQua &&
          <img
            className="CartBtn flex"
            src={icoAddToCart}
            title={title}
            onClick={ADD}
            alt="add"
          />
        }

      </div>

      <div className="BuyRight flrx column">

        <QuaBtns props={{QUA, qua, setQua}}/>

        <div className="Price txtYlw bold flex end">
          {`${artPRI} zł`}
        </div>

      </div>

    </div>
  )
}

export default BuyPannel