import React, { useState, useEffect } from "react"

import { GetUser } from "../../../AppFunctions"
import { NavBtn } from "./NavBtn"


function NavPannel({ props:{info, nav, BLUR, burger} }){

  const lang = GetUser().lang

  const [actNavBtn, setActNavBtn] = useState('')
  const [actSubMenu, setActSubMenu] = useState(false)
  const [actSubNavBtn, setActSubNavBtn] = useState('')
  
  const TITLE = (name)=> document.title = `${info?.link.join("")} | ${name}`

  const NavClick = (isSubBtn, name, pannelMode)=> {
    if(!isSubBtn){
      setActNavBtn(name)
      setActSubMenu(prev=> prev === name ? false : name)
    }
    else{
      setActSubNavBtn(name)
      setActSubMenu(false)
    }
    TITLE(name)
    pannelMode && BLUR(pannelMode)
  }

  useEffect(() => {
    const currentPath = window.location.pathname
    const isNavPath = (to)=> to === `/${currentPath.split("/")[1]}`
    const isSubNavPath = (to)=> to === `/${currentPath.split("/")[2]}`
    nav?.forEach( (link)=>{
      isNavPath(link.to) && setActNavBtn(link.name)
      if(!link.subnav){
        isNavPath(link.to) && TITLE(link.name)
      }
      else{
        link.subnav.forEach( (sub)=>{
          isSubNavPath(sub.to) && setActSubNavBtn(sub.name)
          isSubNavPath(sub.to) && TITLE(sub.name)
        })
      }
    })
  }, [nav])

  return(
    <nav className={`NavPannel flex ${burger ? `column` : `end`}`}>
    {
      nav && nav.map((link, n)=>{

        const key = `NavBtn${link.to}${n}`
        const navBtnProps = {link, lang, burger, actNavBtn, actSubNavBtn, actSubMenu, NavClick}
        
        return <NavBtn props={navBtnProps} key={key}/>

      })
    }
    </nav>
  )
}

export default NavPannel