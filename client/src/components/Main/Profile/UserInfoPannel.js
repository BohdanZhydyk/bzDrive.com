import React from "react"


export function UserInfoPannel({ props:{role, login} }){

  const userInfo = `[${role}] - ${login}`
  
  return(
    <div className="UserInfoPannel flex start bold">{userInfo}</div>
  )
}