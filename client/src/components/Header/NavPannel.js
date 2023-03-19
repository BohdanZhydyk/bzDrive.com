import React, { useState, useEffect } from "react"
import { NavLink } from 'react-router-dom'

import { tr } from "../../AppTranslate"
import { GetUser } from "../../AppFunctions"


export function NavPannel({ props:{info, nav, blur, BLUR} }){

  const lang = GetUser().lang

  const [actNavBtn, setActNavBtn] = useState('')
  const [actSubNavBtn, setActSubNavBtn] = useState('')
  const [actSubMenu, setActSubMenu] = useState('')
  
  const TITLE = (name)=> document.title = `${info?.link.join("")} | ${name}`

  const NavBtnClick = (name) => {
    setActNavBtn(name)
    setActSubMenu( actSubMenu !== '' ? (actSubMenu !== name ? name : '') : name )
    TITLE(name)
  }
  const SubNavBtnClick = (name) => {
    setActSubNavBtn(name)
    setActSubMenu('')
    TITLE(name)
  }
  
  const currentPath = window.location.pathname
  const navPath = currentPath.split("/")[currentPath.split("/").length - 2]
  const subNavPath = currentPath.split("/")[currentPath.split("/").length - 1]
  function handleTitleChange(to, name){ to === `/${subNavPath}` && TITLE(name) }

  useEffect(() => {
    nav?.forEach( (link)=>{
      if(!link.subnav){
        handleTitleChange(link.to, link.name)
        if(link.to === `/${subNavPath}`){
          NavBtnClick(link.name)
        }
      }
      else{
        handleTitleChange(link.to, link.name)
        link.subnav.forEach( (sub)=> handleTitleChange(sub.to, sub.name) )
        if(link.to === `/${navPath}`){
          setActNavBtn(link.name)
        }
      }
    })
  }, [nav])

  return(
    <nav className={`NavPannel flex end ${blur ? `blur` : ``}`}>
    {
      nav && nav.map((link, n)=> {

        const key = `NavBtn${link.to}${n}`
        const to = link.to
        const name = link.name
        const cl = (actNavBtn === name) ? 'activeNavBtn' : ''
        const act = (actSubMenu === name)
        const linkName = tr(`Nav_${name}`,lang)

        return(
          <div className="NavBtn flex column" key={key}>
            {
              link.subnav
              ?
              <div className={cl} onClick={()=> NavBtnClick(name)}>{tr(`Nav_${name}`,lang)}</div>
              :
              <NavLink className={cl} to={to} onClick={()=> NavBtnClick(name)}>
                {linkName}
              </NavLink>
            }
            {
              (act && link.subnav) &&
              <div className={`SubMenu flex column`}>
              {
                link?.subnav && link.subnav.map((sub, k)=> {

                  const subKey = `SubNavBtn${link.to}${sub.to}${k}`
                  const subTo = `${link.to}${sub.to}`
                  const subName = sub.name
                  const subAct = (actSubNavBtn === subName)
                  const subCl = subAct ? 'activeSubNavBtn' : ''
                  const subLinkName = `${subAct ? "- " : ""}${tr(`Nav_${subName}`,lang)}`

                  return(
                    <div className="SubNavBtn flex start" key={subKey}>

                      <NavLink className={subCl} to={subTo} onClick={()=>SubNavBtnClick(subName)}>
                        {subLinkName}
                      </NavLink>

                    </div>
                  )

                })
              }
              </div>
            }
          </div>
        )
      })
    }
    </nav>
  )
}