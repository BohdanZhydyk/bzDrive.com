import React, { useState } from "react"

import CarLine from "./CarLine"
import { SoftTr } from "./SoftwareTranslate"
import { bzScroolToDiv } from "../../../AppFunctions"


export function LastSoftware({ props: { initialState, carTop, lang } }) {

  const step = 5

  const [visibleCount, setVisibleCount] = useState(step)

  const lastSoftwares = initialState.sort((a, b) => b.id.localeCompare(a.id))

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + step)
    bzScroolToDiv("LoadMoreBtn", 0)
  }

  return (
    <div className="LastSoftware flex column start">

      <div className="LastSoftTitle flex start bold">
        {`${SoftTr("LastSoftware", lang)} (${visibleCount}/${initialState?.length})`}
      </div>

      <CarLine props={{ car: carTop }} key={`LastCarLineTop`} />

      {
        lastSoftwares.slice(0, visibleCount).map((car, c) =>{
          return(
            <CarLine props={{ car }} key={`LastCarLine${c}${car?.id}`} />
          )
        })
      }

      {
        visibleCount < lastSoftwares.length &&
        <div className="LoadMore flex start">
          <span className="LoadMoreBtn flex" onClick={loadMore}>{SoftTr("loadMore", lang)}</span>
        </div>
      }
      
    </div>
  )
}
