import React, { useState, useEffect, useRef } from "react"
import { useReactToPrint } from 'react-to-print'

import "./Document.scss"
import { PostToApi } from "../../../AppFunctions"
import ActionBtn from "../../All/ActionBtn"
import EditArea from "../Office/EditArea"


function Document(){

  const currentPath = window.location.pathname.split("/")
  const docID = currentPath[currentPath.length - 1]

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  })

  const [doc, setDoc] = useState(false)

  const printMode = true
  const mode = doc?.nr?.mode

  const [edit, setEdit] = useState(false)

  const SAVE_DOC = ()=>{}

  const query = {getDocument:true, docID}
  useEffect( ()=>{ !doc && PostToApi( '/getOffice', query, (data)=> setDoc(data) ) }, [])

  // console.log("doc", doc)

  return(
    <div className="Document flex column" ref={componentRef} >

      <div className="PrintBtn flex end">
        <ActionBtn props={{ name:'print', click:()=>handlePrint() }} />
      </div>
      

      {doc && <EditArea props={{mode, doc, edit, setEdit, printMode, SAVE_DOC}} /> }

    </div>
  )
}

export default Document