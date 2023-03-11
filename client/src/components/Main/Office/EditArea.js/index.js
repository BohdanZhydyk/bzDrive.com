import React, { useState } from "react"

import './EditArea.scss'
import { GetUser } from "../../../../AppFunctions"
import { TimeTo_YYYYMMDD, ZLreducer } from "../ZL/ZLfunctions"
import ElDocBtns from "./ElDocBtns"
import ElDocName from "./ElDocName"
import ElInfo from "./ElInfo"
import { ElFaults } from "./ElFaults"
import { ElComments } from "./ElComments"
import { ElSignatures } from "./ElSignatures"


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

  return(
    <div className="EditArea flex column start">

      <ElDocBtns props={{user, order, save, setSave, edit, setEdit, status, setStatus, car, setCar, ACTION_BTN}}/>

      <ElDocName props={{user, mode, nr, setNr, setSave, editErr, setEditErr}}/>

      <ElInfo props={{user, mode, car, setCar, client, setClient, setSave, editErr, setEditErr}}/>

      <ElFaults props={{user, car, setCar}}/>

      <ElComments props={{user, car, setCar}}/>

      <ElSignatures props={{user}}/>

    </div>
  )
}

export default EditArea