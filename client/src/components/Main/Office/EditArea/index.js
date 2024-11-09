import React, { useState, useEffect } from "react"

import './EditArea.scss'
import { GetUser, getRandomColor } from "../../../../AppFunctions"
import ElDocBtns from "./ElDocBtns"
import ElDocName from "./ElDocName"
import ElInfo from "./ElInfo"
import ElCalculator from "./ElCalculator"
import { ElFaults } from "./ElFaults"
import { ElComments } from "./ElComments"
import { ElSignatures } from "./ElSignatures"
import ElFiles from "./ElFiles"
import ElSoft from "./ElSoft"
import ElSummary from "./ElSummary"


// function EditArea({ props:{company, mode, prog, doc, edit, setEdit, printMode, Reducer} }) {
function EditArea({ props:{company, l, doc, printMode, EDIT_DOC, Reducer} }) {

  // const printMode = false

  const mode = doc?.nr?.mode

  const user = GetUser()

  function setStates(el){
    return ({
      id:           el?._id ?? false,
      docCompany:   el?.company ?? company?.shortName ?? company?.id,
      docUser:      el?.user ?? user.login,
      status:       el?.status ?? "open",
      nr:           el?.nr,
      car:          {...el?.car, color:el?.car?.color ?? getRandomColor()},
      client:       el?.client,
      dealer:       el?.dealer,
      buyer:        el?.buyer,
      seller:       el?.seller,
      articles:     el?.articles,
      files:        el?.files,
      soft:         el?.soft
    })
  }

  const [save, setSave]               = useState( false )
  const [editErr, setEditErr]         = useState( {} )
  const [id, setId]                   = useState( setStates(doc)?.id )
  const [docCompany, setDocCompany]   = useState( setStates(doc)?.docCompany )
  const [docUser, setDocUser]         = useState( setStates(doc)?.docUser )
  const [status, setStatus]           = useState( setStates(doc)?.status )
  const [nr, setNr]                   = useState( setStates(doc)?.nr )
  const [car, setCar]                 = useState( setStates(doc)?.car )
  const [client, setClient]           = useState( setStates(doc)?.client )
  const [dealer, setDealer]           = useState( setStates(doc)?.dealer )
  const [buyer, setBuyer]             = useState( setStates(doc)?.buyer )
  const [seller, setSeller]           = useState( setStates(doc)?.seller )
  const [articles, setArticles]       = useState( setStates(doc)?.articles )
  const [files, setFiles]             = useState( setStates(doc)?.files )
  const [soft, setSoft]               = useState( setStates(doc)?.soft )

  function ACTION_BTN(act){
    function SAVE_DOC(id, docData){ Reducer({type:`SAVE_DOC`, docID:id, docData}) }
    const docData = {docCompany, docUser, status, nr, car, client, seller, dealer, articles, files, soft}
    switch (act) {
      case "save":    SAVE_DOC( id, docData );                   EDIT_DOC(); break;
      case "delete":  SAVE_DOC( id, {...docData, status:act} );  EDIT_DOC(); break;
      default: break;
    }
  }

  const ElDocBtnsProps = {user, mode, doc, save, setSave, EDIT_DOC, status, setStatus, car, setCar, ACTION_BTN}
  const ElDocNameProps = {user, mode, dealer, nr, setNr, setSave, editErr, setEditErr, printMode}
  const ElInfoProps = {user, mode, car, setCar, client, setClient, buyer, setBuyer, seller, setSeller, dealer, setDealer, setSave, editErr, setEditErr, printMode}
  const ElFaultsProps = {user, car, setCar, setSave, printMode}
  const ElCalculatorProps = {user, mode, articles, setArticles, setSave, printMode}
  const ElSummaryProps = {nr, setNr, setSave, articles, printMode}
  const ElCommentsProps = {user, car, setCar, setSave, printMode}
  const ElFilesProps = {user, doc, nr, setSave, files, setFiles, printMode}
  const ElSoftProps = {user, nr, car, setCar, soft, setSoft, save, setSave, printMode}
  const ElSignaturesProps = {user}

  const isFaults = ["ZL"].includes(mode)
  const isSummary = ["FS","FZ","PS","PZ","ZU"].includes(mode)
  const isElComments = ["FS", "FZ"].includes(mode) && (!printMode || car?.comments)
  const isElFiles = ((printMode && files?.length > 0) || (!printMode && (["ZL","PS","PZ","FZ"].includes(mode) && nr?.sign !== "")))
  const isElSoft = ((printMode && soft?.length > 0) || (!printMode && (["ZL"].includes(mode) && nr?.sign !== "")))
  
  useEffect( ()=>{
    setId( setStates(doc)?.id )
    setDocCompany( setStates(doc)?.docCompany )
    setDocUser( setStates(doc)?.docUser )
    setStatus( setStates(doc)?.status )
    setNr( setStates(doc)?.nr )
    setCar( setStates(doc)?.car )
    setClient( setStates(doc)?.client )
    setDealer( setStates(doc)?.dealer )
    setBuyer( setStates(doc)?.buyer )
    setSeller( setStates(doc)?.seller )
    setArticles( setStates(doc)?.articles )
    setFiles( setStates(doc)?.files )
    setSoft( setStates(doc)?.soft )
  }, [doc])

  return(
    <div className="EditArea Shadow flex column start">

      { !printMode && <ElDocBtns props={ElDocBtnsProps}/> }

      <ElDocName props={ElDocNameProps}/>

      <ElInfo props={ElInfoProps}/>

      { isFaults && <ElFaults props={ElFaultsProps}/> }

      <ElCalculator props={ElCalculatorProps} />

      { isSummary && <ElSummary props={ElSummaryProps} /> }

      { isElComments && <ElComments props={ElCommentsProps}/> }

      { isElFiles && <ElFiles props={ElFilesProps} /> }

      { isElSoft && <ElSoft props={ElSoftProps} /> }

      { printMode && <ElSignatures props={ElSignaturesProps}/> }

      { !printMode && <ElDocBtns props={ElDocBtnsProps}/> }

    </div>
  )
}

export default EditArea