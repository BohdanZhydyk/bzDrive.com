import React, { useState } from "react"

import './EditArea.scss'
import { GetUser } from "../../../../AppFunctions"
import ElDocBtns from "./ElDocBtns"
import ElDocName from "./ElDocName"
import ElInfo from "./ElInfo"
import ElCalculator from "./ElCalculator"
import { ElFaults } from "./ElFaults"
import { ElComments } from "./ElComments"
import { ElSignatures } from "./ElSignatures"
import ElFiles from "./ElFiles"
import ElSummary from "./ElSummary"


function EditArea({ props:{company, mode, doc, edit, setEdit, printMode, SAVE_DOC} }) {

  const user = GetUser()

  const [save, setSave] = useState(false)

  const [editErr, setEditErr] = useState({})

  const [id, setId] = useState( doc?._id ?? false )

  const [docCompany, setDocCompany] = useState( company?.shortName ?? company?.id )

  const [docUser, setDocUser] = useState( doc?.user ?? user.login )

  const [status, setStatus] = useState(doc?.status ?? "open")

  const [nr, setNr] = useState( doc?.nr )

  const [car, setCar] = useState( doc?.car )

  const [client, setClient] = useState( doc?.client )

  const [dealer, setDealer] = useState( doc?.dealer ?? company )

  const [articles, setArticles] = useState( doc?.articles )

  const [files, setFiles] = useState( doc?.files ?? [] )

  function ACTION_BTN(act){
    const docData = {docCompany, docUser, status, nr, car, client, dealer, articles, files}
    switch (act) {
      case "save":    SAVE_DOC( id, docData );                   setEdit(!edit); break;
      case "delete":  SAVE_DOC( id, {...docData, status:act} );  setEdit(!edit); break;
      default: break;
    }
  }

  const ElDocBtnsProps = {user, mode, doc, save, setSave, edit, setEdit, status, setStatus, car, setCar, ACTION_BTN}
  const ElDocNameProps = {user, mode, dealer, nr, setNr, setSave, editErr, setEditErr, printMode}
  const ElInfoProps = {user, mode, car, setCar, client, setClient, dealer, setDealer, setSave, editErr, setEditErr}
  const ElFaultsProps = {user, car, setCar, setSave, printMode}
  const ElCalculatorProps = {user, articles, setArticles, setSave, printMode}
  const ElSummaryProps = {nr, setNr, setSave, articles, printMode}
  const ElCommentsProps = {user, car, setCar, setSave, printMode}
  const ElFilesProps = {doc, user, nr, setSave, files, setFiles}
  const ElSignaturesProps = {user}

  return(
    <div className="EditArea flex column start">

      { !printMode && <ElDocBtns props={ElDocBtnsProps}/> }

      <ElDocName props={ElDocNameProps}/>

      <ElInfo props={ElInfoProps}/>

      { ["ZL"].includes(mode) && <ElFaults props={ElFaultsProps}/> }

      <ElCalculator props={ElCalculatorProps} />

      { ["FS"].includes(mode) && <ElSummary props={ElSummaryProps} /> }

      { ["FS"].includes(mode) && <ElComments props={ElCommentsProps}/> }

      { ["ZL"].includes(mode) && !printMode && <ElFiles props={ElFilesProps} /> }

      { printMode && <ElSignatures props={ElSignaturesProps}/> }

      { !printMode && <ElDocBtns props={ElDocBtnsProps}/> }

    </div>
  )
}

export default EditArea