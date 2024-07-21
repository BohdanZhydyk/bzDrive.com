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
import SearchArea from "./SearchArea"


function Office({ props:{size, sub} }) {

  const user = GetUser()

  const [toggle, setToggle] = useState({decoderVIN:false, decoderNIP:false, search:false, settings:false})

  const [companies, setCompanies] = useState(false)
  const company = companies?.companiesData ? companies?.companiesData[companies?.activeCompany] : false

  const [prevWeek, setPrevWeek] = useState(-1)
  const [docs, setDocs] = useState([])

  const [docSelectDlBar, setDocSelectDlBar] = useState(true)
  const [docSelect, setDocSelect] = useState([{name:"ZL", act:true},{name:"FS"},{name:"FZ"},{name:"PS"},{name:"PZ"},{name:"ZU"},{name:"VA"}])

  function Reducer(action){
    OfficeReducer(action, user, prevWeek, company, setCompanies, docs, setDocs, docSelect, setDocSelect, docSelectDlBar, setDocSelectDlBar)
  }

  useEffect( ()=>{
    !companies && Reducer( { type:"GET_COMPANIES" } )
  }, [])

  // console.log("size",size)
  // console.log("sub",sub)
  // console.log("companies",companies)
  // console.log("company",company)
  // console.log("docs",docs)

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

        {/* { toggle?.search && <SearchArea props={{}} /> } */}

        {
          toggle?.settings
          ? <CompaniesPannel props={{user, companies, setCompanies}} />
          : <Calendar props={{user, company, docs, prevWeek, setPrevWeek, docSelect, setDocSelect, docSelectDlBar, setDocSelectDlBar, Reducer}} />
        }

      </React.Fragment>
    }

    </div>
  )
}

export default Office