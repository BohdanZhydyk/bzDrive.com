import React from "react"

import { tr } from "../../../AppTranslate"


export function UserInfo({ props:{user} }) {

  const lang = user?.lang

  const AvaImg = `https://bzdrive.com/files/users/${user?.ava ? user.ava : `male.png`}`

  const lines = [
    {name:"login", txt:user?.login},
    {name:"role", txt:user?.role},
    {name:"email", txt:user?.email},
    {name:"lang", txt:user?.lang},
    {name:"sex", txt:user?.sex},
    {name:"ava", txt:user?.ava}
  ]

  return (
    <div className="UserInfo flex wrap">

      <div className="Information">
      {
        user && lines.map( (line, i)=>{
          return(
            <div className="InfoLine flex start" key={`UserInfoLine${i}`}>
              <span className="txtRed">{line.name}</span>
              <span className="txtWht">{`: ${line.txt}`}</span>
            </div>
          )
        })
      }
      </div>

      <img className="AvaImgBig" src={AvaImg} alt="AvaImgBig" />

      <div className="InfoParagraf">
        <p>{tr(`CommingSoon_1`,lang)}</p>
        <p>{tr(`CommingSoon_2`,lang)}</p>
      </div>

    </div>
  )
}