import React from "react"

import { InputsWrapper } from "./InputsWrapper"
import { ImagesWrapper } from "./ImagesWrapper"


function SliderEdit({ props:{
  el, nr, user, slider, setSlider, link, fileAddr,
  setWorkshop, setEditingTag, dirBtns, SliderReducer
} }){
  return(
    <div className="SliderEdit flex column">
    {
      slider?.body.map( (folder, folderNr)=>{

        const inputsWrapperProps = {
          el, nr, folder, folderNr, setWorkshop, setEditingTag
        }
        
        const imagesWrapperProps = {
          el, nr, user, slider, setSlider, folder, folderNr, link, fileAddr,
          setWorkshop, setEditingTag, dirBtns, SliderReducer
        }

        return(
          <div className="ThemeWrapper flex wrap" key={`ThemeWrapper${nr}${folderNr}`}>

            <InputsWrapper props={inputsWrapperProps} />

            <ImagesWrapper props={imagesWrapperProps} />

          </div>
        )
      })
    }
    </div>
  )
}

export default SliderEdit