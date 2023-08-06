import React from "react"

import ActionBtn from "../../../../../All/ActionBtn"
import { getBody } from "../SliderReducer"


export function ActionBtns({ props:{
  slider, setSlider, nr, folder, folderNr, image, imageNr,
  fileAddr, setWorkshop, setEditingText, btnL, btnR, SliderReducer
} }){

  const isFirstEl = imageNr !== 0
  const isLastEl = imageNr !== folder?.imgs.length - 1
  const isActImg = folder?.imgs[imageNr]?.act

  const ACT_IMG = ()=> setSlider( getBody(slider?.body, folderNr, imageNr) )

  function MOVE_IMG(dir){
    SliderReducer({type:"MOVE_IMG", dir, nr, folderNr, image, imageNr, fileAddr, setWorkshop, setEditingText})
  }

  return(
    <div className="ActionBtns" onClick={()=>ACT_IMG()}>

      {
        (isActImg && isFirstEl) &&
        <div className="ActImgBtnL flex" onClick={()=>MOVE_IMG("LEFT")}>
          <img className="ImgBtn" src={btnL} alt="ActBtn" />
        </div>
      }
      {
        (isActImg && isLastEl) &&
        <div className="ActImgBtnR flex" onClick={()=>MOVE_IMG("RIGHT")}>
          <img className="ImgBtn" src={btnR} alt="ActBtn" />
        </div>
      }

      {
        isActImg &&
        <div className="ActImgBtnDel flex">
          <ActionBtn props={{name:'delete', click:()=>MOVE_IMG("DEL")}} />
        </div>
      }

    </div>
  )
}