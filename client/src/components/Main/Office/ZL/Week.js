import React from "react"

import { OrdersLine } from "./OrdersLine"
import { WeekPannel } from "./WeekPannel"


export function Week({ props:{line, l, lang, mode, company, setCalendar, ZLreducer} }) {
  return(
    <>
      <WeekPannel props={{mode, company, line, l, lang, setCalendar}} />
      <OrdersLine props={{line, l, mode, company, setCalendar, ZLreducer}} />
    </>
  )
}