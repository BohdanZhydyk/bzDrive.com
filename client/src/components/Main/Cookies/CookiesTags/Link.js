import React from "react"

import { sanitizeTxt } from "../../../../AppFunctions"


export function Link({ props:{txt, link, lang} }){
  
  let newLink = sanitizeTxt(link[lang], "www")?.sanText

  return(
    <a className="Link flex txtYlw start bold" href={newLink} target="_blank" rel="noreferrer">
      {txt}
    </a>
  )
}