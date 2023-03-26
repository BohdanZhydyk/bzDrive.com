import React from "react"

import { GetUser } from "../../AppFunctions"
import { tr } from "../../AppTranslate"


export function UserPannel({ props:{blur, BLUR} }) {

  const ava = GetUser().ava

  const AvaImg = `https://bzdrive.com/files/users/${ava ? ava : `male.png`}`
  const OnlineImg = `https://bzdrive.com/files/users/online.png`

  return (
    <div className="UserPannel flex end">

      {
        !ava &&
        <span className="LoginBtn txtOrg flex bold" onClick={()=>BLUR()}>
          {tr(`LogInBtn`,GetUser().lang)}
        </span>
      }

      { ava && <img className="ImgBtn Online" src={OnlineImg} onClick={()=>BLUR()} alt="online" /> }
      <img className="ImgBtn Ava" src={AvaImg} onClick={()=>BLUR()} alt="ava" />

    </div>
  )
}