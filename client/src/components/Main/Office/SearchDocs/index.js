import React, { useState } from "react"

import "./SearchDocs.scss"
import { tr } from "../../../../AppTranslate"
import { GetUser } from "../../../../AppFunctions"
import DocumentLine from "../DocumentLine"
import InputText from "../../../All/InputText"
import { searchPropses } from "./searchProps"


function SearchDocs({ props:{company, search, setSearch, searchQuery, setSearchQuery, visibleSide, Reducer} }) {

  const [searchRef, setSearchRef] = useState("") 

  const l = "search"
  const line = {week:[], docs:search}
  const isSearch = true

  const lang = GetUser()?.lang

  const searchLen = search?.length
  const searchQueryLen = searchQuery?.val?.length
  const isChanged = (searchQuery?.val ?? "") !== searchRef

  function getIconAndAction(searchQueryLen, searchLen) {
    function NOOP(){}
    function SEARCH(){ Reducer({type:"SEARCH_DOCUMENTS"}); setSearchRef((searchQuery?.val ?? "").trim()) }
    function ERASE(){ setSearch([]); setSearchQuery({val:"", err:""}); setSearchRef("") }
    if (!isChanged && searchLen > 0) return { isImg: "Erase", imgAct: ERASE }
    if (searchQueryLen === 0) return { isImg: "Search", imgAct: NOOP }
    if (searchQueryLen > 1) return { isImg: "Search", imgAct: SEARCH }
    return { isImg: "Erase", imgAct: ERASE }
  }

  const { isImg, imgAct } = getIconAndAction(searchQueryLen, searchLen)

  const searchVisible = visibleSide?.mobile ? {...visibleSide, side:true} : {...visibleSide}
  
  return(
    <div className="SearchDocs flex column">

      <div className="SearchPannel flex stretch end">

        {
          searchLen > 0 &&
          <div className="SearchText flex start">
            <span>{tr(`SearchText`,lang)}</span>
            <span className="txtYlw bold">{`(${searchLen})`}</span>
          </div>
        }

        <div className="SearchInput flex">
          <InputText props={searchPropses({lang, searchQuery, setSearchQuery, isImg, imgAct})}/>
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