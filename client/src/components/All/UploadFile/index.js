import React, { useState } from 'react'

import "./UploadFile.scss"
import { tr } from '../../../AppTranslate'
import { GetUser } from '../../../AppFunctions'
import { bzUploadFile } from '../../../AppFunctions'


export const UploadFile = ({ props:{btnTxt, fileAddr, accept, multiple, callback} })=>{

  const lang = GetUser().lang

  const [file, setFile] = useState(false)
  const [fileName, setFileName] = useState(false)

  const [err, setErr] = useState(false)

  const [submitAct, setSubmitAct] = useState(true)

  const CHANGE = (e)=>{
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name)
  }

  const NAME_CHANGE = (e)=> setFileName(e.target.value)

  const CLEAR = ()=>{
    setFile(false)
    setFileName(false)
    setSubmitAct(true)
  }

  const UPLOADED = (data)=>{
    CLEAR()
    callback(data)
  }
  
  const SUBMIT = (e)=>{

    e.preventDefault()

    setSubmitAct(false)

    bzUploadFile(file, fileAddr, fileName, (res)=>{
      res.status === 200
      ? UPLOADED(res.data) //res.data = {name, size, mimetype}
      : setErr(res.data.message)
    })

  }

  return(
    <form className="UploadFile flex column" onSubmit={SUBMIT}>

      <label htmlFor="InputTag" className="InputTag flex wrap">

        {
          !fileName
          ? <span>{ btnTxt ?? tr("UploadFileTitle",lang) }</span>
          : <input className="FileName flex" type="text" value={fileName} onChange={NAME_CHANGE} />
        }

        <input
          id="InputTag"
          type="file"
          style={{display:"none"}}
          onChange={CHANGE}
          accept={accept === false ? undefined : accept} // image/png, image/jpg, image/gif, image/jpeg
          multiple={multiple}
        />

      </label>

      { err && <div>error</div> }

      {
        file?.name &&
        <div className="UplBtns flex">
          <input className="UplBtn redBtn flex" type="button" value={tr("ImgBtn_cancel",lang)} onClick={CLEAR} />
          {
            submitAct
            ? <input className="UplBtn grnBtn flex" type="submit" value={tr("ImgBtn_upload",lang)} />
            : <div className="UplBtn grnBtn flex"></div>
          }
        </div>
      }

    </form>
  )
}