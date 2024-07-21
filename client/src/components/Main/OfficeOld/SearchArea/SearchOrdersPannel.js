import React from "react"
import { Order } from "../AreaZL/Order"


export function SearchOrdersPannel({ props:{company, mode, search, Reducer} }) {

  const leftMode = true
  const firstDay = search?.query?.from
  const lastDay = search?.query?.to
  const orders = search?.docs

  return(
    <div className="SearchOrdersPannel flex column">
    {
      orders &&
      orders.map( (order, l)=>{

        const pannels = {LP:true, RP:true}
        const orderProps = {leftMode, company, mode, order, firstDay, lastDay, pannels, Reducer}
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