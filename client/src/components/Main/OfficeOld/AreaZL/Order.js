import React, { useState } from "react"

import { SumArray, YYYYMMDD_ToWeekDay } from "../../../../AppFunctions"
import { OrderLeftPart } from "./OrderLeftPart"
import EditArea from "../EditArea"
import { OrderRightPart } from "./OrderRightPart"


export function Order({ props:{leftMode, company, mode, order, firstDay, lastDay, pannels, Reducer} }) {

  const [edit, setEdit] = useState(false)

  const repairStatus = order?.status === "repair"

  let from = YYYYMMDD_ToWeekDay(order?.nr?.from)
  let to = YYYYMMDD_ToWeekDay(order?.nr?.to)

  if( (order?.nr?.from <= firstDay) ){ from = 1 }
  if( (order?.nr?.to >= lastDay) ){ to = 7 }

  const beforeOrderLength = (from > 1) ? from - 1 : 0
  const orderLength = to - from + 1

  const color = order?.car?.color

  const styles = {
    beforeStyles:{width:`calc(100% / 7 * ${beforeOrderLength})`, minHeight: `2vw`},
    orderStyles:{width:`calc(100% / 7 * ${orderLength} - 2px)`},
    cellStyles:{backgroundColor:color, backgroundImage:`linear-gradient(0deg, ${color}, #111a 30% 70%, ${color})`}
  }

  const checkImg = repairStatus
    ? `https://bzdrive.com/files/ico/icoCheck.png`
    : `https://bzdrive.com/files/dealers/${company?.img ?? `empty.png`}`

  let lines = `--------------------------------------------------`
  let name = `${order?.client?.name ? `klient: ${order.client.name}\n` : ``}`
  let telNr = `${order?.client?.contacts?.tel ? `tel: ${order.client.contacts.tel}\n` : ``}`
  let faults = `\n${order?.car?.faults ? `${lines}\n${order.car.faults}\n${lines}\n` : ``}`
  let brutto = `\n${order?.articles ? `brutto: ${SumArray(order.articles.map( el=> el.SUM ) )} zł` : ``}`
  let title = `${name}${telNr}${faults}${brutto}`

  return(
    <div className="Order MinHight flex wrap">

      <OrderLeftPart props={{order, title, styles, checkImg, pannels, edit, setEdit}}/>

      {
        leftMode
        ? <div className="RightLine flex stretch start" style={{display:pannels.RP}}></div>
        : <OrderRightPart props={{order, title, styles, checkImg, pannels, edit, setEdit}}/>
      }

      {edit && <EditArea props={{company, mode, prog:"ZL", doc:order, edit, setEdit, Reducer}} /> }

    </div>
  )
}