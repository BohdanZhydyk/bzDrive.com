import React, { useState } from "react"

import { SearchPannel } from "./SearchPannel"
import { SearchOrdersPannel } from "./SearchOrdersPannel"


function SearchArea({ props:{tr, lang, company, mode, search, setSearch, orders, setOrders, ZLreducer, RELOAD} }) {

  const [searchBtn, setSearchBtn] = useState( true )

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

  const ERASE = ()=>{
    setSearch( [] )
    setOrders( [] )
  }

  const KEY_ENTER = (e)=>{
    if(e.key === 'Enter') SEARCH()
  }

  // console.log("search", search)

  return(
    <div className="SearchArea flex column">

      <SearchPannel props={{tr, lang, searchBtn, search, setSearch, KEY_ENTER, SEARCH, ERASE}} />

      <SearchOrdersPannel props={{company, mode, search, orders, RELOAD}} />

    </div>
  )
}

export default SearchArea