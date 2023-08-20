import React from "react"

import "./QuaBtns.scss"


function QuaBtns({ props:{QUA, qua, setQua} }){

  const isQua = qua > 0
  const isQUA = QUA > 0
  const isMaxQua = qua < QUA

  const minusStiles = {opacity: isQua ? 1 : 0.1}
  const plusStiles = {opacity: isMaxQua ? 1 : 0.1}
  
  const btnMinus = "https://bzdrive.com/files/ico/icoMinus.png"
  const btnPlus = "https://bzdrive.com/files/ico/icoPlus.png"

  function DECREASE_QUA(){ isQua && setQua(prev=>prev - 1) }
  function INCREASE_QUA(){ isMaxQua && setQua(prev=>prev + 1) }

  return(
    <div className="QuaBtns flex end stretch">
    {
      isQUA
      ?
      <>
        <span className="QuaBtnMinus flex wrap" style={minusStiles} onClick={DECREASE_QUA}>
          <img className="ImgBtn" src={btnMinus} alt="minus" />
        </span>
        <span className="Quantity Radius flex">
          { isQua && <span className="txtGrn">{`${qua}/`}</span> }
          <span>{QUA}</span>
        </span>
        <span className="QuaBtnPlus flex" style={plusStiles} onClick={INCREASE_QUA}>
          <img className="ImgBtn" src={btnPlus} alt="plus" />
        </span>
      </>
      :
      <div className="Availability txtRed flex end">
        {`Brak dostępności`}
      </div>
    }
      
    </div>
  )
}

export  default QuaBtns