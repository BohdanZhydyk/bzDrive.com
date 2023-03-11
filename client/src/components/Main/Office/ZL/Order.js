import React, { useState } from "react"

import { DocNameNormalize, YYYYMMDD_ToWeekDay } from "./ZLfunctions"
import EditArea from "../EditArea.js"


export function Order({ props:{company, mode, order, setCalendar, today, firstDay, lastDay} }) {

  const [edit, setEdit] = useState(false)
  
  const number = DocNameNormalize(order?.nr)
  const carName = `${order?.car?.brand} - ${order?.car?.model}`
  const tel = order?.client?.name
    ? `${order.client.name}`
    : (order?.client?.contacts?.tel ? `${order.client.contacts.tel}` : ``)

  const opacity = ["close", "delete"].includes(order?.status) ? 0.3 : 1
  const repairStatus = order?.status === "repair"

  let from = YYYYMMDD_ToWeekDay(order?.nr?.from)
  let to = YYYYMMDD_ToWeekDay(order?.nr?.to)

  if( (order?.nr?.from <= firstDay) ){ from = 1 }
  if( (order?.nr?.to >= lastDay) ){ to = 7 }

  const beforeOrderLength = (from > 1) ? from - 1 : 0
  const orderLength = to - from + 1

  const beforeOrderStyles = {
    width:`calc(100% / 7 * ${beforeOrderLength})`,
    minHeight: `2vw`
  }
  const orderStyles = {
    width:`calc(100% / 7 * ${orderLength} - 2px)`
  }
  const styles = {
    opacity,
    backgroundColor:order?.car?.color,
    backgroundImage:`linear-gradient(0deg, ${order?.car?.color}, #111a 30% 70%, ${order?.car?.color})`
  }

  const checkImg = repairStatus
    ? `https://bzdrive.com/files/ico/icoCheck.png`
    : `https://bzdrive.com/files/dealers/${company?.img}`

  return(
    <div className="Order flex wrap">

      <div className="LeftLine flex stretch">

        <span className="OrderAva OrderCell flex" style={styles} onClick={()=>setEdit(!edit)}>
          <img className="AvaImg flex" src={checkImg} alt="check" />
        </span>

        <span className="OrderNr OrderCell flex" style={styles} onClick={()=>setEdit(!edit)}>
          <span>{number}</span>
        </span>

        <span className="OrderCar OrderCell flex start" style={styles} onClick={()=>setEdit(!edit)}>
          <span>{carName}</span>
        </span>

        <a className="OrderTel OrderCell flex start" href={`tel: ${tel}`} style={styles}>
          <span>{tel}</span>
        </a>
        
        <span className="OrderElse OrderCell flex" style={styles} onClick={()=>setEdit(!edit)}>
          <span></span>
        </span>

        <div className={`StatusLine StatusLineColor_${order?.status} flex`}></div>

      </div>

      <div className="RightLine flex stretch start" onClick={()=>setEdit(!edit)}>

        <span className="BeforeOrder flex" style={beforeOrderStyles}></span>

        <span className="OrderR flex" style={orderStyles}>
          <div className="OrderBody flex end" style={styles}>
            { repairStatus && <img className="AvaImg flex" src={checkImg} alt="check" /> }
          </div>
          <div className={`StatusLine StatusLineColor_${order?.status} flex`}></div>
        </span>


      </div>

      {edit && <EditArea props={{company, mode, order, edit, setEdit, setCalendar}} /> }

    </div>
  )
}