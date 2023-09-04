import React, { useState } from "react"


export function ArtSlider({ props:{IMG} }){

  const [nr, setNr] = useState(0)

  const isImgs = IMG?.length > 0
  const mainImg = IMG[nr]

  return(
    <div className="ArtSlider flex column start">

      <div className="MainImg flex">
        { isImgs && <img src={mainImg} alt="mainImg" /> }
      </div>

      <div className="ElseImgs flex">
      {
        IMG?.map( (elseImg, i)=>{

          const key = `ElseImg${i}`

          return(
            <img className="ElseImg flex" src={elseImg} alt={key} key={key} />
          )
        })
      }
      </div>
      
    </div>
  )
}