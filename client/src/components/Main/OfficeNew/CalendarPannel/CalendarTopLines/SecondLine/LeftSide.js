import React, { useState } from "react"

import { DocModes } from "./DocModes"


export function LeftSide({ props:{user, docSelect, scroolTo, dowloadBar, Reducer} }){

  const [forms, setForms] = useState( {newDocBtn:false, filterDocBtn:true} )

  function NEW_DOC_BTN_CLICK(){
    !forms?.newDocBtn && setForms( prev=>({newDocBtn:!prev?.newDocBtn, filterDocBtn:!prev?.filterDocBtn}) )
  }
  function FILTER_DOC_BTN_CLICK(){
    !forms?.filterDocBtn && setForms(prev=>({newDocBtn:!prev?.newDocBtn, filterDocBtn:!prev?.filterDocBtn}))
  }

  return(
    <div className="CalendarLineLeftSide flex">

      <div className={`NewDocBtn ${forms?.newDocBtn ? `NewDocBtnActive` : ``} flex`} onClick={NEW_DOC_BTN_CLICK}>
        {`Nowy document`}
      </div>

      <DocModes props={{user, docSelect, forms, setForms, scroolTo, dowloadBar, Reducer}} />

      <div className={`FilterDocBtn ${forms?.filterDocBtn ? `FilterDocBtnActive` : ``} flex`} onClick={FILTER_DOC_BTN_CLICK}>
        {`Filtr dokumentów`}
      </div>

    </div>
  )
}
