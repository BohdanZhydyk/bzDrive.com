import React from "react"

import "./Header.scss"
import { SiteName } from "./SiteName"
import NavPannel from "./NavPannel"
import { UserPannel } from "./UserPannel"
import { BurgerPannel } from "./BurgerPannel"
import { FullScreenPannel } from "./FullScreenPannel"


function Header({ props:{state, blur, BLUR, AppReload} }) {

  const info = state.info
  const nav = state.nav

  return (
    <header className="Header flex">

      { info && <SiteName props={{info, blur, BLUR}} /> }

      {
        nav &&
        <div className="NavSection flex">
          <NavPannel props={{info, nav, BLUR}}/>
        </div>
      }

      { info && <UserPannel props={{blur, BLUR}}/> }

      { nav && <BurgerPannel props={{info, nav, blur, BLUR}}/> }

      { blur && <FullScreenPannel props={{info, nav, blur, BLUR, AppReload}}/> }

    </header>
  )
}

export default Header