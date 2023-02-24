import React from "react"

import './Footer.scss'
import { Contacts } from "./Contacts"
import { CopyrightLine1 } from "./CopyrightLine1"
import { CopyrightLine2 } from "./CopyrightLine2"


function Footer({ props:{state, blur, BLUR} }) {

  const contacts = state?.info?.contacts
  const author = state?.info?.author
  const link = state?.info?.link

  return (
    <footer className={`flex between ${blur ? `blur` : ``}`}>

      { contacts && <Contacts props={{contacts}}/> }

      {
        (author && link) &&
        <div>
          <CopyrightLine1 props={{author}}/>
          <CopyrightLine2 props={{link}}/>
        </div>
      }

    </footer>
  )
}

export default Footer