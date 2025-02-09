import React from "react"

import "./Avatar.scss"


function Avatar({ props:{link, ava} }){
  return(
    <div className="AvaBackground radius flex">
      { ava && <img className="ImgBtn radius flex" src={`${link}${ava}`} alt="" /> }
    </div>
  )
}

export default Avatar