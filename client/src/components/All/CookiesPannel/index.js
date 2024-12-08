import React from "react"

import "./CookiesPannel.scss"
import { tr } from "../../../AppTranslate"
import { GetUser } from "../../../AppFunctions"
import ActionBtn from "../ActionBtn"


function CookiesPannel({ props:{CLOSE_COOCKIES_PANNEL} }){

  const lang = GetUser()?.lang

  return(
    <div className="CookiesPannel flex">

      <div className="CookiesText flex column">

        <div className="CloseBtn flex">
          <ActionBtn props={{name:`cancel`, click:CLOSE_COOCKIES_PANNEL}} />
        </div>

        <span className="Paragraph">{tr("Coockies_Txt1",lang)}</span>

        <span className="Paragraph">
          <span>{tr("Coockies_Txt2",lang)}</span>
          <span className="CookiesLink bold">
            <a style={{whiteSpace:"nowrap"}} href="/cookies" target="_blank" rel="noreferrer">{tr("Coockies_Txt3",lang)}</a>
          </span>
        </span>

      </div>

    </div>
  )
}

export default CookiesPannel