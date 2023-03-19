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

  return(
    <section className="ElDocBtns flex">

      <div className="ActionBtns flex start">

        <ActionBtnsPannel props={{tr, lang, setSave, status, setStatus}} />

        <ColorBtn props={{tr, lang, setSave, car, setCar}} />

      </div>

      <div className="DocBtns flex end">

        <ActionBtn props={{name:SavePrintBtn, click:()=>ACTION_BTN(SavePrintBtn)}} />

        { isSameUser && <ActionBtn props={{name:'delete', click:()=>ACTION_BTN('delete')}} />}

        <ActionBtn props={{name:'cancel', click:EDIT_CHG}} />
        
      </div>

    </section>
  )
}

export default ElDocBtns