import React from "react"
import { NavLink } from "react-router-dom"


export function SubLinks({ props:{sub} }) {
  return(
    <div className="SubLinks flex wrap">
    {
      sub && sub.subnav.map( (link, n)=>{
        const key = `SubLink${sub.to}${link.to}${n}`
        const to = `${sub.to}${link.to}`
        return(
          <NavLink className="SubLink flex" to={to} key={key}>{link.name}</NavLink>
        )
      })
    }
    </div>
  )
}