import React from "react"

import { GetUser } from "../../AppFunctions"


export function UserPannel({ props:{blur, BLUR} }) {

  const ava = GetUser().ava

  const AvaImg = `https://bzdrive.com/files/users/${ava ? ava : `male.png`}`
  const OnlineImg = `https://bzdrive.com/files/users/online.png`

  return (
    <div className="UserPannel flex end">

      <img className="ImgBtn Ava" src={AvaImg} onClick={()=>BLUR()} alt="ava" />
      { ava && <img className="ImgBtn Online" src={OnlineImg} onClick={()=>BLUR()} alt="online" /> }

    </div>
  )
}