import React, { useState } from "react"

import "./BuyPannel.scss"


function BuyPannel({ props:{quantity, price} }){

  const [qua, setQua] = useState(0)

  const isQua = qua > 0
  const isQuantity = quantity > 0
  const isMaxQua = qua < quantity
  const artPrice = price ?? "0.00"

  function DECREASE_QUA(){ isQua && setQua(prev=>prev - 1) }
  function INCREASE_QUA(){ isMaxQua && setQua(prev=>prev + 1) }
  
  const btnMinus = "https://bzdrive.com/files/ico/icoMinus.png"
  const btnPlus = "https://bzdrive.com/files/ico/icoPlus.png"
  const icoAddToCart = "https://bzdrive.com/files/ico/icoAddToCart.png"

  return(
    <div className="BuyPannel flex end">

      <div className="BuyLeft flrx column">

        { isQua && <img className="CartBtn flex" src={icoAddToCart} title={`Dodaj do koszyka...`} alt="add" /> }

      </div>

      <div className="BuyRight flrx column">

        {
          isQuantity
          ?
          <div className="QuaBtns flex end stretch">
            <span className="QuaBtnMinus flex wrap">
              { isQua && <img className="ImgBtn" onClick={DECREASE_QUA} src={btnMinus} alt="minus" /> }
            </span>
            <span className="Quantity Radius flex">
              { isQua && <span className="txtGrn">{`${qua}/`}</span> }
              <span>{quantity}</span>
            </span>
            <span className="QuaBtnPlus flex">
              { isMaxQua && <img className="ImgBtn" onClick={INCREASE_QUA} src={btnPlus} alt="plus" /> }
            </span>
          </div>
          :
          <div className="Availability txtRed flex end">
            {`Brak dostępności`}
          </div>
        }

        <div className="Price txtYlw bold flex end">
          {`${artPrice} zł`}
        </div>

      </div>

    </div>
  )
}

export default BuyPannel