import React, { useState } from "react"


export function ArtSlider({ props:{imgs} }){

  const [nr, setNr] = useState(0)

  const isImgs = imgs?.length > 0
  const mainImg = imgs[nr]

  return(
    <div className="ArtSlider flex column start">

      <div className="MainImg flex">
        { isImgs && <img src={mainImg} alt="mainImg" /> }
      </div>

      <div className="ElseImgs flex">
      {
        imgs?.map( (elseImg, i)=>{

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