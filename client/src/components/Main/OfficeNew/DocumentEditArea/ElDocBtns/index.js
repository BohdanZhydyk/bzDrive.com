import React from "react"

import "./ElDocBtns.scss"
import ActionBtn from '../../../../All/ActionBtn'
import { ActionBtnsPannel } from "./ActionBtnsPannel"
import { ColorBtn } from "./ColorBtn"


function ElDocBtns({ props:{tr, lang, isSave, isSameUser, mode, id, status, nr, Reducer} }) {

  const actionsBtnsPannelPropses = {tr, mode, lang, status, Reducer}
  const colorBtnPropses = {tr, lang, nr, Reducer}
  const printBtnPropses = {name:'print', click:()=>{}}
  const saveBtnPropses = {name:'save', click:()=>Reducer({ type:"SAVE_DOCUMENT" })}
  const deleteBtnPropses = {name:'delete', click:()=>Reducer({ type:"DELETE_DOCUMENT" })}
  const cancelBtnPropses = {name:'cancel', click:()=>Reducer({ type:"CLOSE_DOCUMENT" })}

  return(
    <section className="ElDocBtns flex between">

      <div className="ActionBtns flex start stretch">

        <ActionBtnsPannel props={actionsBtnsPannelPropses} />

        <ColorBtn props={colorBtnPropses} />

      </div>

      <div className="DocBtns flex end">

        {
          isSave
          ?
          <ActionBtn props={saveBtnPropses} />
          :
          <a className="flex" href={`/document/${id}`} target="_blank" rel="noreferrer" >
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