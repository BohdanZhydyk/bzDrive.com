import React from "react"
import { NavLink } from 'react-router-dom'

import { tr } from "../../../AppTranslate"
import { SubMenu } from "./SubMenu"


export function NavBtn({ props:{link, lang, burger, actNavBtn, actSubNavBtn, actSubMenu, NavClick} }){

  const to = link.to
  const name = link.name
  const cl = (actNavBtn === name) ? 'activeNavBtn' : ''
  const act = (actSubMenu === name)
  const linkName = tr(`Nav_${name.toUpperCase()}`,lang)
  const pannelMode = burger ? 'nav' : false
  const isSubBtn = false
  const CLICK = ()=> NavClick(isSubBtn, name, false)
  const SUB_CLICK = ()=>NavClick(isSubBtn, name, pannelMode)
  const SubMenuProps = {link, tr, lang, burger, actSubNavBtn, NavClick}

  return(
    <div className="NavBtn flex column">

      {
        link.subnav
        ? <div className={cl} onClick={CLICK}>{tr(`Nav_${name.toUpperCase()}`,lang)}</div>
        : <NavLink className={cl} to={to} onClick={SUB_CLICK}>{linkName}</NavLink>
      }

      { (act && link.subnav) && <SubMenu props={SubMenuProps}/> }
      
    </div>
  )
}