import React from "react"

import CompanyPannel from "./CompanyPannel"
import Avatar from "../Elements/Avatar"
import ActionBtn from "../../../All/ActionBtn"


function SettingsPannel({ props:{
  companies, activeCompany, setActiveCompany, Reducer
} }){

  function GET_NEW_COMPANY(){ Reducer({ type:"GET_NEW_COMPANY" }) }
  function SET_ACTIVE_COMPANY(c){ Reducer({ type:"SET_ACTIVE_COMPANY", c }) }

  return(
    <div className="SettingsPannel flex stretch wrap">

      <div className="CompaniesPannel radius flex start stretch wrap">

        <div className="CompaniesList flex column start">

          {
            companies?.myCompanies.map( (company, c)=>{
              const classes = `MyCompany ${c === activeCompany ? `ActiveCompany` : ``} flex start radius`
              const link = `https://bzdrive.com/files/dealers/`
              const ava = company?.img
              const key = `MyCompany${c}`
              return(
                <div className={classes} onClick={()=>SET_ACTIVE_COMPANY(c)} key={key}>
                  <Avatar props={{link, ava}} />
                  <span>{company?.shortName ?? `New_Company_${companies?.id}`}</span>
                </div>
              )
            })
          }

          <div className="NewCompanyBtn flex start">
            <ActionBtn props={{name:"plus", click:GET_NEW_COMPANY}} />
          </div>

        </div>

        {
          companies?.myCompanies.filter( (el, i)=> i === activeCompany ).map( (company, c)=>{
            return <CompanyPannel props={{company, c, Reducer}} key={`SettingsPannel${company?._id}${c}`} />
          })
        }
      </div>

    </div>
  )
}

export default SettingsPannel