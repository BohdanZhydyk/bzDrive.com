import React, { useEffect, useState } from "react"

import './Office.scss'
import { OfficeReducer } from "./OfficeReducer"
import { GetUser } from "../../../AppFunctions"
import SiteIcon from "../../All/SiteIcon"
import TopLine from "./TopLine"
import CompaniesPannel from "./CompaniesPannel"
import DecoderVIN from "./DecoderVIN"
import DecoderNIP from "./DecoderNIP"
import Calendar from "./Calendar"
import SearchDocs from "./SearchDocs"


function Office({ props:{size, sub} }) {

  const user = GetUser()

  const mobile = ( (size().device === `SD` || size().device === `ESD`) )

  const [visibleSide, setVisibleSide] = useState({mobile, side:true})

  const [toggle, setToggle] = useState({decoderVIN:false, decoderNIP:false, search:false, settings:false})

  const [companies, setCompanies] = useState(false)
  const company = companies?.companiesData ? companies?.companiesData[companies?.activeCompany] : false

  const [searchQuery, setSearchQuery] = useState({val:"", err:false})
  const [search, setSearch] = useState([])

  const [prevWeek, setPrevWeek] = useState(-1)
  const [docs, setDocs] = useState([])

  const [docSelectDlBar, setDocSelectDlBar] = useState(true)
  const [docSelect, setDocSelect] = useState([{name:"ZL", act:true},{name:"FS"},{name:"FZ"},{name:"PS"},{name:"PZ"},{name:"ZU"},{name:"VA"}])

  function Reducer(action){
    OfficeReducer(
        action, user, prevWeek, company, setCompanies, search, setSearch, searchQuery, setSearchQuery,
        docs, setDocs, docSelect, setDocSelect, docSelectDlBar, setDocSelectDlBar
    )
  }

  const searchDocsProps = {company, search, setSearch, searchQuery, setSearchQuery, visibleSide, setVisibleSide, Reducer}
  const companiesPannelProps = {user, companies, setCompanies}
  const calendarProps = {
    user, company, docs, prevWeek, setPrevWeek, docSelect, setDocSelect,
    docSelectDlBar, setDocSelectDlBar, visibleSide, setVisibleSide, Reducer
  }

  useEffect( ()=>{
    !companies && Reducer( { type:"GET_COMPANIES" } )
  }, [])

  useEffect( ()=>{
    setVisibleSide( prev=> mobile ? {mobile, side:true} : {mobile, side:false} )
  },[mobile])

  // console.log("size",size())
  // console.log("sub",sub)
  // console.log("companies",companies)
  // console.log("company",company)
  // console.log("docs",docs)
  // console.log("search",search)
  // console.log("visibleSide", visibleSide)
  // console.log("mobile", mobile)

  return(
    <div className="Office flex column">

    {
      !companies
      ?
      <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
      :
      <React.Fragment>

        <TopLine props={{toggle, setToggle}} />

        { toggle?.decoderVIN && <DecoderVIN props={{}} /> }

        { toggle?.decoderNIP && <DecoderNIP props={{}} /> }

        { toggle?.search && <SearchDocs props={searchDocsProps} /> }

        {
          toggle?.settings
          ? <CompaniesPannel props={companiesPannelProps} />
          : <Calendar props={calendarProps} />
        }

      </React.Fragment>
    }

    </div>
  )
}

export default Office