import React, { useState } from "react"

import "./ElFiles.scss"
import { tr } from "../../../../../AppTranslate"
import { bzDeleteFile, PostToApi } from "../../../../../AppFunctions"
import { UploadBtns } from "./UploadBtns"
import { FileLine } from "./FileLine"

function ElFiles({ props:{user, doc, nr, setSave, files, setFiles, printMode} }){

  const lang = user?.lang

  const YYYY = nr?.from.toString().slice(0, 4)
  const MM = nr?.from.toString().slice(4, 6)
  const sign = nr?.sign.toString().padStart(4, '0')
  const fileAddr = `files/DOC/${nr?.mode}_${YYYY}_${MM}_${sign}`
  const formNr = `${YYYY}_${MM}_${sign}`

  const DELETE_FILE = (file)=>{
    const fileID = file?.fileID
    const fileAddr = file?.fileAddr
    const fileName = file?.fileName
    bzDeleteFile(fileAddr, fileName, (deleteData)=>{
      deleteData?.data?.message && console.log(deleteData?.data?.message)
      if(deleteData?.status === 200){
        const query = {
          updateDocFiles:true,
          doc:{ ...doc, files:files.filter( F=> F?.fileID !== fileID ) }
        }
        PostToApi( '/getOfficeOld', query, (data)=>{
          setSave(true)
          data?.files && setFiles(data.files)
        })
      }
    })
  }

  const ADD_FILE = (data)=>{
    const file = {
      fileID: data?.fileID ?? Date.now(),
      fileAddr,
      fileName:data.name,
      fileSize:data.size,
      fileType:data.mimetype
    }
    const query = {
      updateDocFiles:true,
      doc:{ ...doc, files:[...files, file] }
    }
    PostToApi( '/getOfficeOld', query, (data)=>{
      setSave(true)
      data?.files && setFiles(data.files)
    })
  }

  // console.log(files)

  return(
    <div className="ElFiles flex column">

      <div className="ElFilesTop bold flex start">{tr(`FilesTop`,lang)}</div>

      {
        files && files.map( (file, f)=>{

          const key = `FileLine${f}${file?.fileID}`
          const fileLineProps = {file, f, files, setFiles, setSave, printMode, DELETE_FILE}

          return <FileLine props={fileLineProps} key={key} />

        })
      }

      {
        !printMode &&
        <UploadBtns props={{tr, formNr, lang, fileAddr, setSave, setFiles, ADD_FILE}} />
      }

    </div>
  )
}

export default ElFiles