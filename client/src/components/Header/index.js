import React from "react"

import "./Header.scss"
import { NavPannel } from "./NavPannel"
import { SiteName } from "./SiteName"
import { UserPannel } from "./UserPannel"
import { FullScreenPannel } from "./FullScreenPannel"


function Header({ props:{state, blur, BLUR} }) {

  const info = state.info
  const nav = state.nav

  return (
    <header className="Header flex evenly">

      { info && <SiteName props={{info, blur, BLUR}} /> }

      { nav && <NavPannel props={{info, nav, blur, BLUR}}/> }

      { info && <UserPannel props={{blur, BLUR}}/> }

      { blur && <FullScreenPannel props={{blur, BLUR}}/> }

    </header>
  )
}

export default Header