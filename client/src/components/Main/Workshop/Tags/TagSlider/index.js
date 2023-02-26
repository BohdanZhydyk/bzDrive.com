import React, { useState, useEffect } from "react"

import "./TagSlider.scss"
import { actions } from './actions'
import { Slider } from './Slider'


function TagSlider({ props:{el, lang} }){
  // let admin = user?.role === "admin"

  const [slider, setSlider] = useState(el?.body)
  const [folder, setFolder] = useState(0)
  const [img, setImg] = useState(0)

  let txt = ""
  slider[folder].txt.map( (text)=> txt = (text.name === lang) ? text.val : txt )

  let image = slider[folder].imgs[img]

  let sliderFn = (action)=> actions(action, img, setImg, folder, setFolder, slider, setSlider)
 
  useEffect(() => {
    const int = setInterval( ()=>sliderFn({type:"SLIDE_RIGHT"}), 3000 )
    return () => clearInterval(int)
  }, [img])

  console.log(slider)

  return(
    <div className="TagSlider">
    
      <Slider props={{txt, image, sliderFn}} />

    </div>
  )
}

export default TagSlider