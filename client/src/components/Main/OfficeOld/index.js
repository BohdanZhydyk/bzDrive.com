import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"

import './Office.scss'
import { GetUser } from "../../../AppFunctions"
import { OfficeReducer } from "./OfficeReducer"
import CompaniesPannel from "./CompaniesPannel"
import SiteIcon from "../../All/SiteIcon"
import TopLineOld from "./TopLineOld"
import AreaFI from "./AreaFI"
import AreaZL from "./AreaZL"
import AreaFS from "./AreaFS"


function OfficeOld({ props:{size, sub} }) {
  
  const user = GetUser()

  const navLineData = window.location.pathname?.split("/").slice(1,3)

  const [def, setDef] = useState(0)
  const [companies, setCompanies] = useState(false)
  const [company, setCompany] = useState(companies ? companies[def] : false)

  const [search, setSearch] = useState( {query:{}, docs:[]} )

  const [calendar, setCalendar] = useState( false )

  const [invoices, setInvoices] = useState([])

  const [finances, setFinances] = useState(false)
  
  const CHK_COMPANY = (count)=>{
    companies.map( (el, n)=>{
      if(count === n){
        setCompany(companies[n])
        setDef(n)
      }
    })
  }

  function Reducer(action){
    OfficeReducer(
      action, setDef, setCompanies, setCompany, company, search, setSearch,
      calendar, setCalendar, invoices, setInvoices, finances, setFinances
    )
  }

  const [toggleCompany, setToggleCompany] = useState(false)
  const [toggleSearchPannel, setToggleSearchPannel] = useState(false)

  const TopLineProps = {user, navLineData, setSearch, toggleSearchPannel, setToggleSearchPannel, toggleCompany, setToggleCompany}

  useEffect( ()=>{
    !companies && Reducer( { type:"GET_COMPANIES" } )
  }, [])

  return(
    <div className="Office flex column">

    {
      !company
      ?
      <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
      :
      <React.Fragment>

        <TopLineOld props={TopLineProps} />

        { toggleCompany && <CompaniesPannel props={{user, def, company, setCompany, companies, CHK_COMPANY}} /> }

        <Routes>
          <Route path="/fi" element={<AreaFI props={{company, finances, setFinances, Reducer}}/>} />
          <Route path="/zl" element={<AreaZL props={{size, company, search, setSearch, toggleSearchPannel, calendar, setCalendar, Reducer}}/>} />
          <Route path="/fs" element={<AreaFS props={{company, invoices, setInvoices, Reducer}}/>} />
        </Routes>

      </React.Fragment>
    }

    </div>
  )
}

export default OfficeOld