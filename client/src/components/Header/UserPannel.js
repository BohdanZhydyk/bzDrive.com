import React from "react"


export function UserPannel({ props:{blur, BLUR} }) {

  const AvaImg = `https://bzdrive.com/files/users/bz83_1665083235331.png`
  const OnlineImg = `https://bzdrive.com/files/users/online.png`

  

  return (
    <div className="UserPannel flex end">

      <img className="ImgBtn Ava" src={AvaImg} onClick={()=>BLUR()} alt="ava" />
      <img className="ImgBtn Online" src={OnlineImg} onClick={()=>BLUR()} alt="online" />

    </div>
  )
}