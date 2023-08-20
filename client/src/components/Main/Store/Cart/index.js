import React, { useEffect, useState } from "react"

import "./Cart.scss"
import SiteIcon from "../../../All/SiteIcon"
import { ArticleLine } from "./ArticleLine"
import { PostToApi, SumArray, bzCalc } from "../../../../AppFunctions"


function Cart({ props:{tr, lang, cart} }){

  const [myCart, setMyCart] = useState( false )

  const topLine = {
    NUM:tr("TableNUM", lang),
    ART:tr("TableART", lang),
    QUA:`${tr("TableQUA", lang)} / ${tr("TableQuantity", lang)} `,
    PRI:`${tr("TablePRI", lang)}, zł`,
    NET:`${tr("TableNET", lang)}, zł`,
    PRV:`${tr("TablePRV", lang)}, zł`,
    SUM:`${tr("TableSUM", lang)}, zł`
  }

  function CalcArticle(){
    const SUM = SumArray(myCart.map(el=> bzCalc("*", el.PRI, el.qua)))
    const VAT = bzCalc("*", SUM, "0.23")
    const NET = bzCalc("-", SUM, VAT)
    return {NET, VAT, SUM}
  }

  useEffect( ()=>{
    const query = {getQuantities:true, cart}
    !myCart && PostToApi( '/getStore', query, (data)=>{ setMyCart(prev=>data) })
  }, [])

  return(
    <div className="Cart flex column">
      {
        !myCart
        ?
        <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
        :
        <>

          {
            [topLine, ...myCart]?.map( (article, a)=>{
              return(
                <ArticleLine props={{article, a}} key={`ArticleLine${a}`} />
              )
            })
          }

          <div className="SumLine flex end">
            <div className="ArtCell TOT flex end">{tr("TableTOT", lang)}</div>
            <div className="ArtCell NET flex end">{CalcArticle()?.NET}</div>
            <div className="ArtCell PRV flex end">{CalcArticle()?.VAT}</div>
            <div className="ArtCell SUM flex end">{CalcArticle()?.SUM}</div>
            <div className="ArtCell QUA flex end"></div>
          </div>

        </>
      }
    </div>
  )
}

export default Cart