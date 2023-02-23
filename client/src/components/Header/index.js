import React from "react"
import { FullScreenPannel } from "./FullScreenPannel"

import "./Header.scss"
import { NavPannel } from "./NavPannel"
import { SiteName } from "./SiteName"
import { UserPannel } from "./UserPannel"


function Header({ props:{state, blur, BLUR} }) {

  const info = state.info
  const nav = state.nav

  return (
    <header className="Header flex evenly">

      { info && <SiteName props={{info, blur, BLUR}} /> }

      <NavPannel props={{info, nav, blur, BLUR}}/>

      <UserPannel props={{blur, BLUR}}/>

      <FullScreenPannel props={{blur, BLUR}}/>

    </header>
  )
}

export default Header