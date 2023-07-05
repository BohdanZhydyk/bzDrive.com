import React from "react"

import { Order } from "../Order"


export function SearchOrdersPannel({ props:{company, mode, search, orders, RELOAD} }) {

  const leftMode = true
  const firstDay = search?.from
  const lastDay = search?.to

  return(
    <div className="SearchOrdersPannel flex column">
    {
      orders &&
      orders.map( (order, l)=>{

        const pannels = {LP:true, RP:true}
        const orderProps = {leftMode, company, mode, order, firstDay, lastDay, pannels, RELOAD}
        const key = `SearchOrder${l}${order._id}`

        return(
          <div className="OrdersLine flex wrap" key={key}>
            <Order props={orderProps} />
          </div>
        )
      })
    }
    </div>
  )
}