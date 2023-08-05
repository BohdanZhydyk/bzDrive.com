import React, { useState, useEffect } from "react"

import "./TagSlider.scss"
import { actions } from './actions'
import { Slider } from './Slider'
import { SliderEdit } from "./SliderEdit"


function TagSlider({ props:{el, i, user, setWorkshop, editMode, setEditingText} }){
  
  const [edit, setEdit] = useState(false)
  const [slider, setSlider] = useState(el?.body)
  const [folder, setFolder] = useState(0)
  const [img, setImg] = useState(0)

  function CLICK(){ editMode && setEdit(prev=>true)}

  let txt = ""
  slider[folder].txt.map( (text)=> txt = (text.name === user?.lang) ? text.val : txt )

  const image = slider[folder].imgs[img]
  const count = {arr:slider[folder]?.imgs, n:img}

  const sliderFn = (action)=> actions(action, img, setImg, folder, setFolder, slider, setSlider)
 
  useEffect(() => {
    const int = setInterval( ()=>sliderFn({type:"SLIDE_RIGHT"}), 3000 )
    return () => clearInterval(int)
  }, [img])

  // console.log(slider)

  return(
    <div className={`${editMode ? `AdminBorder` : `Border`} flex`} onClick={CLICK}>

      <div className="TagSlider flex">
      {
        !edit
        ? <Slider props={{txt, image, count, sliderFn}} />
        : <SliderEdit props={{el, i, setWorkshop, setEditingText}} />
      }
      </div>

    </div>
  )
}

export default TagSlider