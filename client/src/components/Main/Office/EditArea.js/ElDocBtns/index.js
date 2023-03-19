import React from "react"

import "./ElDocBtns.scss"
import { tr } from "../../../../../AppTranslate"
import ActionBtn from '../../../../All/ActionBtn'
import { ColorBtn } from "./ColorBtn"
import { ActionBtnsPannel } from "./ActionBtnsPannel"


function ElDocBtns({ props:
  {user, order, save, setSave, edit, setEdit, status, setStatus, car, setCar, ACTION_BTN}
}) {

  const lang = user.lang

  function EDIT_CHG(){
    setSave(true)
    setEdit(!edit)
  }

  const SavePrintBtn = save || order?.nr?.sign === "" ? 'save' : 'print'

  const isSameUser = order?.user === user.login

  const actPannelPropses = {tr, lang, setSave, status, setStatus}
  const colorBtnPropses = {tr, lang, setSave, car, setCar}
  const savePrintBtnPropses = {name:SavePrintBtn, click:()=>ACTION_BTN(SavePrintBtn)}
  const deleteBtnPropses = {name:'delete', click:()=>ACTION_BTN('delete')}
  const cancelBtnPropses = {name:'cancel', click:EDIT_CHG}

  return(
    <section className="ElDocBtns flex">

      <div className="ActionBtns flex start">

        <ActionBtnsPannel props={actPannelPropses} />

        <ColorBtn props={colorBtnPropses} />

      </div>

      <div className="DocBtns flex end">

        <ActionBtn props={savePrintBtnPropses} />

        { isSameUser && <ActionBtn props={deleteBtnPropses} />}

        <ActionBtn props={cancelBtnPropses} />
        
      </div>

    </section>
  )
}

export default ElDocBtns