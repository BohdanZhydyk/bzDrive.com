import React from "react"

import "./SearchDocs.scss"
import DocumentLine from "../DocumentLine"
import InputText from "../../../All/InputText"
import { searchPropses } from "./searchProps"
import { GetUser } from "../../../../AppFunctions"


function SearchDocs({ props:{company, search, setSearch, searchQuery, setSearchQuery, visibleSide, Reducer} }) {

  const l = "search"
  const line = {week:[], docs:search}
  const isSearch = true

  const lang = GetUser()?.lang

  const searchLen = search?.length

  function SEARCH(){ Reducer({type:"SEARCH_DOCUMENTS"}) }
  function ERASE(){ setSearch([]); setSearchQuery("") }

  const searchVisible = visibleSide?.mobile ? {...visibleSide, side:true} : {...visibleSide}

  return(
    <div className="SearchDocs flex column">

      <div className="SearchPannel flex stretch end">
        <div className="SearchInput flex">
          <InputText props={searchPropses({lang, searchQuery, setSearchQuery, searchLen, SEARCH, ERASE})}/>
        </div>
      </div>

      {
        search && search.map( (doc, n)=>{
          return <DocumentLine props={{company, line, l, doc, n, isSearch, visibleSide:searchVisible, Reducer}} key={`search${n}`}/>
        })
      }

    </div>
  )
}

export default SearchDocs