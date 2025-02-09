import React, { useEffect } from "react"

import "./CalendarPannel.scss"
import CalendarTopLines from "./CalendarTopLines"
import WeekTopLine from "./WeekTopLine"
import WeekDocuments from "./WeekDocuments"
import CalendarBottomLines from "./CalendarBottomLines"


function CalendarPannel({ props:{user, companies, activeCompany, newDoc, calendar, documents, docSelect, dowloadBar, Reducer} }){

  useEffect( ()=>{ !calendar && Reducer({ type:"GET_CALENDAR" }) }, [docSelect])

  return(
    <div className="CalendarPannel flex column start">

      <CalendarTopLines props={{user, docSelect, newDoc, companies, activeCompany, dowloadBar, Reducer}} />
      
      {
        calendar && calendar.map( (weekLines, w)=>{
          return(
            <div className="WeekSection flex column start" key={`WeekSection${w}`}>

              <WeekTopLine props={{user, weekLines, w}} />
      
              <WeekDocuments props={{companies, activeCompany, weekLines, w, documents, docSelect, Reducer}} />
      
            </div>
            )
        })
      }

      <CalendarBottomLines props={{user, Reducer}} />

    </div>
  )
}

export default CalendarPannel