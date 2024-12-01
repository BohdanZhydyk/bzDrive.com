import React from "react"

import { sanitizeTxt } from "../../../../AppFunctions"


export function Email({ props:{txt, lang} }){
  
  const company = txt

  const contacts = company?.contacts
  const email = sanitizeTxt(contacts?.email, "email")?.sanText

  return(
    <a className="Email flex txtYlw start bold" href={`mailto: ${email}`} target="_blank" rel="noreferrer">
      {email}
    </a>
  )
}