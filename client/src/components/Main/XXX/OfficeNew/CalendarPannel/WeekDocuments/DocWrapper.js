import React from "react"

import { DocNameNormalize, SumArray, YYYYMMDD_ToWeekDay } from "../../../../../AppFunctions"
import DocumentEditArea from "../../DocumentEditArea"


export function DocWrapper({ props:{companies, activeCompany, weekLines, w, doc, Reducer} }){

  const company = companies?.myCompanies[activeCompany]
  const divName = `ScroolTo${doc?._id}_${w}`
  const scroolTo = {divName, offset:0}
  const active = doc?.active
  const id = doc?._id
  const color = doc?.nr?.color

  const docNr = doc?.nr?.assignNr ?? DocNameNormalize(doc?.nr)
  const contact = doc?.client?.name?.length ? doc?.client?.name : (doc?.client?.contacts?.tel ?? ``)
  const carName = `${doc?.car?.brand} - ${doc?.car?.model}`
  const sellerName = doc?.seller?.name
  const clientName = doc?.client?.name
  const nipFS = doc?.client?.nip
  const nip = doc?.seller?.nip
  const status = doc?.status

  const sum = SumArray( doc?.articles?.map( (el)=> el.SUM ) )

  const repairStatus = doc?.status === "repair"
  const checkImg = `https://bzdrive.com/files/${repairStatus ? `ico/icoCheck.png` : `dealers/${company?.img ?? `empty.png`}`}`

  function colorStyles(){
    function style(color){
      return {
        backgroundColor:`${color}2`,
        borderLeft:`1px solid ${color}`,
        borderRight:`1px solid ${color}`
      }
    }
    switch (doc?.nr?.mode) {
      case "FS": return style("#171")
      case "PS": return style("#171")
      case "FZ": return style("#f00")
      case "PZ": return style("#f00")
      case "ZU": return style("#fd0")
      case "VA": return style("#fd0")
      default: return {
        backgroundColor:color,
        backgroundImage:`linear-gradient(0deg, ${color}, #111a 30% 70%, ${color})`,
        borderLeft:`1px solid ${color}`,
        borderRight:`1px solid ${color}`
      }
    }
  }

  function statusColor(){
    switch(doc?.status) {
      case "close": return {backgroundColor:`#fd0a`}
      case "delete": return {backgroundColor:`#f00a`}
      default: return {backgroundColor:`transparent`}
    }
  }
  
  function docStyles(){

    let from = YYYYMMDD_ToWeekDay(doc?.nr?.from)
    let to = YYYYMMDD_ToWeekDay(doc?.nr?.to)

    const firstDay = weekLines?.week[0]
    const lastDay = weekLines?.week[weekLines?.week?.length - 1]
  
    if( (doc?.nr?.from <= firstDay) ){ from = 1 }
    if( (doc?.nr?.to >= lastDay) ){ to = 7 }
  
    const beforeDocLength = (from > 1) ? from - 1 : 0
    const docLength = to - from + 1
    const afterLength = 7 - beforeDocLength - docLength

    return {
      beforeStyles: {width:`calc(100% / 7 * ${beforeDocLength})`},
      docBodyStyles: {...colorStyles, width: `calc(100% / 7 * ${docLength} - 2px)`},
      afterStyles: {width:`calc(100% / 7 * ${afterLength})`}
    }

  }

  function SAVE(docData){ Reducer({ type:"SAVE_DOCUMENT", docData, scroolTo }) }
  function CLOSE(){ Reducer({ type:"OPEN_CLOSE_DOCUMENT", doc, active, scroolTo }) }

  return(
    <div className={`DocWrapper CalendarLine ${divName} flex wrap`}>

      {
        id !== "newDoc" &&
        <React.Fragment>

          <div className="CalendarLineLeftSide flex">
            <div className="DocumentBody radius flex start">

              <div className="DocNr DocCell radius overflow flex start" style={colorStyles()} onClick={CLOSE}>
                <div className="StatusLine flex" style={statusColor()}></div>
                <span>{docNr}</span>
                { repairStatus && <img className="RepairBtn flex" src={checkImg} alt="check" /> }
              </div>

              <div className="DocName DocCell radius overflow flex start" style={colorStyles()} onClick={CLOSE}>
                <span>{}</span>
                <div className="StatusLine flex" style={statusColor()}></div>
              </div>

              <div className="DocContact DocCell radius overflow flex start" style={colorStyles()}>
                <span>{contact}</span>
                <div className="StatusLine flex" style={statusColor()}></div>
              </div>

              <div className="DocSum DocCell radius overflow flex end" style={colorStyles()} onClick={CLOSE}>
                <span>{sum}</span>
                <div className="StatusLine flex" style={statusColor()}></div>
              </div>
              
              {/* <div className="DocAva DocCell flex start" style={cellStyles()}>
                <img className="ImgBtn flex" src={checkImg} alt="check" />
              </div> */}

              {/* {
                ["ZL"].includes(doc?.nr?.mode) &&
                <div className="DocName DocCell radius overflow flex start" style={colorStyles()} onClick={CLOSE}>
                  <img className="ImgBtn IcoColor flex" src={carIco} alt="SVG" />
                  <span>{carName}</span>
                </div>
              } */}

              {/* {
                ["PZ","PS","FZ","ZU","VA"].includes(doc?.nr?.mode) &&
                <div className="DocClientName DocCell flex start" style={cellStyles()} onClick={EDIT_DOC}>
                  <span>{sellerName}</span>
                </div>
              } */}

              {/* {
                ["FS"].includes(doc?.nr?.mode)  &&
                <div className="DocClientName DocCell flex start" style={cellStyles()} onClick={EDIT_DOC}>
                  <span>{clientName}</span>
                </div>
              } */}

              {/* {
                ["ZL"].includes(doc?.nr?.mode) &&
                <div className="DocCarName DocCell flex start" style={cellStyles()} onClick={EDIT_DOC}>
                  <img className="ImgBtn IcoColor flex" src={carIco} alt="SVG" />
                  <span>{carName}</span>
                </div>
              } */}
        
              {/* {
                ["PZ","PS","FZ","ZU","VA"].includes(doc?.nr?.mode) &&
                <div className="DocNIP DocCell flex start" style={cellStyles()}>
                  <span>{nip}</span>
                </div>
              } */}

              {/* {
                ["FS"].includes(doc?.nr?.mode) &&
                <div className="DocNIP DocCell flex start" style={cellStyles()}>
                  <span>{nipFS}</span>
                </div>
              } */}

              {/* {
                ["ZL"].includes(doc?.nr?.mode) &&
                <a href={`tel: ${client}`} className="DocClient DocCell flex start" style={cellStyles()} target="_blank" rel="noreferrer">
                  <span>{client}</span>
                </a>
              } */}

            </div>
          </div>

          <div className="CalendarLineRightSide flex">
            <div className="DocBefore flex" style={docStyles()?.beforeStyles}></div>
            <div className="DocumentBody radius flex">

              <div className="DocWidth DocCell radius overflow flex end" style={colorStyles()} onClick={CLOSE}>
                <div className="StatusLine flex" style={statusColor()}></div>
                { repairStatus && <img className="RepairBtn flex" src={checkImg} alt="check" /> }
              </div>

            </div>
            <div className="DocAfter flex" style={docStyles()?.afterStyles}></div>
          </div>

        </React.Fragment>
      }

      { active && <DocumentEditArea props={{doc, company, SAVE, CLOSE}} /> }

    </div>
  )
}
