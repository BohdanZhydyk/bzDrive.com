import React, { useState } from "react"

import Input from "../../../../All/Input"
import ActionBtn from "../../../../All/ActionBtn"
import { carProps, clientProps, fromProps, toProps } from "./searchProps"
import { Order } from "../Order"


function SearchArea({ props:{tr, lang, company, mode, RELOAD} }) {

  const [search, setSearch] = useState( [] )

  const [orders, setOrders] = useState( [] )

  const leftMode = true

  const searchBtnPropses = {name:'search', click:()=>{}}

  // console.log("search", search)

  return(
    <div className="SearchArea flex column">

      <div className="SearchPannel flex stretch">

        <Input props={ fromProps(tr, lang, search, setSearch) } />
        <Input props={ toProps(tr, lang, search, setSearch) } />
        <Input props={ carProps(search, setSearch) } />
        <Input props={ clientProps(search, setSearch) } />

        <div className="SearchBtn flex">
          <ActionBtn props={searchBtnPropses} />
        </div>

        <div className="RightLine flex stretch start"></div>

      </div>


      {
        orders &&
        orders.map( (order, l)=>{
          const orderProps = {leftMode, company, mode, order, RELOAD}
          const key = `SearchOrder${l}`
          return(
            <div className="OrdersLine flex wrap">
              <Order props={orderProps} key={key} />
            </div>
          )
        })
      }
    </div>
  )
}

export default SearchArea