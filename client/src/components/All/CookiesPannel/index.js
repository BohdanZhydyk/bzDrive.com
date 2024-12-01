import React from "react"

import "./CookiesPannel.scss"
import ActionBtn from "../ActionBtn"


function CookiesPannel({ props:{setIsCookiesPannel} }){
  return(
    <div className="CookiesPannel flex">

      <div className="CookiesText flex column">

        <div className="CloseBtn flex">
          <ActionBtn props={{name:`cancel`, click:()=>setIsCookiesPannel(false)}} />
        </div>

        <span>
          Nasza strona internetowa wykorzystuje pliki cookie w celu poprawy funkcjonalności i jakości świadczonych usług.
        </span>

        <span className="flex">

          <span>Korzystając z witryny lub zamykając ten panel, akceptujesz naszą</span>

          <div className="CookiesLink flex bold">
            <a href="/cookies" target="_blank" rel="noreferrer">
              {`Politykę prywatności`}
            </a>
          </div>
          
        </span>

      </div>

    </div>
  )
}

export default CookiesPannel