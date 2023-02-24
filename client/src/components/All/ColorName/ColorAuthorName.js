import React from "react"


export function ColorAuthorName({ props:{author} }){
  return(
    <>
      <span className="Whitespace"></span>
      <span className="txtOrg">{author ? author[0].toUpperCase() : ''}</span>
      <span className="txtWht">{author ? author[1].toLowerCase() : ''}</span>
      <span className="Whitespace"></span>
      <span className="txtOrg">{author ? author[2].toUpperCase() : ''}</span>
      <span className="txtWht">{author ? author[3].toLowerCase() : ''}</span>
      <span className="Whitespace"></span>
    </>
  )
}