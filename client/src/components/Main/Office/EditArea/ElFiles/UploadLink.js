import React from "react"

import InputText from "../../../../All/InputText"
import { sanitizeTxt } from "../../../../../AppFunctions"


export function UploadLink({ props:{ tr, lang, link, setLink, err, setErr, CANCEL_LINK, ADD_LINK } }){
  
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
    <div className="UploadLink flex end">

      <div className="FileNameInput">
        <InputText props={fileNameProps} />
      </div>

      <div className="FileAddrInput">
        <InputText props={fileAddrProps} />
      </div>

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

    </div>
  )
  
}