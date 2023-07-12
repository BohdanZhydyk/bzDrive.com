import React from "react"

import "./ElDocName.scss"
import { docNrProps } from "./propses"
import { tr } from "../../../../../AppTranslate"
import { sanitizeTxt } from "../../../../../AppFunctions"
import { DocTitle } from "./DocTitle"
import { DocSign } from "./DocSign"


function ElDocName({ props:{user, mode, dealer, nr, setNr, setSave, editErr, setEditErr, printMode} }) {

  const lang = user.lang

  const logoImg = `https://bzdrive.com/files/dealers/${dealer?.img ?? ''}`
  const logoName = dealer?.shortName ?? ''

  const docNrPr = docNrProps(tr, lang, nr, setNr, editErr, setEditErr, setSave, sanitizeTxt)

  return(
    <section className="ElDocName flex end stretch wrap">

      {
        printMode &&
        <div className="ElDocNameLogo flex start">
          <img src={logoImg} alt={logoName} />
          <span>{logoName}</span>
        </div>
      }

      <div className="ElDocNameData flex column start">

        <DocTitle props={{tr, lang, mode, nr, docNrPr}} />

        <DocSign props={{lang, mode, nr, setNr, setSave, editErr, setEditErr, printMode}} />

      </div>

    </section>
  )
}

export default ElDocName