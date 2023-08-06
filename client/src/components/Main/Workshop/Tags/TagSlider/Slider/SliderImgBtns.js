import React from "react"


export function SliderImgBtns({ props:{btnL, btnR, PREV, NEXT} }){

  const btns = [
    { alt:"Left", src:btnL, fn:PREV },
    { alt:"Right", src:btnR, fn:NEXT }
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