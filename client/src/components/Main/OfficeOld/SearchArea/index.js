import React, { useState } from "react"

import "./SearchArea.scss"
import { SearchPannel } from "./SearchPannel"
import { SearchOrdersPannel } from "./SearchOrdersPannel"


function SearchArea({ props:{tr, lang, company, mode, search, setSearch, ZLreducer, Reducer} }) {

  const [searchBtn, setSearchBtn] = useState( true )

  const companyName = company?.shortName
  const firstDay = search?.query?.from
  const lastDay = search?.query?.to
  const vin = search?.query?.vin
  const car = search?.query?.car
  const client = search?.query?.client
  const tel = search?.query?.tel

  let query = {searchMode:true, mode, companyName, firstDay, lastDay, vin, car, client, tel}

  const SEARCH = ()=>{
    setSearchBtn( prev=> !prev )
    ZLreducer( {type:"GET_ORDERS", query}, (data)=>{
      setSearch( prev=> ({...prev, docs:data}) )
      setSearchBtn( prev=> !prev )
    })
  }

  const ERASE = ()=> setSearch( {query:{}, docs:[]} )

  const KEY_ENTER = (e)=>{
    if(e.key === 'Enter') SEARCH()
  }

  return(
    <div className="SearchArea flex column">

      <SearchPannel props={{tr, lang, searchBtn, search, setSearch, KEY_ENTER, SEARCH, ERASE}} />

      <SearchOrdersPannel props={{company, mode, search, Reducer}} />

    </div>
  )
}

export default SearchArea