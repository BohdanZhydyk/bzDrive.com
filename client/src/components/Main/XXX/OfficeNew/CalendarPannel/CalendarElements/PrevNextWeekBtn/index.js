import React from "react"

import "./PrevNextWeekBtn.scss"
import { tr } from "../../../../../../AppTranslate"


export function PrevNextWeekBtn({ props:{user, dir, Reducer} }){

  const lang = user?.lang

  function PREV_NEXT_WEEK_MOVE(){
    Reducer({ type:"PREV_NEXT_WEEK_MOVE", dir })
  }
  const btnTxt = (dir > 0) ? tr("AddWeekBtn_PLUS_WEEK", lang) : tr("AddWeekBtn_MINUS_WEEK", lang)

  return(
    <div className="PrevNextWeekBtn radius flex" onClick={PREV_NEXT_WEEK_MOVE}>
      {btnTxt}
    </div>
  )
}
