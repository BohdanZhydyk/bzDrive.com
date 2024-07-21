import React from "react"

import "./CompaniesPannel.scss"
import { CompaniesList } from "./CompaniesList"
import { ConpanyInfo } from "./ConpanyInfo"


function CompaniesPannel({ props:{user, def, company, setCompany, companies, CHK_COMPANY} }){

  const lang = user.lang

  return(
    <div className="CompaniesPannel flex stretch wrap">
      <CompaniesList props={{user, def, companies, CHK_COMPANY}} />
      <ConpanyInfo props={{lang, company, setCompany}} />
    </div>
  )
}

export default CompaniesPannel