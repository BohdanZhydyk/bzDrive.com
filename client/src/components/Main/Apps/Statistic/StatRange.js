import React from "react"
import { TimeToObject } from "../../../../AppFunctions"


export function StatRange({ props:{from, to} }) {

  const fromObj = `${TimeToObject(from)?.year}.${TimeToObject(from)?.month}.${TimeToObject(from)?.day}`
  const toObj = `${TimeToObject(to)?.year}.${TimeToObject(to)?.month}.${TimeToObject(to)?.day}`

  return (
    <div className="StatRange flex between stretch">
      <div className="flex start bold">{`Zakres: ${toObj} - ${fromObj}`}</div>
    </div>
  )
}
