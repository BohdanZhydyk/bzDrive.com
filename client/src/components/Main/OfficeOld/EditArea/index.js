import React, { useState, useEffect } from "react"
import { Element, scroller } from 'react-scroll'

import './EditArea.scss'
import { GetUser, PostToApi, getRandomColor, vwToPx } from "../../../../AppFunctions"
import ElDocBtns from "./ElDocBtns"
import ElDocName from "./ElDocName"
import ElInfo from "./ElInfo"
import ElCalculator from "./ElCalculator"
import { ElFaults } from "./ElFaults"
import { ElComments } from "./ElComments"
import { ElSignatures } from "./ElSignatures"
import ElFiles from "./ElFiles"
import ElSummary from "./ElSummary"
import DownloadBar from "../../../All/DownloadBar"


function EditArea({ props:{company, mode, prog, doc, edit, setEdit, printMode, Reducer} }) {

  const user = GetUser()

  const [save, setSave] = useState(false)
  const [editErr, setEditErr] = useState({})
  const [id, setId] = useState(false)
  const [docCompany, setDocCompany] = useState(false)
  const [docUser, setDocUser] = useState(false)
  const [status, setStatus] = useState(false)
  const [nr, setNr] = useState(false)
  const [car, setCar] = useState(false)
  const [client, setClient] = useState(false)
  const [dealer, setDealer] = useState(false)
  const [buyer, setBuyer] = useState(false)
  const [seller, setSeller] = useState(false)
  const [articles, setArticles] = useState(false)
  const [files, setFiles] = useState([])

  function ACTION_BTN(act){

    function SAVE_DOC(id, docData){
      const query = {saveDoc:true, id, docData}
      PostToApi( '/getOfficeOld', query, (data)=> Reducer({type:`SET_NEW_${prog}`, mode, doc:data}) )
    }

    const docData = {docCompany, docUser, status, nr, car, client, seller, dealer, articles, files}

    switch (act) {
      case "save":    SAVE_DOC( id, docData );                   setEdit(!edit); break;
      case "delete":  SAVE_DOC( id, {...docData, status:act} );  setEdit(!edit); break;
      default: break;
    }

  }

  const ElDocBtnsProps = {user, mode, doc, save, setSave, edit, setEdit, status, setStatus, car, setCar, ACTION_BTN}
  const ElDocNameProps = {user, mode, dealer, nr, setNr, setSave, editErr, setEditErr, printMode}
  const ElInfoProps = {user, mode, car, setCar, client, setClient, buyer, setBuyer, seller, setSeller, dealer, setDealer, setSave, editErr, setEditErr, printMode}
  const ElFaultsProps = {user, car, setCar, setSave, printMode}
  const ElCalculatorProps = {user, mode, articles, setArticles, setSave, printMode}
  const ElSummaryProps = {nr, setNr, setSave, articles, printMode}
  const ElCommentsProps = {user, car, setCar, setSave, printMode}
  const ElFilesProps = {user, doc, nr, setSave, files, setFiles, printMode}
  const ElSignaturesProps = {user}

  const isElDocBtns = !printMode
  const isElFiles = ["ZL","PS","PZ","ZU","FZ"].includes(mode) && nr?.sign !== ""
  const isElComments = ["FS","FZ"].includes(mode) && (printMode ? car?.comments : true)

  const scroolToDiv = ()=>{
    scroller.scrollTo('EditArea', {
      duration: 1000,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: vwToPx(-0.5)
    })
  }

  useEffect( ()=>{
    const query = {getDocument:true, mode, company, docID:doc?._id}
    !id && PostToApi( '/getOffice', query, (data)=>{
      setId( data?._id ?? false )
      setDocCompany( data?.company ?? company?.shortName ?? company?.id )
      setDocUser( data?.user ?? user.login )
      setStatus( data?.status ?? "open" )
      setNr( data?.nr ? {...doc?.nr, method:data?.nr?.method, mode:data?.nr?.mode, place:data?.nr?.place, sign:data?.nr?.sign} : doc?.nr )
      setCar( {...car, ...data?.car, color:data?.car?.color ?? getRandomColor()} )
      setClient( data?.client )
      setDealer( data?.dealer )
      setBuyer( data?.buyer )
      setSeller( data?.seller )
      setArticles( data?.articles )
      setFiles( data?.files ?? [] )

      scroolToDiv()
    })
  }, [])

  return(
    <React.Fragment>
      {
        !nr
        ?
        <Element className="EditArea flex column start">
          <DownloadBar props={{color:"#009900"}}/>
        </Element>
        :
        <Element className="EditArea Shadow flex column start">

          { isElDocBtns && <ElDocBtns props={ElDocBtnsProps}/> }

          <ElDocName props={ElDocNameProps}/>

          <ElInfo props={ElInfoProps}/>

          { ["ZL"].includes(mode) && <ElFaults props={ElFaultsProps}/> }

          <ElCalculator props={ElCalculatorProps} />

          { ["FS","FZ","PS","PZ","ZU"].includes(mode) && <ElSummary props={ElSummaryProps} /> }

          { isElComments && <ElComments props={ElCommentsProps}/> }

          { isElFiles && <ElFiles props={ElFilesProps} /> }

          { printMode && <ElSignatures props={ElSignaturesProps}/> }

          { !printMode && <ElDocBtns props={ElDocBtnsProps}/> }

        </Element>
      }
    </React.Fragment>
  )
}

export default EditArea