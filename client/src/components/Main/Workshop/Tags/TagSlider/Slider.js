import React from 'react'


export const Slider = ({ props:{txt, image, sliderFn} })=>{

  let btnL = `https://bzdrive.com/files/ico/sliderBtnL.png`
  let btnR = `https://bzdrive.com/files/ico/sliderBtnR.png`
  // let btnEdit = `https://bzdrive.com/files/ico/icoEdit.png`

  let SLIDE_LEFT = ()=> sliderFn({type:"SLIDE_LEFT"})
  let SLIDE_RIGHT = ()=> sliderFn({type:"SLIDE_RIGHT"})
  // let EDIT = ()=> sliderFn({type:"EDIT"})

  return(
    <div className="Slider flex stretch wrap">

      <span className="sliderTxt flex">{txt}</span>

      <img className="Image" src={image} alt="SliderImage" />

      <div className="sliderImgBtn L flex" onClick={ ()=>SLIDE_LEFT() }>
        <img src={btnL} alt="Left" />
      </div>

      <div className="sliderImgBtn R flex" onClick={ ()=>SLIDE_RIGHT() }>
        <img src={btnR} alt="Right" />
      </div>

      {/* { admin && <img className="EditBtn imgBtn" src={btnEdit} onClick={ ()=>EDIT() } alt="edit" /> } */}

    </div>
  )
}