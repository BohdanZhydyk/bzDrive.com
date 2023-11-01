import React from "react"

import "./ElFiles.scss"
import { tr } from "../../../../../AppTranslate"
import { bzBytesCalc, bzDeleteFile, PostToApi } from "../../../../../AppFunctions"
import ActionBtn from "../../../../All/ActionBtn"
import { UploadBtns } from "./UploadBtns"

function ElFiles({ props:{user, doc, nr, setSave, files, setFiles, printMode} }){

  const lang = user?.lang
  
  const FileTypeToIco = (type)=>{
    const link = `https://bzdrive.com/files/ico/file`
    switch(type){
      case "text/plain":                return {type:"txt", ico:`${link}TXT.png`}
      case "application/octet-stream":  return {type:"bin", ico:`${link}BIN.png`}
      case "image/png":                 return {type:"png", ico:`${link}PNG.png`}
      case "image/jpeg":                return {type:"png", ico:`${link}PNG.png`}
      case "application/pdf":           return {type:"pdf", ico:`${link}PDF.png`}
      case "lnk":                       return {type:"lnk", ico:`${link}LNK.png`}
      default:                          return {type:"def", ico:`${link}DEF.png`}
    }
  }

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
        PostToApi( '/getOffice', query, (data)=>{
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
    PostToApi( '/getOffice', query, (data)=>{
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

          const isLink = file?.fileType === "lnk"
          const domain = `https://bzdrive.com/`
          const href = isLink ? file?.fileAddr : `${domain}${file?.fileAddr}/${file?.fileName}`

          const hostName = isLink ? ` / ${new URL(href).hostname}` : ``

          const src = FileTypeToIco(file?.fileType)?.ico
          const alt = FileTypeToIco(file?.fileType)?.type
          const num = bzBytesCalc(file?.fileSize)?.num
          const unit = bzBytesCalc(file?.fileSize)?.unit
          const downloadPropses = {name:"download", click:()=>{}}
          const deletePropses = {name:"delete", click:()=>DELETE_FILE(file)}

          return(
            <div className="FileLine flex" key={key}>

              <img className="ImgBtn" src={src} alt={alt} />

              <a className="FileName flex start overflow" href={href} target="_blank" rel="noreferrer" >
                {`${file?.fileName}${hostName}`}
              </a>

              <div className="FileSize flex end">
                { !isLink && <span className="num flex end">{num}</span> }
                { !isLink && <span className="unit flex end">{unit}</span> }
              </div>

              {
                !printMode &&
                <span className="FileAct flex end">

                  {
                    !isLink &&
                    <a className="flex" href={href} download={file?.fileName} target="_blank" rel="noreferrer" >
                      <ActionBtn props={downloadPropses} />
                    </a>
                  }

                  <ActionBtn props={deletePropses} />

                </span>
              }

            </div>
          )
          
        })
      }

      <UploadBtns props={{tr, formNr, lang, fileAddr, setSave, setFiles, ADD_FILE}} />

    </div>
  )
}

export default ElFiles