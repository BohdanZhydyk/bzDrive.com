import React, { useState } from "react"

import { UploadLink } from "./UploadLink"
import FileUpload from "../../../../All/FileUpload"
import ActionBtn from "../../../../All/ActionBtn"


export function UploadBtns({ props:{tr, lang, fileAddr, setSave, setFiles, ADD_FILE} }){

  const blankLink = ()=>({fileID: Date.now(), fileAddr: "", fileName: "", fileType: "lnk"})

  const [link, setLink] = useState( blankLink() )
  const [uplLink, setUplLink] = useState( false )
  const [err, setErr] = useState(false)

  function ADD_LINK(){
    setFiles( prev=> [...prev, link] )
    setSave(prev=>true)
    setErr(prev=>false)
    setLink( prev=>blankLink() )
    setUplLink(prev=>false)
  }

  function CANCEL_LINK(){
    setErr(prev=>false)
    setLink( prev=>blankLink() )
    setUplLink(prev=>false)
  }

  const fileProps = {defaultFileAddr:fileAddr, cb:(data)=>ADD_FILE(data)}
  const uploadLinkProps = {tr, lang, link, setLink, err, setErr, CANCEL_LINK, ADD_LINK}

  return(
    <div className="UploadBtns flex stretch end">

      <FileUpload props={fileProps} />

      {
        uplLink
        ? <UploadLink props={uploadLinkProps} />
        : <ActionBtn props={{ name: `link`, click:()=>setUplLink(prev=>true) }} />
      }

    </div>
  )
  
}