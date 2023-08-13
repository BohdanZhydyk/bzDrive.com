import React, { useState, useEffect } from "react"

import "./TagSlider.scss"
import { SliderReducer, getBody } from './SliderReducer'
import Slider from './Slider'
import SliderEdit from "./SliderEdit"


function TagSlider({ props:{el, nr, user, setWorkshop, editMode, editingTag, setEditingTag} }){
  
  const [edit, setEdit] = useState(false)
  const [slider, setSlider] = useState( getBody(el?.body, 0, 0) )

  function CLICK(){
    if(editMode && !editingTag && !edit){
      setSlider( getBody(el?.body, false, false) )
      setEdit(prev=>true)
      setEditingTag( prev=>el )
    }
  }

  const actFolder = slider?.body?.find( folder=> folder?.act )
  const actVal = actFolder?.txt?.find( text=> text?.name === user?.lang )?.val
  const actImgs = actFolder?.imgs
  const actImg = actImgs?.find( img=> img?.act )?.img

  const link = `https://bzdrive.com/`
  const fileAddr = "files/slider/"
  const imageLink = `${link}${fileAddr}${actImg}`
  const dirBtns = {
    btnL: `${link}files/ico/sliderBtnL.png`,
    btnR: `${link}files/ico/sliderBtnR.png`
  }

  function PREV(){ SliderReducer({type:"SLIDE_PREV", setSlider, actImgs}) }
  function NEXT(){ SliderReducer({type:"SLIDE_NEXT", setSlider, actImgs}) }

  const sliderProps = {
    actVal, actImgs, imageLink, dirBtns, PREV, NEXT
  }
  const sliderEditProps = {
    el, nr, user, slider, setSlider, link, fileAddr, setWorkshop, setEditingTag, dirBtns, SliderReducer
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