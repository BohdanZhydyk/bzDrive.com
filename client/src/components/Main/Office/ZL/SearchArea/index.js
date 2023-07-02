import React, { useState } from "react"

import Input from "../../../../All/Input"
import ActionBtn from "../../../../All/ActionBtn"
import { carProps, clientProps, fromProps, telProps, toProps, vintProps } from "./searchProps"
import { Order } from "../Order"


function SearchArea({ props:{tr, lang, company, mode, ZLreducer, RELOAD} }) {

  const [search, setSearch] = useState( [] )

  const [orders, setOrders] = useState( [] )

  const [searchBtn, setSearchBtn] = useState( true )

  const leftMode = true

  const companyName = company?.shortName
  const firstDay = search?.from
  const lastDay = search?.to
  const vin = search?.vin
  const car = search?.car
  const client = search?.client
  const tel = search?.tel

  let query = {searchMode:true, mode, companyName, firstDay, lastDay, vin, car, client, tel}

  const SEARCH = ()=>{
    setOrders( [] )
    setSearchBtn( prev=> !prev )
    ZLreducer( {type:"GET_ORDERS", query}, (data)=>{
      setOrders(data)
      setSearchBtn( prev=> !prev )
    })
  }

  const KEY_ENTER = (e)=>{
    if(e.key === 'Enter') SEARCH()
  }

  // console.log("search", search)

  return(
    <div className="SearchArea flex column">

      <div className="SearchPannel flex start stretch wrap" onKeyDown={(e)=>KEY_ENTER(e)}>

        <Input props={ fromProps(tr, lang, search, setSearch) } />
        <Input props={ toProps(tr, lang, search, setSearch) } />
        <Input props={ vintProps(search, setSearch) } />
        <Input props={ carProps(search, setSearch) } />
        <Input props={ clientProps(search, setSearch) } />
        <Input props={ telProps(search, setSearch) } />

        {
          searchBtn &&
          <div className="SearchBtn flex">
            <ActionBtn props={{name:'search', click:()=>SEARCH()}} />
          </div>
        }

        <div className="RightLine flex stretch start"></div>

      </div>

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

export default SearchArea