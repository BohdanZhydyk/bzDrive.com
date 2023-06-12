import React, { useState, useEffect } from "react"

import { TimeTo_YYYYMMDD } from "../../../../AppFunctions.js"
import { Order } from "./Order.js"


export function OrdersLine({ props:{line, l, mode, company, ZLreducer, RELOAD} }) {
  
  const [orders, setOrders] = useState(line?.orders ?? false)

  const companyName = company?.shortName
  const today = TimeTo_YYYYMMDD(Date.now())
  const firstDay = TimeTo_YYYYMMDD(line.week[0])
  const lastDay = TimeTo_YYYYMMDD(line.week[line.week.length - 1])

  let query = {mode, companyName, today, firstDay, lastDay}
  useEffect( ()=>{ !orders && ZLreducer( {type:"GET_ORDERS", query}, (data)=>setOrders(data) ) },[])

  // console.log(`orders-${l}`,orders)

  return(
    <div className="OrdersLine flex wrap">

      {
        orders && orders.map( (order, o)=>{

          const key = `OrderLine${o}${order?._id}`

          return <Order props={{company, mode, order, firstDay, lastDay, RELOAD}} key={key} />

        })
      }

    </div>
  )
}