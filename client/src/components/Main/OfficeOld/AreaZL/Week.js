import React from "react"

import { OrdersLine } from "./OrdersLine"
import { WeekPannel } from "./WeekPannel"


export function Week({ props:{line, l, lang, mode, company, pannels, ZLreducer, Reducer} }) {
  return(
    <>
      <WeekPannel props={{line, l, mode, company, pannels, lang, Reducer}} />
      <OrdersLine props={{line, l, mode, company, pannels, ZLreducer, Reducer}} />
    </>
  )
}