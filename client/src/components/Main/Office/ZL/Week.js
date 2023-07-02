import React from "react"

import { OrdersLine } from "./OrdersLine"
import { WeekPannel } from "./WeekPannel"


export function Week({ props:{line, l, lang, mode, company, pannels, ZLreducer, RELOAD} }) {
  return(
    <>
      <WeekPannel props={{line, l, mode, company, pannels, lang, RELOAD}} />
      <OrdersLine props={{line, l, mode, company, pannels, ZLreducer, RELOAD}} />
    </>
  )
}