import React from 'react'

import './ElCalculator.scss'
import { artLine, bottomLine, emptyArticle, topLine } from './ElCalculatorLogic'
import { CalcLine } from './CalcLine'


function ElCalculator({ props:{user, articles, setArticles, setSave, printMode} }){

  if(!articles){ articles = [emptyArticle] }

  const lang = user?.lang

  return(
    <section className="ElCalculator flex column">

      <div className="CalculatorPannelTop bold flex">
      {
        topLine(articles, setSave, setArticles, printMode, lang).map( (article, a)=>{
          return <CalcLine props={article} key={`CalcLineTop${a}`} />
        })
      }
      </div>

      {
        articles && articles.map( (art, a)=>{
          const props = artLine(articles, setSave, setArticles, printMode, art, a)
          return <CalcLine props={props} key={`CalcLine${a}`} />
        })
      }

      <div className="CalculatorPannelBottom bold flex">
      {
        bottomLine(articles, setSave, setArticles, printMode, lang).map( (article, a)=>{
          return <CalcLine props={article} key={`CalcLineTop${a}`} />
        })
      }
      </div>

    </section>
  )
}

export default ElCalculator