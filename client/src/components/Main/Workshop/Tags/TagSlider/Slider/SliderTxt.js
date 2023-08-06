import React from "react"


export function SliderTxt({ props:{actVal, actImgs} }){
  return(
    <span className="SliderTxt flex column">

      <span>{actVal}</span>

      <div className="CountLine flex">
      {
        actImgs.map( (dot, d)=>{

          const classes = `Dot ${dot?.act ? `ActDot` : ``} flex`
          const key = `CountEl${dot}${d}`

          return <div className={classes} key={key}></div>

        })
      }
      </div>

    </span>
  )
}