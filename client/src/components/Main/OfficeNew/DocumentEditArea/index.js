import React, { useState } from "react"

import './DocumentEditArea.scss'
import { getRandomColor, GetUser } from "../../../../AppFunctions"
import { tr } from "../../../../AppTranslate"
import { DocumentEditAreaReducer } from "./DocumentEditAreaLogic"
import ElDocBtns from "./ElDocBtns"
import ElDocName from "./ElDocName"
import ElInfo from "./ElInfo"
import { ElTasks } from "./ElTasks"
import ElCalculator from "./ElCalculator"
import ElSummary from "./ElSummary"
import { ElComments } from "./ElComments"
// import { ElSignatures } from "./ElSignatures"
// import ElFiles from "./ElFiles"
// import ElSoft from "./ElSoft"


function DocumentEditArea({ props:{doc, company, SAVE, CLOSE} }) {

  const printMode = false

  const user = GetUser()
  const lang = user.lang

  // const [editErr, setEditErr]         = useState( {} )

  const businessType = doc?.businessType ?? company?.businessType ?? ""

  const [save, setSave]               = useState( false )
  const [id, setId]                   = useState( doc?._id )
  const [status, setStatus]           = useState( doc?.status ?? "open" )
  const [nr, setNr]                   = useState( {...doc?.nr, color:doc?.nr?.color ?? getRandomColor(), place:doc?.nr?.place ?? company?.addr?.town ?? "" } )
  const [docUser, setDocUser]         = useState( doc?.user ?? user?.login ?? `User_${company?._id}` )
  const [docCompany, setDocCompany]   = useState( doc?.company ?? company?.shortName )
  const [dealer, setDealer]           = useState( doc?.dealer )
  const [car, setCar]                 = useState( doc?.car )
  const [client, setClient]           = useState( doc?.client )
  const [location, setLocation]       = useState( doc?.location )
  const [buyer, setBuyer]             = useState( doc?.buyer )
  const [seller, setSeller]           = useState( doc?.seller )
  const [tasks, setTasks]             = useState( doc?.tasks )
  const [articles, setArticles]       = useState( doc?.articles ?? [] )
  const [comments, setComments]       = useState( doc?.comments )
  const [files, setFiles]             = useState( doc?.files )
  const [soft, setSoft]               = useState( doc?.soft )

  const mode = doc?.nr?.mode

  const isSave = save || !doc?.nr?.sign
  const isSameUser = doc?.user === user.login

  function Reducer(action){
    DocumentEditAreaReducer({
      action, save, setSave, id, setId, status, setStatus, nr, setNr, docUser, setDocUser,
      docCompany, setDocCompany, dealer, setDealer, car, setCar, client, setClient,
      location, setLocation, buyer, setBuyer, seller, setSeller, tasks, setTasks,
      articles, setArticles, comments, setComments, files, setFiles, soft, setSoft,
      SAVE, CLOSE
    })
  }

  const ElDocBtnsProps = {tr, lang, isSave, isSameUser, mode, id, status, nr, Reducer}
  const ElDocNameProps = {tr, lang, mode, dealer, nr, setNr, setSave}
  const ElInfoProps = {tr, lang, mode, businessType, dealer, setDealer, car, setCar, client, setClient, location, setLocation, buyer, setBuyer, seller, setSeller, setSave}
  const ElTasksProps = {tr, lang, tasks, setTasks, setSave}
  const ElCalculatorProps = {tr, lang, mode, articles, setArticles, setSave}
  const ElSummaryProps = {nr, setNr, setSave, articles}
  const ElCommentsProps = {tr, lang, car, setCar, setSave}
  // const ElFilesProps = {user, doc, nr, setSave, files, setFiles, printMode}
  // const ElSoftProps = {user, nr, car, setCar, soft, setSoft, setSave, printMode}
  // const ElSignaturesProps = {user}

  const isTasks = ["ZL"].includes(mode)
  const isSummary = ["FS","FZ","PS","PZ","ZU","VA"].includes(mode)
  const isElComments = ["FS", "FZ"].includes(mode) && (!printMode || comments)
  // const isElFiles = ((printMode && files?.length > 0) || (!printMode && (["ZL","PS","PZ","FZ"].includes(mode) && nr?.sign !== "")))
  // const isElSoft = ((printMode && soft?.length > 0) || (!printMode && (["ZL"].includes(mode) && nr?.sign !== "")))

  // console.log("document", doc)

  return(
    <div className="DocumentEditArea radius flex column start">

      <ElDocBtns props={ElDocBtnsProps}/>

      <ElDocName props={ElDocNameProps}/>

      <ElInfo props={ElInfoProps}/>

      { isTasks && <ElTasks props={ElTasksProps}/> }

      <ElCalculator props={ElCalculatorProps} />

      { isSummary && <ElSummary props={ElSummaryProps} /> }

      { isElComments && <ElComments props={ElCommentsProps}/> }

      {/* { isElFiles && <ElFiles props={ElFilesProps} /> } */}

      {/* { isElSoft && <ElSoft props={ElSoftProps} /> } */}

      {/* { printMode && <ElSignatures props={ElSignaturesProps}/> } */}

      <ElDocBtns props={ElDocBtnsProps}/>

    </div>
  )
}

export default DocumentEditArea