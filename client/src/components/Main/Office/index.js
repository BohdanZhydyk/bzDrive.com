import React, { useState, useEffect } from "react"
import { Routes, Route } from 'react-router-dom'

import './Office.scss'
import { GetUser } from "../../../AppFunctions"
import { OfficeReducer } from "./OfficeReducer"
import SiteIcon from "../../All/SiteIcon"
import Companies from "./Companies"
import ZL from "./ZL"


function Office({ props:{sub} }) {
  
  const user = GetUser()

  const [def, setDef] = useState(0)
  const [companies, setCompanies] = useState(false)
  const [company, setCompany] = useState(companies ? companies[def] : false)

  const CHK_COMPANY = (count)=>{
    companies.map( (el, n)=>{
      if(count === n){
        setCompany(companies[n])
        setDef(n)
      }
    })
  }

  useEffect( ()=>{
    !companies && OfficeReducer( { type:"GET_COMPANIES" }, user, setDef, setCompanies, setCompany )
  }, [])

  const CompaniesProps = {user, def, setDef, companies, setCompanies, company, setCompany, CHK_COMPANY}

  return(
    <div className="Office flex column">

      {
        !company
        ?
        <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
        :
        <>

          <Companies props={CompaniesProps} />
          
          <Routes>
            <Route path="/zl" element={<ZL props={{company}}/>} />
          </Routes>

        </>
      }

    </div>
  )
}

export default Office