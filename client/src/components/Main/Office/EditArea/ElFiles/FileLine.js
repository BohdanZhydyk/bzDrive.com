import React, { useState } from "react"

import { bzBytesCalc } from "../../../../../AppFunctions"
import ActionBtn from "../../../../All/ActionBtn"

export function FileLine({ props: { file, f, files, setFiles, setSave, printMode, DELETE_FILE } }) {

  const [more, setMore] = useState(false)
  const [del, setDel] = useState(false)

  const FileTypeToIco = (type)=> {
    const link = `https://bzdrive.com/files/ico/file`
    switch (type) {
      case "text/plain":                return { type: "txt", ico: `${link}TXT.png` }
      case "application/octet-stream":  return { type: "bin", ico: `${link}BIN.png` }
      case "image/png":                 return { type: "png", ico: `${link}PNG.png` }
      case "image/jpeg":                return { type: "png", ico: `${link}PNG.png` }
      case "application/pdf":           return { type: "pdf", ico: `${link}PDF.png` }
      case "lnk":                       return { type: "lnk", ico: `${link}LNK.png` }
      default:                          return { type: "def", ico: `${link}DEF.png` }
    }
  }

  const moveFile = (from, to)=> {
    setSave(true)
    setFiles(prev => {
      const itemToMove = prev[from]
      const remainingItems = prev.filter((_, index)=> index !== from)
      const before = [...remainingItems.slice(0, to)]
      const after = [...remainingItems.slice(to)]
      return [...before, itemToMove, ...after]
    })
  }

  const morePropses = { name:"more", click: ()=> { setDel(false); setMore(!more) } }
  const downloadPropses = { name:"download", click: ()=> setMore(!more) }
  const deletePropses = { name:"delete", click: ()=> setDel(true) }
  const cancelPropses = { name:"cancel", click: ()=> setDel(false) }
  const checkPropses = { name:"check", click: ()=> DELETE_FILE(file) }

  const isLink = file?.fileType === "lnk"
  const domain = `https://bzdrive.com/`
  const href = isLink ? file?.fileAddr : `${domain}${file?.fileAddr}/${file?.fileName}`
  const hostName = isLink ? ` / ${new URL(href).hostname}` : ``

  const src = FileTypeToIco(file?.fileType)?.ico
  const alt = FileTypeToIco(file?.fileType)?.type
  const num = bzBytesCalc(file?.fileSize)?.num
  const unit = bzBytesCalc(file?.fileSize)?.unit

  const handleDragStart = (e)=> {
    e.dataTransfer.setData('text/plain', f)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e)=> {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e)=> {
    e.preventDefault()
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'), 10)
    const toIndex = f
    if (fromIndex !== toIndex) { moveFile(fromIndex, toIndex) }
  }

  return (
    <div className="FileLine flex start" draggable={!printMode} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop}>
      
      <img className="ImgBtn" src={src} alt={alt} />

      <a className="FileName flex start overflow" href={href} target="_blank" rel="noreferrer">
        {`${file?.fileName}${hostName}`}
      </a>

      <span className="FileAct flex end">

        {!more && (
          <div className="FileSize flex end">
            {!isLink && <span className="num flex end">{num}</span>}
            {!isLink && <span className="unit flex end">{unit}</span>}
          </div>
        )}

        {!printMode && more && del && <ActionBtn props={checkPropses} />}

        {!printMode && more && del && <ActionBtn props={cancelPropses} />}

        {!printMode && more && !del && !isLink && (
          <a className="flex" href={href} download={file?.fileName} target="_blank" rel="noreferrer">
            <ActionBtn props={downloadPropses} />
          </a>
        )}

        {!printMode && more && !del && <ActionBtn props={deletePropses} />}

        {!printMode && <ActionBtn props={morePropses} />}

      </span>

    </div>
  )
}