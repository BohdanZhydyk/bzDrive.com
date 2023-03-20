import React, { useState } from "react"

import { DocNameNormalize, SumArray, YYYYMMDD_ToWeekDay } from "../../../../AppFunctions"
import EditArea from "../EditArea"


export function Order({ props:{company, mode, order, firstDay, lastDay, SAVE_DOC} }) {

  const [edit, setEdit] = useState(false)
  
  const number = DocNameNormalize(order?.nr)
  const carName = `${order?.car?.brand} - ${order?.car?.model}`
  const sum = SumArray( order?.articles?.map( (el)=> el.SUM ) )
  const tel = order?.client?.name
    ? `${order.client.name}`
    : (order?.client?.contacts?.tel ? `${order.client.contacts.tel}` : ``)

  const opacity = ["close", "delete"].includes(order?.status) ? 0.4 : 1
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

  const leftLine = [
    {
      cl: `OrderAva`,
      clk: ()=>setEdit(!edit),
      com: <img className="AvaImg flex" src={checkImg} alt="check" />
    },
    {
      cl: `OrderNr`,
      clk: ()=>setEdit(!edit),
      com: <span>{number}</span>
    },
    {
      cl: `OrderCar start`,
      clk: ()=>setEdit(!edit),
      com: <span>{carName}</span>
    },
    {
      cl: `OrderTel start`,
      clk: ()=>{},
      com: <a href={`tel: ${tel}`}>{tel}</a>
    },
    {
      cl: `OrderSUM`,
      clk: ()=>setEdit(!edit),
      com: <span>{sum}</span>
    }
  ]

  return(
    <div className="Order flex wrap">

      <div className="LeftLine flex stretch">

        {
          leftLine.map( (cell, c)=>{
            const key = `OrderLeftLine${c}`
            return(
              <span className={`OrderCell flex ${cell.cl}`} style={styles} onClick={cell.clk} key={key} >
                {cell.com}
              </span>
            )
          })
        }

        <div className={`StatusLine StatusLineColor_${order?.status} flex`}></div>

      </div>

      <div className="RightLine flex stretch start">

        <span className="BeforeOrder flex" style={beforeOrderStyles}></span>

        <span className="OrderR flex" style={orderStyles} onClick={()=>setEdit(!edit)}>
          <div className="OrderBody flex end" style={styles}>
            { repairStatus && <img className="AvaImg flex" src={checkImg} alt="check" /> }
          </div>
          <div className={`StatusLine StatusLineColor_${order?.status} flex`}></div>
        </span>


      </div>

      {edit && <EditArea props={{company, mode, doc:order, edit, setEdit, SAVE_DOC}} /> }

    </div>
  )
}