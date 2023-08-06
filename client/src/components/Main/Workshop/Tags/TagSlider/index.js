import React, { useState, useEffect } from "react"

import "./TagSlider.scss"
import { SliderReducer, getBody } from './SliderReducer'
import Slider from './Slider'
import SliderEdit from "./SliderEdit"


function TagSlider({ props:{el, i, user, setWorkshop, editMode, setEditingText} }){
  
  const [edit, setEdit] = useState(false)
  const [slider, setSlider] = useState( getBody(el?.body, 0, 0) )

  function CLICK(){
    if(editMode && !edit){
      setSlider( getBody(el?.body, false, false) )
      setEdit(prev=>true)
    }
  }

  const actFolder = slider?.body?.find( folder=> folder?.act )
  const actVal = actFolder?.txt?.find( text=> text?.name === user?.lang )?.val
  const actImgs = actFolder?.imgs
  const actImg = actImgs?.find( img=> img?.act )?.img

  const link = `https://bzdrive.com/`
  const fileAddr = "files/slider/"
  const imageLink = `${link}${fileAddr}${actImg}`
  const btnL = `${link}files/ico/sliderBtnL.png`
  const btnR = `${link}files/ico/sliderBtnR.png`

  function PREV(){ SliderReducer({type:"SLIDE_PREV", setSlider, actImgs}) }
  function NEXT(){ SliderReducer({type:"SLIDE_NEXT", setSlider, actImgs}) }

  const sliderProps = {
    actVal, actImgs, imageLink, btnL, btnR, PREV, NEXT
  }
  const sliderEditProps = {
    user, slider, setSlider, nr:i, link, fileAddr, setWorkshop, setEditingText, btnL, btnR, SliderReducer
  }
 
  useEffect( ()=>{
    const int = setInterval( ()=>NEXT(), 3000 )
    if(edit){ clearInterval(int) }
    return () => clearInterval(int)
  }, [slider])

  useEffect( ()=>{ edit && setSlider( getBody(el?.body, false, false) ) }, [el] )

  // console.log(slider)

  return(
    <div className={`${editMode ? `AdminBorder` : `Border`} flex`} onClick={CLICK}>

      <div className="TagSlider flex">
      {
        !edit
        ? <Slider props={sliderProps} />
        : <SliderEdit props={sliderEditProps} />
      }
      </div>

    </div>
  )
}

export default TagSlider