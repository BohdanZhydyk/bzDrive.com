import React from 'react'

import { SliderImgBtns } from './SliderImgBtns'
import { SliderTxt } from './SliderTxt'


function Slider({ props:{actVal, actImgs, imageLink, btnL, btnR, PREV, NEXT} }){
  return(
    <div className="Slider flex stretch">

      <SliderTxt props={{actVal, actImgs}} />

      <img className="Image" src={imageLink} alt="SliderImg" />

      <SliderImgBtns props={{btnL, btnR, PREV, NEXT}} />

    </div>
  )
}

export default Slider