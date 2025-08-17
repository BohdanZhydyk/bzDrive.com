import React from "react"

import "./NoCompaniesWarning.scss"
import { noCompanyWarningTxt } from "../officeLogic"
import ActionBtn from "../../../All/ActionBtn"


function NoCompaniesWarning({ props:{setIsCompaniesWarning} }){

  function CLOSE_WARNING(){ setIsCompaniesWarning( prev=> false ) }
  
  return(
    <div className="NoCompaniesWarning flex column start">

      <div className="CloseWarningBtn flex start">
        <ActionBtn props={{name:"cancel", click:CLOSE_WARNING}} />
      </div>

      {
        noCompanyWarningTxt.map( (txt, t)=>{
          return <span className={`${t !== 0 ? `` : `txtOrg bold`}`} key={`NoCompanyWarning${t}`}>{txt}</span>
        })
      }

    </div>
  )
}

export default NoCompaniesWarning