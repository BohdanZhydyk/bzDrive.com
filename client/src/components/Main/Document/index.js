import React, { useState, useEffect, useRef } from "react"
import { useReactToPrint } from 'react-to-print'

import "./Document.scss"
import { PostToApi } from "../../../AppFunctions"
import ActionBtn from "../../All/ActionBtn"
import EditArea from "../Office/EditArea"


function Document(){

  const currentPath = window.location.pathname.split("/")
  const docID = currentPath[currentPath.length - 1]

  const [doc, setDoc] = useState(false)

  const printMode = true
  const mode = doc?.nr?.mode
  const year = doc?.nr?.from.toString().slice(0, 4)
  const month = doc?.nr?.from.toString().slice(4, 6)
  const sign = doc?.nr?.sign.toString().padStart(4, '0')
  const title = doc?.nr ? `bzDrive/${mode}/${year}/${month}/${sign}` : ''

  document.title = title

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: title
  })

  const [edit, setEdit] = useState(false)

  const SAVE_DOC = ()=>{}

  const query = {getDocument:true, docID}
  useEffect( ()=>{ !doc && PostToApi( '/getOffice', query, (data)=> setDoc(data) ) }, [])

  return(
    <div className="Document flex column start" ref={componentRef} >

      <div className="PrintBtn flex end">
        <ActionBtn props={{ name:'print', click:()=>handlePrint() }} />
      </div>
      

      {doc && <EditArea props={{mode, doc, edit, setEdit, SAVE_DOC, printMode}} /> }

    </div>
  )
}

export default Document