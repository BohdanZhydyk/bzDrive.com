import React, { useState } from "react"

import { bzBytesCalc } from "../../../../../AppFunctions"
import ActionBtn from "../../../../All/ActionBtn"


export function FileLine({ props:{file, f, files, setFiles, setSave, printMode, DELETE_FILE} }){

  const [more, setMore] = useState(false)
  const [del, setDel] = useState(false)
  
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

  function moveFile(from, to){
    setSave(true)
    setFiles( prev=>{
      const itemToMove = prev[from]
      const remainingItems = prev.filter((_, index) => index !== from)
      const before = [...remainingItems.slice(0, to)]
      const after = [...remainingItems.slice(to)]
      return [ ...before, itemToMove, ...after ]
    })
  }

  const morePropses = {
    name:"more",
    click:()=>{
      setDel(prev=>false)
      setMore(prev=>!prev)
    }
  }
  const upPropses = {name:"up", click:()=>moveFile(f, f-1)}
  const downPropses = {name:"down", click:()=>moveFile(f, f+1)}
  const downloadPropses = {name:"download", click:()=>setMore(prev=>!prev)}
  const deletePropses = {name:"delete", click:()=>setDel(prev=>true)}
  const cancelPropses = {name:"cancel", click:()=>setDel(prev=>false)}
  const checkPropses = {name:"check", click:()=>DELETE_FILE(file)}

  const isLink = file?.fileType === "lnk"
  const domain = `https://bzdrive.com/`
  const href = isLink ? file?.fileAddr : `${domain}${file?.fileAddr}/${file?.fileName}`

  const hostName = isLink ? ` / ${new URL(href).hostname}` : ``

  const src = FileTypeToIco(file?.fileType)?.ico
  const alt = FileTypeToIco(file?.fileType)?.type
  const num = bzBytesCalc(file?.fileSize)?.num
  const unit = bzBytesCalc(file?.fileSize)?.unit

  const notFirst = f > 0
  const notLast = f !== (files.length - 1)

  return(

    <div className="FileLine flex">

      <img className="ImgBtn" src={src} alt={alt} />

      <a className="FileName flex start overflow" href={href} target="_blank" rel="noreferrer" >
        {`${file?.fileName}${hostName}`}
      </a>

      {
        !printMode &&
        <span className="FileAct flex end">

          {
            !more &&
            <div className="FileSize flex end">
              { !isLink && <span className="num flex end">{num}</span> }
              { !isLink && <span className="unit flex end">{unit}</span> }
            </div>
          }

          { (more && !del && notFirst) && <ActionBtn props={upPropses} /> }
          { (more && !del && notLast) && <ActionBtn props={downPropses} /> }

          { (more && del) && <ActionBtn props={checkPropses} /> }
          { (more && del) && <ActionBtn props={cancelPropses} /> }

          {
            (more && !del && !isLink) &&
            <a className="flex" href={href} download={file?.fileName} target="_blank" rel="noreferrer" >
              <ActionBtn props={downloadPropses} />
            </a>
          }

          { (more && !del) && <ActionBtn props={deletePropses} /> }

          <ActionBtn props={morePropses} />

        </span>
      }

    </div>
  )
}