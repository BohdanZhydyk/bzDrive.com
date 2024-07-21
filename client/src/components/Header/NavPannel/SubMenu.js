import React from "react"
import { NavLink } from 'react-router-dom'


export function SubMenu({ props:{link, tr, lang, burger, actSubNavBtn, NavClick} }){
  return(
    <div className={`SubMenu flex column`}>
    {
      link?.subnav && link.subnav.map((sub, k)=> {

        const subKey = `SubNavBtn${link.to}${sub.to}${k}`
        const subTo = `${link.to}${sub.to}`
        const subName = sub.name
        const isActive = (actSubNavBtn === subName)
        const subCl = isActive ? 'activeSubNavBtn' : ''
        const subLinkName = `${isActive ? '- ' : ''}${tr(`Nav_${subName.toUpperCase()}`,lang)}`
        const isSubBtn = true
        const pannelMode = burger ? 'nav' : false
        const CLICK = ()=> NavClick(isSubBtn, subName, pannelMode)

        return(
          <div className="SubNavBtn flex start" key={subKey}>

            <NavLink className={subCl} to={subTo} onClick={CLICK}>{subLinkName}</NavLink>
            
          </div>
        )

      })
    }
    </div>
  )
}