import React from "react"

import "./ElDocName.scss"
import { docNrProps } from "./propses"
import { sanitizeTxt } from "../../../../../AppFunctions"
import { DocTitle } from "./DocTitle"
import { DocSign } from "./DocSign"


function ElDocName({ props:{tr, lang, mode, dealer, nr, setNr, setSave} }) {

  const logoImg = `https://bzdrive.com/files/dealers/${dealer?.img ?? ''}`
  const logoName = dealer?.shortName ?? ''

  const docNrPr = docNrProps({tr, lang, nr, setNr, setSave, sanitizeTxt})

  return(
    <section className="ElDocName flex end stretch wrap">

      <div className="ElDocNameLogo flex start">
        <img src={logoImg} alt={logoName} />
        <span>{logoName}</span>
      </div>

      <div className="ElDocNameData flex column start">

        <DocTitle props={{tr, lang, mode, nr, docNrPr}} />

        <DocSign props={{tr, lang, mode, nr, setNr, setSave}} />

      </div>

    </section>
  )
}

export default ElDocName