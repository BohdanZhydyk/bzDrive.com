import React, { useState, useEffect } from "react"
import EditArea from "../EditArea.js"

import {
  ZLreducer,
  DocNameNormalize
} from "./ZLfunctions"


export function OrderLine({ props:{line, l, mode, company} }) {

  const [orders, setOrders] = useState(line?.orders)

  const [edit, setEdit] = useState(false)

  let query = {"company": company?.shortName, "nr.mode": mode}

  useEffect( ()=>{ !orders && ZLreducer( {type:"GET_ORDERS", query, orders, setOrders} ) },[])

  function orderStyles(color){
    return {
      backgroundColor:color,
      backgroundImage:`linear-gradient(0deg, ${color}, #111a 30% 70%, ${color})`,
      whiteSpace:`nowrap`,
      overflow:`hidden`,
      textOverflow:`ellipsis`
    }
  }

  console.log(`orders-${l}`,orders)

  return(
    <div className="OrderLine flex wrap">

      {
        orders && orders.map( (order, o)=>{
          const key = `OrderLine${o}${order?._id}`
          const styles = orderStyles(order?.car?.color)
          const number = DocNameNormalize(order?.nr)
          return(
            <div className="Order flex wrap" key={key}>

              <div className="LeftLine flex stretch" onClick={()=>setEdit(!edit)}>
                <span className="OrderNr flex" style={styles}>{number}</span>
                <span className="OrderElse flex" style={styles}></span>
              </div>

              <div className="RightLine flex stretch" onClick={()=>setEdit(!edit)}>
                <span className="OrderR flex" style={styles}>{number}</span>
              </div>

              {edit && <EditArea props={{mode, order, edit, setEdit}} /> }

            </div>
          )
        })
      }

    </div>
  )
}