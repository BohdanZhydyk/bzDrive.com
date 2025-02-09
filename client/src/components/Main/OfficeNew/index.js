import React, { useEffect, useState } from "react"

import "./OfficeNew.scss"
import { GetUser } from "../../../AppFunctions"
import { OffifceReducer, initialNewDoc, initialDocSelect } from "./officeLogic"
import SiteIcon from "../../All/SiteIcon"
import OfficeTopLine from "./OfficeTopLine"
import NoCompaniesWarning from "./NoCompaniesWarning"
import DecoderVIN from "../OfficeNew/DecoderVIN"
import DecoderNIP from "../OfficeNew/DecoderNIP"
import SettingsPannel from "./SettingsPannel"
import CalendarPannel from "./CalendarPannel"


function OfficeNew(){

  const user = GetUser()
  const isLogined = user?.role

  const [companies, setCompanies] = useState( false )
  const [activeCompany, setActiveCompany] = useState( false )
  const [isCompaniesWarning, setIsCompaniesWarning] = useState( true )

  const [calendar, setCalendar] = useState( false )
  const [documents, setDocuments] = useState( [] )
  const [newDoc, setNewDoc] = useState( initialNewDoc )

  const [prevWeek, setPrevWeek] = useState( -1 )
  const [docSelect, setDocSelect] = useState( initialDocSelect )
  
  const [dowloadBar, setDownloadBar]  = useState( false )

  const [toggle, setToggle] = useState( {decoderVIN:false, decoderNIP:false, settings:false} )

  function Reducer(action){
    OffifceReducer({
      action, isLogined, companies, setCompanies, activeCompany, setActiveCompany, newDoc, setNewDoc,
      calendar, setCalendar, documents, setDocuments, prevWeek, setPrevWeek, docSelect, setDocSelect,
      dowloadBar, setDownloadBar
    })
  }

  useEffect( ()=>{ !companies && Reducer({ type:"GET_COMPANIES" }) }, [])
  
  // console.log("officeNew", documents)

  return(
    <div className="OfficeNew flex column">
    
    {
      !companies
      ?
      <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
      :
      <React.Fragment>

        { !isLogined && isCompaniesWarning && <NoCompaniesWarning props={{setIsCompaniesWarning}}/> }

        <OfficeTopLine props={{companies, activeCompany, toggle, setToggle}}/>

        { toggle?.decoderVIN && <DecoderVIN props={{}} /> }

        { toggle?.decoderNIP && <DecoderNIP props={{}} /> }

        { toggle?.settings && <SettingsPannel props={{companies, activeCompany, setActiveCompany, Reducer}} /> }

        {
          !toggle?.decoderVIN && !toggle?.decoderNIP && !toggle?.settings &&
          <CalendarPannel props={{user, companies, activeCompany, newDoc, calendar, documents, docSelect, dowloadBar, Reducer}} />
        }

      </React.Fragment>
    }

    </div>
  )
}

export default OfficeNew