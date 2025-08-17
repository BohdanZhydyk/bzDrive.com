import React, { useState } from "react"

import CarLine from "./CarLine"
import { SoftTr } from "./SoftwareTranslate"
import { bzScroolToDiv } from "../../../AppFunctions"
import InputText from "../../All/InputText"
import { searchPropses } from "./searchProps"


export function LastSoftware({ props: { initialState, carTop, lang, search, setSearch, searchQuery, setSearchQuery, Reducer } }) {

  const step = 5

  const [visibleCount, setVisibleCount] = useState(step)

  const lastSoftwares = initialState.sort((a, b) => b.id.localeCompare(a.id))

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + step)
    bzScroolToDiv("LoadMoreBtn", 0)
  }

  const [searchRef, setSearchRef] = useState("")

  const searchLen = search?.length
  const searchQueryLen = searchQuery?.val?.length
  const isChanged = (searchQuery?.val ?? "") !== searchRef

  function getIconAndAction(searchQueryLen, searchLen) {
    function NOOP(){}
    function SEARCH(){ Reducer({type:"SEARCH_SOFTWARE"}); setSearchRef((searchQuery?.val ?? "").trim()) }
    function ERASE(){ setSearch([]); setSearchQuery({val:"", err:""}); setSearchRef("") }
    if (!isChanged && searchLen > 0) return { isImg: "Erase", imgAct: ERASE }
    if (searchQueryLen === 0) return { isImg: "Search", imgAct: NOOP }
    if (searchQueryLen > 1) return { isImg: "Search", imgAct: SEARCH }
    return { isImg: "Erase", imgAct: ERASE }
  }

  const { isImg, imgAct } = getIconAndAction(searchQueryLen, searchLen)

  return (
    <div className="LastSoftware flex column start">

      <div className="LastSoftTitle flex between bold">

        {
          search?.length
          ? `${SoftTr("SearchText", lang)} (${search?.length})`
          : `${SoftTr("LastSoftware", lang)} (${visibleCount}/${initialState?.length})`
        }

        <div className="SearchInput flex">
          <InputText props={searchPropses({lang, searchQuery, setSearchQuery, isImg, imgAct})}/>
        </div>

      </div>

      <CarLine props={{ car: carTop }} key={`LastCarLineTop`} />

      {
        search?.length
        ?
        search.map((car, c) =>{
          return(
            <CarLine props={{ car }} key={`LastCarLine${c}${car?.id}`} />
          )
        })
        :
        lastSoftwares.slice(0, visibleCount).map((car, c) =>{
          return(
            <CarLine props={{ car }} key={`LastCarLine${c}${car?.id}`} />
          )
        })
      }

      {
        !search?.length && visibleCount < lastSoftwares.length &&
        <div className="LoadMore flex start">
          <span className="LoadMoreBtn flex" onClick={loadMore}>{SoftTr("loadMore", lang)}</span>
        </div>
      }
      
    </div>
  )
}
