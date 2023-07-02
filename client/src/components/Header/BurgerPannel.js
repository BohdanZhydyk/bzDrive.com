import React from "react"


export function BurgerPannel({ props:{BLUR} }){

  const BurgerImg = `https://bzdrive.com/files/ico/icoBurger.png`

  return(
    <div className="NavBurger flex column">
      <img className="ImgBtn" src={BurgerImg} onClick={()=>BLUR("nav")} alt="ava" />
    </div>
  )
}