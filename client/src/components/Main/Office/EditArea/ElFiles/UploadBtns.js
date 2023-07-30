import React, { useState } from "react"

import { UploadFile } from "../../../../All/UploadFile"
import { UploadLink } from "./UploadLink"


export function UploadBtns({ props:{tr, lang, fileAddr, setSave, setFiles, ADD_FILE} }){

  const blankLink = ()=>({fileID: Date.now(), fileAddr: "", fileName: "", fileType: "lnk"})

  const [link, setLink] = useState( blankLink() )
  const [err, setErr] = useState(false)
  const [opened, setOpened] = useState(false)

  function OPEN_AREA(){ setOpened(prev=>true) }

  function ADD_LINK(){
    setFiles( prev=> [...prev, link] )
    setSave(prev=>true)
    setOpened(prev=>false)
    setErr(prev=>false)
    setLink( prev=>blankLink() )
  }

  function CANCEL_LINK(){
    setOpened(prev=>false)
    setErr(prev=>false)
    setLink( prev=>blankLink() )
  }

  const btnTxt = tr(`AddFileArea`,lang)
  const fileProps = {btnTxt, fileAddr, callback: (data)=>ADD_FILE(data)}
  const uploadLinkProps = {tr, lang, link, setLink, err, setErr, opened, OPEN_AREA, CANCEL_LINK, ADD_LINK}

  return(
    <div className="UploadBtns flex stretch">

      <UploadFile props={fileProps} />

      <UploadLink props={uploadLinkProps} />

    </div>
  )
  
}