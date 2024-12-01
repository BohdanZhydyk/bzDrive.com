import React from "react"
import { Link } from "react-router-dom"

import "./Page404.scss"
import { GetUser } from "../../../AppFunctions"
import { Page404Tr } from "./Page404Translate"
import SiteIcon from "../../All/SiteIcon"


function Page404() {

  const user = GetUser()
  const lang = user?.lang

  return (
    <div className="Page404 flex stretch wrap">
      
      <div className="Pattern flex"></div>

      <div className="SiteIconImg flex"><SiteIcon props={{speed:4}} /></div>

      <div className="Page404Content flex column start">

        <div className="Warning flex bold">{Page404Tr("warning", lang)}</div>

        <p>{Page404Tr("paragrarh1", lang)}</p>

        <p>{Page404Tr("paragrarh2", lang)}</p>

        <Link to="/" className="ReturnHomeButton flex bold">{Page404Tr("btnTxt", lang)}</Link>

      </div>
      
    </div>
  )
}

export default Page404
