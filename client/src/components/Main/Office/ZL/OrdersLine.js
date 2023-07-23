import React from "react"

import { Order } from "./Order.js"


export function OrdersLine({ props:{line, l, mode, company, pannels, ZLreducer, RELOAD} }) {
  
  const orders = line?.orders ?? false

  const firstDay = line.week[0]
  const lastDay = line.week[line.week.length - 1]

  // console.log(`orders-${l}`,orders)

  return(
    <div className="OrdersLine flex wrap">

      {
        orders && orders.map( (order, o)=>{

          const key = `OrderLine${l}${o}${order?._id}`

          return <Order props={{company, mode, order, firstDay, lastDay, pannels, RELOAD}} key={key} />

        })
      }

    </div>
  )
}