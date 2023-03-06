import React, { useState } from "react"

import './EditArea.scss'
import { ElDocBtns } from "./ElDocBtns"
import { ElDocName } from "./ElDocName"
import { ElFaults } from "./ElFaults"
import { ElInfo } from "./ElInfo"


function EditArea({ props:{mode, order, edit, setEdit} }) {

  const [save, setSave] = useState(false)

  const [actBtn, setActBtn] = useState(order?.status)

  const [orderColor, setOrderColor] = useState(order?.car?.color)

  const [nr, setNr] = useState( order?.nr )

  const [car, setCar] = useState( order?.car )

  const [buyer, setBuyer] = useState( order?.buyer )

  return(
    <div className="EditArea flex column start">

      <ElDocBtns props={{order, save, setSave, edit, setEdit, actBtn, setActBtn, orderColor, setOrderColor}}/>

      <ElDocName props={{mode, nr, setNr, setSave}}/>

      <ElInfo props={{mode, car, setCar, buyer, setBuyer, setSave}}/>

      <ElFaults props={{car, setCar}}/>

    </div>
  )
}

export default EditArea