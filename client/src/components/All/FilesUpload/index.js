import React, { useState, useRef } from 'react'

import './FilesUpload.scss'
import { bzUploadFiles, sanitizeTxt } from './../../../AppFunctions'
import ActionBtn from './../ActionBtn'

function FilesUpload({ props: { defaultFileAddr, defaultFileName, allowedMimeTypes = [], multiple, cb } }) {
  
  const [filesAddr, setFilesAddr] = useState(defaultFileAddr ?? "")
  const [files, setFiles] = useState([])
  const [filesErr, setFilesErr] = useState(false)
  
  const fileInputRef = useRef(null)

  function CHANGE_FILE(event) {
    const selectedFiles = Array.from(event.target.files || [])
    if (selectedFiles.length) {
      setFiles(selectedFiles.map(f => ({ file: f, name: sanitizeTxt((defaultFileName ?? f.name), "fileName")?.sanText })))
    }
  }

  function CHANGE_FILENAME(index, val) {
    setFiles(prev => prev.map((f, i) => i === index ? { ...f, name: sanitizeTxt(val, "fileName")?.sanText } : f))
  }

  function UPLOAD_FILES() {
    if (files) {
      bzUploadFiles(filesAddr, files, (res) => {
        res?.data[0]?.size ? cb(res?.data) : setFilesErr('Files upload failed! Please try again!')
        setFiles(prev=>[])
      })
    }
    else {
      setFilesErr('No files selected! Please choose a file to upload!')
      setFiles(prev=>[])
    }
  }

  function START_UPLOAD_FILE() {
    fileInputRef.current.value = null
    fileInputRef.current.click()
    setFilesErr(prev=>false)
  }

  function CANCEL() {
    setFiles([])
    fileInputRef.current.value = null
  }

  return (
    <span className="FilesUpload flex stretch end">

      <input
        className="FileInputHidden"
        type="file"
        ref={fileInputRef}
        onChange={CHANGE_FILE}
        accept={allowedMimeTypes.join(',')}
        multiple={multiple}
      />
      
      { filesErr && <div className="FileError txtOrg flex start">{filesErr}</div> }

      <div className="FileInputsWrapper flex column">
      {
        files.map((f, i) => (
          <input
            className="FileNameInput flex bold"
            type="text"
            value={f.name}
            onChange={e => CHANGE_FILENAME(i, e.target.value)}
            key={i}
          />
        ))
      }
      </div>

      {files.length > 0 && <ActionBtn props={{ name: `upload`, click: UPLOAD_FILES }} />}

      {
        !files.length
          ? <ActionBtn props={{ name: `upload`, click: START_UPLOAD_FILE }} />
          : <ActionBtn props={{ name: `cancel`, click: CANCEL }} />
      }

    </span>
  )
}

export default FilesUpload