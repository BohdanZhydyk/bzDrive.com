import React from "react"


export function ColorSiteName({ props:{link} }){
  return(
    <>
      <span className="txtOrg">{link ? link[0] : ''}</span>
      <span className="txtWht">{link ? link[1] : ''}</span>
      <span className="txtOrg">{link ? link[2] : ''}</span>
    </>
  )
}