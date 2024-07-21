import React, { useState, useEffect } from "react"
import DownloadBar from "../../../All/DownloadBar"


export function DaysOfWeek({ props:{tr, user, docs, prevWeek, docSelect, setDocSelect, docSelectDlBar, setDocSelectDlBar, Reducer} }) {

  const dayNames = tr(`DayNames`,user?.lang)

  const selPannelNames = ["NEW", "SORT"]

  const [selPannel, setSelPannel] = useState(selPannelNames[1])

  const isNew = (selPannel === selPannelNames[0])

  function SET_SEL_BTN(name){
    setDocSelectDlBar(true)
    !isNew && setDocSelect( prev=> prev?.map( el=> el?.name !== name ? el : {...el, act:!el?.act} ) )
  }

  function OPEN_NEW_DOC(name){
    setDocSelectDlBar(true)
    setSelPannel(selPannelNames[1])
    const l = 0
    isNew && Reducer({
      type:"OPEN_DOCUMENT",
      mode:name, docID:"NewDoc", lineNr:l,
      divName:`ScroolToNewDoc_${l}`, offset:0
    })
  }

  useEffect( ()=>{
    Reducer( { type:"GET_DOCS" } )
  }, [prevWeek, docSelect])

  return(
    <div className="WeekArea flex">

      <div className="WeekDocs flex stretch">

        <div className="LeftPannel flex">

          <div className={`SelBtn NewDocBtn ${isNew ? `` : `SelBtnNotAct`}  flex`} onClick={()=>setSelPannel(prev=>selPannelNames[0])} >
            {tr(`SelBtn_${selPannelNames[0]}`,user?.lang)}
          </div>

          <div className={`SelectDocBtnPannel SelPannel${selPannel} flex wrap`}>

            {
              (docs?.length > 0) && docSelect.map( (btn, b)=>{
                const name = btn?.name
                const isAct = btn?.act
                const key = `DocBtn${name}${b}`
                const classes = `SelectDocBtn ${(!isNew && isAct) ? `ActDocBtn` : ``} flex`
                return(
                  <div className={classes} onClick={()=> !isNew ? SET_SEL_BTN(name) : OPEN_NEW_DOC(name)} key={key}>
                    {name}
                  </div>
                )
              })
            }
            
            { docSelectDlBar && <DownloadBar props={{color:`#117711`}} /> }

          </div>

          <div className={`SelBtn SortDocBtn ${isNew ? `SelBtnNotAct` : ``} flex`} onClick={()=>setSelPannel(prev=>selPannelNames[1])} >
            {tr(`SelBtn_${selPannelNames[1]}`,user?.lang)}
          </div>

        </div>

        <div className="RightPannel flex">

          {
            dayNames.map( (day, d)=>{
              const key = `DayName${d}${day}`
              const classes = `DayName ${(d > 4) ? `HolyDay` : ``} txtOrg bold flex`
              return <div className={classes} key={key}>{day.toUpperCase()}</div>
            })
          }

        </div>

      </div>

    </div>
  )
}