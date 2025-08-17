import React from "react"

import "./SearchDocs.scss"
import InputText from "../../../All/InputText"
import { searchPropses } from "./searchProps"
import { GetUser } from "../../../../AppFunctions"


function SearchDocs({ props:{search, setSearch, searchQuery, setSearchQuery, Reducer} }) {

  const lang = GetUser()?.lang

  const searchLen = search?.length

  function ERASE(){ setSearch([]); setSearchQuery("") }
  function SEARCH(){ Reducer({type:"SEARCH_DOCUMENTS"}) }
  
  return(
    <div className="SearchDocs flex column">

      <div className="SearchPannel flex stretch end">
        <div className="SearchInput flex">
          <InputText props={searchPropses({lang, searchQuery, setSearchQuery, searchLen, SEARCH, ERASE})}/>
        </div>
      </div>

    </div>
  )
}

export default SearchDocs