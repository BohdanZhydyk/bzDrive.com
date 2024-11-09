import React, { useState, useRef } from 'react'

import './FileUpload.scss'
import { bzUploadFile, sanitizeTxt } from './../../../AppFunctions'
import ActionBtn from './../ActionBtn'

function FileUpload({ props: { defaultFileAddr, defaultFileName, allowedMimeTypes = [], cb } }) {

  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState(defaultFileName ?? "")
  const [fileAddr, setFileAddr] = useState(defaultFileAddr ?? "")
  const [fileErr, setFileErr] = useState(false)
  
  const fileInputRef = useRef(null)

  function CHANGE_FILE(event) {
    const selectedFile = event.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setFileName(defaultFileName ?? selectedFile.name)
    }
  }

  function CHANGE_FILENAME(event) { setFileName(sanitizeTxt(event.target.value, `fileName`).sanText) }

  function UPLOAD_FILE() {
    if (file && fileName) {
      bzUploadFile(file, fileAddr, fileName, (res) => {
        if (res?.data?.size) {
          cb(res)
          setFile(null)
          setFileName("")
        }
        else {
          setFileErr('File upload failed! Please try again!')
          setFile(null)
          setFileName("")
        }
      })
    }
    else {
      if (!file) { setFileErr('No file selected! Please choose a file to upload!') }
      else if (!fileName) { setFileErr('File name is missing! Please enter a file name before uploading!') }
      setFile(null)
      setFileName("")
    }
  }

  function START_UPLOAD_FILE() {
    fileInputRef.current.value = null
    fileInputRef.current.click()
  }

  function CANCEL() {
    setFile(null)
    setFileName("")
    fileInputRef.current.value = null
  }

  return (
    <span className="FileUpload flex end">

      <input className="FileInputHidden" type="file" ref={fileInputRef} onChange={CHANGE_FILE} accept={allowedMimeTypes.join(',')} />

      { fileErr && <div className="FileError txtOrg flex start">{fileErr}</div> }

      { file && <input className="FileNameInput flex" type="text" value={fileName} onChange={CHANGE_FILENAME} /> }

      { file && <ActionBtn props={{ name: `upload`, click:UPLOAD_FILE }} /> }

      {
        !file
        ? <ActionBtn props={{ name: `upload`, click:START_UPLOAD_FILE }} />
        : <ActionBtn props={{ name: `cancel`, click:CANCEL }} />
      }

    </span>
  )
}

export default FileUpload