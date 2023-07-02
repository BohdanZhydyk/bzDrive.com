import React from "react"

import { DocNameNormalize, SumArray } from "../../../../AppFunctions"


export function OrderLeftPart({ props:{order, title, styles, checkImg, pannels, edit, setEdit} }) {

  const cellSt = styles.cellStyles

  const number = DocNameNormalize(order?.nr)
  const carName = `${order?.car?.brand} - ${order?.car?.model}`
  const sum = SumArray( order?.articles?.map( (el)=> el.SUM ) )
  const tel = order?.client?.name
    ? `${order.client.name}`
    : (order?.client?.contacts?.tel ? `${order.client.contacts.tel}` : ``)

  return(
    <div className="LeftLine flex stretch" style={{display:pannels.LP}} title={title}>

      <span className={`OrderAva OrderCell flex`} style={cellSt} onClick={()=>setEdit(!edit)}>
        <span className="CellTxt flex">
          <img className="ImgBtn flex" src={checkImg} alt="check" />
        </span>
        <div className={`StatusLine StatusLineColor_${order?.status} flex`}></div>
      </span>

      <div className="MainCell flex wrap stretch">

        <span className={`OrderNr OrderCell flex start`} style={cellSt} onClick={()=>setEdit(!edit)}>
          <span className="CellTxt flex">
            <span>{number}</span>
          </span>
        </span>

        <span className={`OrderCar OrderCell flex start`} style={cellSt} onClick={()=>setEdit(!edit)}>
          <span className="CellTxt flex">
            <span>{carName}</span>
          </span>
        </span>

        <div className={`StatusLine StatusLineColor_${order?.status} flex`} onClick={()=>setEdit(!edit)}></div>

      </div>

      <a href={`tel: ${tel}`} className={`OrderTel OrderCell flex start`} style={cellSt} target="_blank" rel="noreferrer">
        <span className="CellTxt flex">
          <span>{tel}</span>
        </span>
        <div className={`StatusLine StatusLineColor_${order?.status} flex`}></div>
      </a>

      <span className={`OrderSUM OrderCell flex end`} style={cellSt} onClick={()=>setEdit(!edit)}>
        <span className="CellTxt flex">
          <span>{sum}</span>
        </span>
        <div className={`StatusLine StatusLineColor_${order?.status} flex`}></div>
      </span>

    </div>
  )
}