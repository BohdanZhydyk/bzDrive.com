import React from "react"

import "./CompaniesPannel.scss"
import { CompaniesList } from "./CompaniesList"
import { ConpanyInfo } from "./ConpanyInfo"


function CompaniesPannel({ props:{user, companies, setCompanies} }){

  const activeCompany = companies?.activeCompany

  return(
    <div className="CompaniesPannel flex stretch wrap">
      <CompaniesList props={{user, activeCompany, companies, setCompanies}} />
      <ConpanyInfo props={{user, activeCompany, companies, setCompanies}} />
    </div>
  )
}

export default CompaniesPannel