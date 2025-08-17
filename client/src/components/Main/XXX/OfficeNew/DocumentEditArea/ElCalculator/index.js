import React from 'react'

import './ElCalculator.scss'
import { artLine, bottomLine, emptyArticle, topLine } from './ElCalculatorLogic'
import { CalcLine } from './CalcLine'


function ElCalculator({ props:{tr, lang, mode, articles, setArticles, setSave, printMode} }){

  if(!articles?.length){ setArticles( prev=> [emptyArticle()] ) }

  return(
    <section className="ElCalculator flex column">

      <div className="CalculatorPannelTop bold flex">
      {
        topLine(setSave, setArticles, printMode, lang).map( (article, a)=>{
          return <CalcLine props={article} key={`CalcLineTop${a}`} />
        })
      }
      </div>

      {
        articles.map( (art, a)=>{
          const props = artLine(setSave, setArticles, printMode, art, a)
          return <CalcLine props={props} key={`CalcLine${a}`} />
        })
      }

      <div className="CalculatorPannelBottom bold flex">
      {
        bottomLine(articles, setSave, setArticles, printMode, lang).map( (article, a)=>{
          return <CalcLine props={{...article, setArticles, setSave, mode}} key={`CalcLineTop${a}`} />
        })
      }
      </div>

    </section>
  )
}

export default ElCalculator