import React from "react"


export function SliderImgBtns({ props:{dirBtns, PREV, NEXT} }){

  const btns = [
    { alt:"Left", src:dirBtns?.btnL, fn:PREV },
    { alt:"Right", src:dirBtns?.btnR, fn:NEXT }
  ]

  return(
    <div className="SliderImgBtns">
    {
      btns.map( (btn, b)=>{

        const classes = `SliderImgBtn ${btn?.alt[0]} flex`
        const key = `SliderImgBtn${b}`

        return(
          <div className={classes} onClick={btn?.fn} key={key}>
            <img src={btn?.src} alt={btn?.alt} />
          </div>
        )
      })
    }
    </div>
  )
}