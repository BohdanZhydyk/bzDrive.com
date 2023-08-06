import React from "react"

import { InputsWrapper } from "./InputsWrapper"
import { ImagesWrapper } from "./ImagesWrapper"


function SliderEdit({ props:{
  user, slider, setSlider, nr, link, fileAddr, setWorkshop, setEditingText, btnL, btnR, SliderReducer
} }){
  return(
    <div className="SliderEdit flex column">
    {
      slider?.body.map( (folder, folderNr)=>{

        const inputsWrapperProps = {
          slider, folder, nr, folderNr, setWorkshop, setEditingText
        }
        
        const imagesWrapperProps = {
          user, slider, setSlider, nr, folder, folderNr, link, fileAddr, setWorkshop, setEditingText, btnL, btnR, SliderReducer
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