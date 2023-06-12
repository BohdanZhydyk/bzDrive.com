import React from "react"

import { OrdersLine } from "./OrdersLine"
import { WeekPannel } from "./WeekPannel"


export function Week({ props:{line, l, lang, mode, company, ZLreducer, RELOAD} }) {
  return(
    <>
      <WeekPannel props={{mode, company, line, l, lang, RELOAD}} />
      <OrdersLine props={{line, l, mode, company, ZLreducer, RELOAD}} />
    </>
  )
}