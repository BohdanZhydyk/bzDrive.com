import React, { useState } from "react"

import './Companies.scss'
import ActionBtn from "../../../All/ActionBtn"
import { CompaniesList } from "./CompaniesList"
import { ConpanyInfo } from "./ConpanyInfo"


function Companies({ props:{user, def, companies, company, setCompany, CHK_COMPANY} }) {

  const lang = user.lang
  const [toggle, setToggle] = useState(false)
  const actBtn = toggle ? `cancel` : `settings`
  const TogglePannel = ()=> setToggle(!toggle)

  return(
    <section className="Companies flex column">

      <div className="SettingsPannel flex end">
        <ActionBtn props={{name:actBtn, click:TogglePannel}} />
      </div>

      {
        toggle &&
        <div className="CompaniesPannel flex stretch">
          <CompaniesList props={{user, def, companies, CHK_COMPANY}} />
          <ConpanyInfo props={{lang, company, setCompany}} />
        </div>
      }

    </section>
  )
}

export default Companies