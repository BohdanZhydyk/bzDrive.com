import React, { useState } from "react"

import ActionBtn from "../../../../../All/ActionBtn"
import { getBody } from "../SliderReducer"


export function ActionBtns({ props:{
  el, nr, slider, setSlider, folder, folderNr, image, imageNr,
  fileAddr, setWorkshop, setEditingTag, dirBtns, SliderReducer
} }){

  const [isDelete, setIsDelete] = useState(false)

  const isFirstEl = imageNr !== 0
  const isLastEl = imageNr !== folder?.imgs.length - 1
  const isActImg = folder?.imgs[imageNr]?.act

  const ACT_IMG = ()=> setSlider( getBody(slider?.body, folderNr, imageNr) )

  function MOVE_IMG(dir){
    setIsDelete(prev=>false)
    SliderReducer({type:"MOVE_IMG", el, nr, dir, folderNr, image, imageNr, fileAddr, setWorkshop, setEditingTag})
  }

  return(
    <div className="ActionBtns" onClick={()=>ACT_IMG()}>

      {
        (isActImg && isFirstEl) &&
        <div className="ActImgBtnL flex" onClick={()=>MOVE_IMG("LEFT")}>
          <img className="ImgBtn" src={dirBtns?.btnL} alt="ActBtn" />
        </div>
      }
      {
        (isActImg && isLastEl) &&
        <div className="ActImgBtnR flex" onClick={()=>MOVE_IMG("RIGHT")}>
          <img className="ImgBtn" src={dirBtns?.btnR} alt="ActBtn" />
        </div>
      }

      {
        isActImg &&
        <div className="ActImgBtnDel flex">
          { !isDelete && <ActionBtn props={{name:'delete', click:()=>setIsDelete(prev=>true)}} /> }
          { isDelete && <ActionBtn props={{name:'check', click:()=>MOVE_IMG("DEL")}} /> }
          { isDelete && <ActionBtn props={{name:'cancel', click:()=>setIsDelete(prev=>false)}} /> }
        </div>
      }

    </div>
  )
}