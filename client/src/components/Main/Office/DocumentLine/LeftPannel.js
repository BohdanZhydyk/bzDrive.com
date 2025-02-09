import React from "react"

import "./LeftPannel.scss"
import { DocNameNormalize, SumArray } from "../../../../AppFunctions"
import DownloadBar from "../../../All/DownloadBar"


export function LeftPannel({ props:{doc, color, checkImg, carIco, title, repairStatus, cellStyles, EDIT_DOC} }) {
  
  const number = doc?.nr?.assignNr ?? DocNameNormalize(doc?.nr)
  const carName = `${doc?.car?.brand} - ${doc?.car?.model}`
  const sellerName = doc?.seller?.name
  const clientName = doc?.client?.name
  const nipFS = doc?.client?.nip
  const nip = doc?.seller?.nip
  const client = doc?.client?.name?.length ? doc?.client?.name : (doc?.client?.contacts?.tel ?? ``)
  const status = doc?.status
  
  const sum = SumArray( doc?.articles?.map( (el)=> el.SUM ) )

  return(
    <div className="LeftPannel flex wrap">

      {
        doc?.downloadStatus &&
        <div className="DownLoadBar flex">
          <DownloadBar props={{color}} />
        </div>
      }

      <div className="DocLeft flex start stretch" title={title()}>
        
        {/* <div className="DocAva DocCell flex start" style={cellStyles()}>
          <img className="ImgBtn flex" src={checkImg} alt="check" />
        </div> */}

        <div className="DocNr DocCell flex start" style={cellStyles()} onClick={EDIT_DOC}>
          <span>{number}</span>
          { repairStatus && <img className="RepairBtn flex" src={checkImg} alt="check" /> }
        </div>

        {
          ["PZ","PS","FZ","ZU","VA"].includes(doc?.nr?.mode) &&
          <div className="DocClientName DocCell flex start" style={cellStyles()} onClick={EDIT_DOC}>
            <span>{sellerName}</span>
          </div>
        }

        {
          ["FS"].includes(doc?.nr?.mode)  &&
          <div className="DocClientName DocCell flex start" style={cellStyles()} onClick={EDIT_DOC}>
            <span>{clientName}</span>
          </div>
        }

        {
          ["ZL"].includes(doc?.nr?.mode) &&
          <div className="DocCarName DocCell flex start" style={cellStyles()} onClick={EDIT_DOC}>
            <img className="ImgBtn IcoColor flex" src={carIco} alt="SVG" />
            <span>{carName}</span>
          </div>
        }
        
        {
          ["PZ","PS","FZ","ZU","VA"].includes(doc?.nr?.mode) &&
          <div className="DocNIP DocCell flex start" style={cellStyles()}>
            <span>{nip}</span>
          </div>
        }

        {
          ["FS"].includes(doc?.nr?.mode) &&
          <div className="DocNIP DocCell flex start" style={cellStyles()}>
            <span>{nipFS}</span>
          </div>
        }

        {
          ["ZL"].includes(doc?.nr?.mode) &&
          <a href={`tel: ${client}`} className="DocClient DocCell flex start" style={cellStyles()} target="_blank" rel="noreferrer">
            <span>{client}</span>
          </a>
        }

        <div className="DocSum DocCell flex end" style={cellStyles()} onClick={EDIT_DOC}>
          <span>{sum}</span>
          <div className={`StatusLine StatusLineColor_${status} flex`}></div>
        </div>

      </div>

    </div>
  )
}