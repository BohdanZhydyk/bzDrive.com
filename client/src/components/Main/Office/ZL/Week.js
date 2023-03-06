import React from "react"

import { OrderLine } from "./OrderLine"
import { WeekPannel } from "./WeekPannel"


export function Week({ props:{line, l, mode, company} }) {
  return(
    <>
      <WeekPannel props={{line}} />
      <OrderLine props={{line, l, mode, company}} />
    </>
  )
}