import React, { useState } from "react"

import EditArea from "../../EditArea"
import { TimeTo_YYYYMMDD } from "../../../../../AppFunctions"
import ActionBtn from "../../../../All/ActionBtn"


export function NewDocBtns({ props:{company, editDocs, setEditDocs, RELOAD, ON_CLICK} }){

  const [edit, setEdit] = useState(false)
  const [mode, setMode] = useState(false)
  const [method, setMethod] = useState( 1 )

  const date = TimeTo_YYYYMMDD( Date.now() )
  const sign = ""
  const place = company?.addr?.town

  const newDoc = {
    nr: {mode, from:date, to:date, sign, place, method}
  }

  const docBtns = [
    {mode:"ZU", style:{backgroundColor:"#fd04"}, method:1, txt:`Oplata ZUS`},
    {mode:"VA", style:{backgroundColor:"#fd04"}, method:1, txt:`Podatek VAT`},
    {mode:"PS", style:{backgroundColor:"#1714"}, method:0, txt:`Paragon Sprzedazy`},
    {mode:"PZ", style:{backgroundColor:"#f004"}, method:0, txt:`Paragon Zakupu`},
    {mode:"FZ", style:{backgroundColor:"#f004"}, method:1, txt:`Faktura Zakupu`},
  ]

  return(
    <div className="NewDocBtns flex wrap">
      
      {
        docBtns.map( (btn, b)=>{

          const key = `NewDocBtn${b}`
          const CLICK = ()=>{
            setEdit(!edit)
            setMode(btn?.mode)
            setMethod(btn?.method)
          }

          return(
            <div className="NewDocBtn flex" style={btn?.style} onClick={CLICK} key={key}>
              {btn?.txt}
            </div>
          )
        })
      }

      <ActionBtn props={{name:`cancel`, click:()=>ON_CLICK()}} />

      { edit && <EditArea props={{company, mode, doc:newDoc, edit, setEdit, RELOAD}} /> }

    </div>
  )
}