import React from 'react'


export const Slider = ({ props:{txt, image, count, sliderFn} })=>{

  const link = `https://bzdrive.com/`
  const fileAddr = "files/slider/"
  const file = `${link}${fileAddr}${image}`

  const imgLink = `https://bzdrive.com/files/ico/`
  const btnL = `${imgLink}sliderBtnL.png`
  const btnR = `${imgLink}sliderBtnR.png`

  const SLIDE_LEFT = ()=> sliderFn({type:"SLIDE_LEFT"})
  const SLIDE_RIGHT = ()=> sliderFn({type:"SLIDE_RIGHT"})

  return(
    <div className="Slider flex stretch">

      <span className="SliderTxt flex column">

        <span>{txt}</span>

        <div className="CountLine flex">
        {
          count?.arr.map( (dot, d)=>{
            const classes = `Dot ${d === count?.n ? `ActDot` : ``} flex`
            const key = `CountEl${d}`
            return(
              <div className={classes} key={key}></div>
            )
          })
        }
        </div>

      </span>

      <img className="Image" src={file} alt="SliderImage" />

      <div className="SliderImgBtn L flex" onClick={ ()=>SLIDE_LEFT() }>
        <img src={btnL} alt="Left" />
      </div>

      <div className="SliderImgBtn R flex" onClick={ ()=>SLIDE_RIGHT() }>
        <img src={btnR} alt="Right" />
      </div>

    </div>
  )
}