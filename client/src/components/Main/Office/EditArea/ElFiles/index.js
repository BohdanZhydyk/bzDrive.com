import React from "react"

import { tr } from "../../../../../AppTranslate"
import { bzBytesCalc, bzDeleteFile, PostToApi } from "../../../../../AppFunctions"
import { UploadFile } from "../../../../All/UploadFile"

import "./ElFiles.scss"
import ActionBtn from "../../../../All/ActionBtn"

function ElFiles({ props:{doc, user, nr, files, setFiles} }){
  
  const FileTypeToIco = (type)=>{
    switch(type){
      case "text/plain":                return {type:"txt", ico:"https://bzdrive.com/files/ico/fileTXT.png"}
      case "application/octet-stream":  return {type:"bin", ico:"https://bzdrive.com/files/ico/fileBIN.png"}
      case "image/png":                 return {type:"png", ico:"https://bzdrive.com/files/ico/filePNG.png"}
      case "application/pdf":           return {type:"pdf", ico:"https://bzdrive.com/files/ico/filePDF.png"}
      default:                          return {type:"def", ico:"https://bzdrive.com/files/ico/fileDEF.png"}
    }
  }

  const YYYY = nr?.from.toString().slice(0, 4)
  const MM = nr?.from.toString().slice(4, 6)
  const DD = nr?.from.toString().slice(6, 8)
  const sign = nr?.sign.toString().padStart(4, '0')
  const fileAddr = `files/DOC/${nr?.mode}_${YYYY}_${MM}_${DD}_${sign}`

  const DELETE_FILE = (file)=>{
    const fileID = file?.fileID
    const fileAddr = file?.fileAddr
    const fileName = file?.fileName
    bzDeleteFile(fileAddr, fileName, (data)=>{
      data?.data?.message && console.log(data?.data?.message)
      if(data?.status === 200){
        const query = {
          updateDocFiles:true,
          doc:{ ...doc, files:files.filter( F=> F?.fileID !== fileID ) }
        }
        PostToApi( '/getOffice', query, (data)=> data?.files && setFiles(data.files) )
      }
    })
  }

  const ADD_FILE = (data)=>{
    const file = {
      fileID:Date.now(),
      fileAddr,
      fileName:data.name,
      fileSize:data.size,
      fileType:data.mimetype
    }
    const query = {
      updateDocFiles:true,
      doc:{ ...doc, files:[...files, file] }
    }
    PostToApi( '/getOffice', query, (data)=> data?.files && setFiles(data.files) )
  }

  const fileProps = {
    btnTxt:tr(`AddFileArea`,user.lang),
    fileAddr,
    callback: (data)=>ADD_FILE(data)
  }

  return(
    <div className="ElFiles flex column">

      <div className="ElFilesTop bold flex start">{tr(`FilesTop`,user.lang)}</div>

      {
        files && files.map( (file, f)=>{

          const key = `FileLine${f}${file?.fileID}`
          const href = `https://bzdrive.com/${file.fileAddr}${file.fileName}`
          const src = FileTypeToIco(file?.fileType)?.ico
          const alt = FileTypeToIco(file?.fileType)?.type
          const num = bzBytesCalc(file?.fileSize)?.num
          const unit = bzBytesCalc(file?.fileSize)?.unit
          const downloadPropses = {name:"download", click:()=>{}}
          const deletePropses = {name:"delete", click:()=>DELETE_FILE(file)}

          return(
            <div className="FileLine flex" key={key}>

              <a className="FileName FileCell flex start" href={href} target="_blank" rel="noreferrer" >
                <img className="ImgBtn" src={src} alt={alt} />
                <span>{file?.fileName}</span>
              </a>

              <div className="FileSize FileCell flex end">
                <span className="num flex end">{num}</span>
                <span className="unit flex end">{unit}</span>
              </div>

              <span className="FileAct FileCell flex end">

                <a className="flex" href={href} download={file?.fileName} target="_blank" rel="noreferrer" >
                  <ActionBtn props={downloadPropses} />
                </a>

                <ActionBtn props={deletePropses} />

              </span>

            </div>
          )
          
        })
      }

      <div className="UploadNewFile flex">
        <UploadFile props={fileProps} />
      </div>

    </div>
  )
}

export default ElFiles