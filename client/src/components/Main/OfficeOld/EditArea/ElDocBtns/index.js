import React from "react"

import "./ElDocBtns.scss"
import { tr } from "../../../../../AppTranslate"
import ActionBtn from '../../../../All/ActionBtn'
import { ColorBtn } from "./ColorBtn"
import { ActionBtnsPannel } from "./ActionBtnsPannel"


function ElDocBtns({ props:
  {user, mode, doc, save, setSave, edit, setEdit, status, setStatus, car, setCar, ACTION_BTN}
}) {

  const lang = user.lang

  function EDIT_CHG(){
    setSave(true)
    setEdit(!edit)
  }

  const isSave = save || doc?.nr?.sign === ""

  const isSameUser = doc?.user === user.login

  const actPannelPropses = {tr, mode, lang, setSave, status, setStatus}
  const colorBtnPropses = {tr, lang, setSave, car, setCar}
  const printBtnPropses = {name:'print', click:()=>{}}
  const saveBtnPropses = {name:'save', click:()=>ACTION_BTN('save')}
  const deleteBtnPropses = {name:'delete', click:()=>ACTION_BTN('delete')}
  const cancelBtnPropses = {name:'cancel', click:EDIT_CHG}

  return(
    <section className="ElDocBtns flex between">

      <div className="ActionBtns flex start stretch">

        <ActionBtnsPannel props={actPannelPropses} />

        <div className="ColorBtnPannel">
          { ["ZL"].includes(mode) && <ColorBtn props={colorBtnPropses} /> }
        </div>

      </div>

      <div className="DocBtns flex end">

        {
          isSave
          ?
          <ActionBtn props={saveBtnPropses} />
          :
          <a className="flex" href={`/document/${doc?._id}`} target="_blank" rel="noreferrer" >
            <ActionBtn props={printBtnPropses} />
          </a>
        }

        { isSameUser && (status !== "delete") && <ActionBtn props={deleteBtnPropses} />}

        <ActionBtn props={cancelBtnPropses} />
        
      </div>

    </section>
  )
}

export default ElDocBtns