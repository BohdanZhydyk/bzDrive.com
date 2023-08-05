import React, { useState } from 'react'

import "./UploadFile.scss"
import { tr } from '../../../AppTranslate'
import { GetUser } from '../../../AppFunctions'
import { bzUploadFile } from '../../../AppFunctions'


const UploadFile = ({ props:{btnTxt, fileAddr, accept, multiple, callback} })=>{

  const lang = GetUser().lang

  const [file, setFile] = useState(false)
  const [fileName, setFileName] = useState(false)

  const [err, setErr] = useState(false)

  const [submitAct, setSubmitAct] = useState(true)

  const CHANGE = (e)=>{
    setFile(prev=>e.target.files[0])
    setFileName(prev=>e.target.files[0].name)
  }

  const NAME_CHANGE = (e)=> setFileName(prev=>e.target.value)

  const CLEAR = ()=>{
    setFile(prev=>false)
    setFileName(prev=>false)
    setErr(prev=>false)
    setSubmitAct(prev=>true)
  }

  const UPLOADED = (data)=>{
    CLEAR()
    callback(data)
  }
  
  const SUBMIT = (e)=>{

    e.preventDefault()

    setSubmitAct(prev=>false)

    bzUploadFile(file, fileAddr, fileName, (res)=>{
      res.status === 200
      ? UPLOADED(res.data) //res.data = {name, size, mimetype}
      : setErr(prev=>res.data.message)
    })

  }

  return(
    <form className="UploadFile flex column" onSubmit={SUBMIT}>

      <label htmlFor="InputTag" className="InputTag flex wrap">

        {
          !fileName
          ? <span>{ btnTxt ?? tr("AddFileArea",lang) }</span>
          : <input className="FileName flex" type="text" value={fileName} onChange={NAME_CHANGE} />
        }

        <input
          id="InputTag"
          type="file"
          style={{display:"none"}}
          onChange={CHANGE}
          accept={accept ?? undefined} // image/png, image/jpg, image/gif, image/jpeg
          multiple={multiple}
        />

      </label>

      { err && <div>{`error`}</div> }

      {
        file?.name &&
        <div className="UplBtns flex">
          <input className="UplBtn BtnRed flex" type="button" value={tr("ImgBtn_cancel",lang)} onClick={CLEAR} />
          {
            submitAct &&
            <input className="UplBtn BtnGrn flex" type="submit" value={tr("ImgBtn_upload",lang)} />
          }
        </div>
      }

    </form>
  )
}

export default UploadFile