import React from "react"

import { OrdersLine } from "./OrdersLine"
import { WeekPannel } from "./WeekPannel"


export function Week({ props:{line, l, lang, mode, company, ZLreducer, SAVE_DOC} }) {
  return(
    <>
      <WeekPannel props={{mode, company, line, l, lang, SAVE_DOC}} />
      <OrdersLine props={{line, l, mode, company, ZLreducer, SAVE_DOC}} />
    </>
  )
}