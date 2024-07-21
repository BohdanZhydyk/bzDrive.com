import React, { useState } from "react"

import { bzCalc } from "../../../../AppFunctions"
import QuaBtns from "../QuaBtns"


export function ArticleLine({ props:{article, a} }){

  const isTop = a === 0

  const [qua, setQua] = useState(article?.qua)

  const NUM = isTop ? article?.NUM : a
  const ART = article?.ART
  const QUA = isTop ? article?.QUA : <QuaBtns props={{QUA:article?.QUA, qua, setQua}}/>
  const PRI = isTop ? article?.PRI : article?.PRI
  const SUM = isTop ? article?.SUM : bzCalc("*", qua, article?.PRI)
  const PRV = isTop ? article?.PRV : bzCalc("*", SUM, "0.23")
  const NET = isTop ? article?.NET : bzCalc("-", SUM, PRV)

  const ArticleLineClasses = `ArticleLine ${isTop ? `ArticleTopLine` : ``} flex`

  return(
    <div className={ArticleLineClasses} key={`ArticleLine${a}`}>
      <div className="ArtCell NUM flex">{NUM}</div>
      <div className="ArtCell ART flex start">{ART}</div>
      <div className="ArtCell PRI flex end">{PRI}</div>
      <div className="ArtCell NET flex end">{NET}</div>
      <div className="ArtCell PRV flex end">{PRV}</div>
      <div className="ArtCell SUM flex end">{SUM}</div>
      <div className="ArtCell QUA flex end">{QUA}</div>
    </div>
  )
}