import React from "react"

import Input from "../../../../All/Input"
import { sanitizeTxt } from "../../../../../AppFunctions"


export function UploadLink({ props:{
  tr, lang, link, setLink, err, setErr, opened, OPEN_AREA, CANCEL_LINK, ADD_LINK
} }){
  
  const isErr = !err || err?.fileAddr

  const fileNameProps = {
    legend: tr("FileNameLegend",lang),
    type: `text`,
    val: link?.fileName,
    cbVal: (val)=> setLink( (prev)=> ({...prev, fileName:val}) ),
    cbErr: ()=>{}
  }

  const fileAddrProps = {
    legend: tr("FileAddrLegend",lang),
    type: `text`,
    val: link?.fileAddr ? sanitizeTxt(link.fileAddr, `hostname`).sanText : '',
    err: err?.fileAddr,
    cbVal: (val)=> setLink( (prev)=> ({...prev, fileAddr:val}) ),
    cbErr: (val)=> setErr( (prev)=> ({...prev, fileAddr:sanitizeTxt(val, `hostname`).sanErr}))
  }

  return(
    <div className="UploadLink flex column">

      {
        !opened &&
        <div className="AddBtn flex" onClick={OPEN_AREA}>
          { tr("AddLinkArea",lang) }
        </div>
      }

      {
        opened &&
        <div className="UploadLinkInputs">
          <Input props={fileNameProps} />
          <Input props={fileAddrProps} />
        </div>
      }

      {
        opened &&
        <div className="UploadLinksBtns flex">

          <div className="UploadLinksBtn BtnRed flex" onClick={CANCEL_LINK}>
            {tr("ImgBtn_cancel",lang)}
          </div>

          {
            !isErr &&
            <div className="UploadLinksBtn BtnGrn flex" onClick={ADD_LINK}>
              { tr("ImgBtn_upload",lang) }
            </div>
          }

        </div>
      }

    </div>
  )
  
}