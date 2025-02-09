import React from "react"

import "./RightPannel.scss"
import { YYYYMMDD_ToWeekDay } from "../../../../AppFunctions"
import DownloadBar from "../../../All/DownloadBar"


export function RightPannel({ props:{doc, color, checkImg, carIco, title, line, repairStatus, cellStyles, EDIT_DOC} }) {

  function docStyles(){

    let from = YYYYMMDD_ToWeekDay(doc?.nr?.from)
    let to = YYYYMMDD_ToWeekDay(doc?.nr?.to)

    const firstDay = line?.week[0]
    const lastDay = line?.week[line?.week?.length - 1]
  
    if( (doc?.nr?.from <= firstDay) ){ from = 1 }
    if( (doc?.nr?.to >= lastDay) ){ to = 7 }
  
    const beforeDocLength = (from > 1) ? from - 1 : 0
    const docLength = to - from + 1
    const afterLength = 7 - beforeDocLength - docLength

    return {
      beforeStyles: {width:`calc(100% / 7 * ${beforeDocLength})`},
      docBodyStyles: {
        ...cellStyles(),
        width: `calc(100% / 7 * ${docLength} - 2px)`
      },
      afterStyles: {width:`calc(100% / 7 * ${afterLength})`}
    }

  }

  const isZLmode = doc?.nr?.mode === "ZL"

  return(
    <div className="RightPannel flex wrap">

      {
        doc?.downloadStatus &&
        <div className="DownLoadBar flex">
          <DownloadBar props={{color}} />
        </div>
      }

      <div className="DocRight flex start stretch">

        <span className="DocBefore flex" style={docStyles()?.beforeStyles}></span>

          <div className="DocBody flex end" style={docStyles()?.docBodyStyles} title={title()} onClick={EDIT_DOC}>
            { isZLmode && <img className="ImgBtn IcoColor flex" src={carIco} alt="SVG" /> }
            { repairStatus && <img className="RepairBtn flex" src={checkImg} alt="check" /> }
            <div className={`StatusLine StatusLineColor_${doc?.status} flex`}></div>
          </div>

        <span className="DocAfter flex" style={docStyles()?.afterStyles}></span>

      </div>

    </div>
  )
}