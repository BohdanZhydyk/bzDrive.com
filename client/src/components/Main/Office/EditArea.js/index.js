import React, { useState } from "react"

import './EditArea.scss'
import { GetUser } from "../../../../AppFunctions"
import { ZLreducer } from "../ZL/ZLfunctions"
import ElDocBtns from "./ElDocBtns"
import ElDocName from "./ElDocName"
import ElInfo from "./ElInfo"
import ElCalculator from "./ElCalculator"
import { ElFaults } from "./ElFaults"
import { ElComments } from "./ElComments"
import { ElSignatures } from "./ElSignatures"
import ElFiles from "./ElFiles"
import ElSummary from "./ElSummary"


function EditArea({ props:{company, mode, order, edit, setEdit, setCalendar} }) {

  const user = GetUser()

  const [save, setSave] = useState(false)

  const [editErr, setEditErr] = useState({})

  const [id, setId] = useState( order?._id ?? false )

  const [orderCompany, setOrderCompany] = useState( company?.shortName ?? company?.id )

  const [orderUser, setOrderUser] = useState( order?.user ?? user.login )

  const [status, setStatus] = useState(order?.status ?? "open")

  const [nr, setNr] = useState( order?.nr )

  const [car, setCar] = useState( order?.car )

  const [client, setClient] = useState( order?.client )

  const [articles, setArticles] = useState( order?.articles )

  const [files, setFiles] = useState( order?.files ?? [] )

  function ACTION_BTN(act){
    const orderData = {orderCompany, orderUser, status, nr, car, client}
    switch (act) {
      case "save":
        ZLreducer( {type:"SAVE_ORDER", id, orderData}, (data)=>{ setCalendar(data) })
        break
      case "delete":
        ZLreducer( {type:"SAVE_ORDER", id, orderData:{...orderData, status:act}}, (data)=>{ setCalendar(data) })
        break
      case "print":
        alert("prin document")
        break
      default: break
    }
  }

  const ElDocBtnsProps = {user, order, save, setSave, edit, setEdit, status, setStatus, car, setCar, ACTION_BTN}
  const ElDocNameProps = {user, mode, nr, setNr, setSave, editErr, setEditErr}
  const ElInfoProps = {user, mode, car, setCar, client, setClient, setSave, editErr, setEditErr}
  const ElFaultsProps = {user, car, setCar, setSave}
  const ElCalculatorProps = {user, articles, setArticles, setSave}
  const ElSummaryProps = {nr, articles}
  const ElCommentsProps = {user, car, setCar, setSave}
  const ElFilesProps = {order, user, nr, files, setFiles}
  const ElSignaturesProps = {user}

  return(
    <div className="EditArea flex column start">

      <ElDocBtns props={ElDocBtnsProps}/>
      <ElDocName props={ElDocNameProps}/>
      <ElInfo props={ElInfoProps}/>
      <ElFaults props={ElFaultsProps}/>
      <ElCalculator props={ElCalculatorProps} />
      <ElSummary props={ElSummaryProps} />
      <ElComments props={ElCommentsProps}/>
      <ElFiles props={ElFilesProps} />
      <ElSignatures props={ElSignaturesProps}/>
      <ElDocBtns props={ElDocBtnsProps}/>

    </div>
  )
}

export default EditArea