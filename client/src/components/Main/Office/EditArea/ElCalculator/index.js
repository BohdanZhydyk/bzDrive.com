import React from 'react'

import './ElCalculator.scss'
import { SumArray } from '../../../../../AppFunctions'
import { tr } from '../../../../../AppTranslate'
import { ArticleCalc, SanQuantity, SanQuates } from './ElCalculatorLogic'
import ActionBtn from '../../../../All/ActionBtn'
import { CalcLine } from './CalcLine'


function ElCalculator({ props:{user, articles, setArticles, setSave, printMode} }){

  const lang = user.lang

  const emptyArticle = {ART:"",PRI:"0.00",QUA:"1",VAT:"23",NET:"0.00",PRV:"0.00",SUM:"0.00"}

  if(!articles){ articles = [emptyArticle] }

  const PLUS_ART_FIRST = ()=>{
    setSave(true)
    setArticles([emptyArticle, ...articles])
  }
  const PLUS_ART_LAST = ()=>{
    setSave(true)
    setArticles([...articles, emptyArticle])
  }
  const DEL_ART = (a)=>{
    setSave(true)
    setArticles(articles.filter( (art, n)=> (n !== a) && art ))
  }
  const CHG_ART = (name, val, a)=>{
    setSave(true)
    setArticles( articles.map( (art, i)=> i === a ? ArticleCalc(name, art, val) : art ) )
  }

  const topLine = ()=> [{
    CLA: `TableCellTop`,
    NUM: tr(`TableNUM`,lang),
    ART: tr(`TableART`,lang),
    PRI: `${tr(`TablePRI`,lang)}, zł`,
    QUA: tr(`TableQUA`,lang),
    VAT: `${tr(`TableVAT`,lang)}, %`,
    NET: `${tr(`TableNET`,lang)}, zł`,
    PRV: `${tr(`TablePRV`,lang)}, zł`,
    SUM: `${tr(`TableSUM`,lang)}, zł`,
    BTN: <ActionBtn props={{ name:`plus`, click:()=>PLUS_ART_FIRST() }} />,
    printMode
  }]

  const artLine = (art, a)=> ({
    CLA: `TableCell`,
    NUM: `${a + 1}.`,
    ART: art.ART,
    PRI: SanQuates(art.PRI),
    QUA: SanQuantity(art.QUA),
    VAT: SanQuantity(art.VAT),
    NET: SanQuates(art.NET),
    PRV: SanQuates(art.PRV),
    SUM: SanQuates(art.SUM),
    FN: (name, val)=>CHG_ART(name, val, a),
    BTN: <ActionBtn props={{ name:`delete`, click:()=>DEL_ART(a) }} />,
    printMode
  })

  const bottomLine = ()=> [{
    CLA: `TableCellBottom`,
    NUM: ``,
    ART: ``,
    TOT: `${tr(`TableTOT`,lang)} :`,
    NET: SumArray(articles.map(el=> el.NET)),
    PRV: SumArray(articles.map(el=> el.PRV)),
    SUM: SumArray(articles.map(el=> el.SUM)),
    BTN: <ActionBtn props={{ name:`plus`, click:()=>PLUS_ART_LAST() }} />,
    printMode
  }]

  return(
    <section className="ElCalculator flex column">

      <div className="CalculatorPannelTop bold flex">
      {
        topLine().map( (article, a)=>{
          const key = `CalcLineTop`
          return(
            <CalcLine props={article} key={key} />
          )
        })
      }
      </div>

      {
        articles && articles.map( (art, a)=>{
          const key = `CalcLine${a}`
          return(
            <CalcLine props={ artLine(art, a) } key={key} />
          )
        })
      }

      <div className="CalculatorPannelBottom bold flex">
      {
        bottomLine().map( (article, a)=>{
          const key = `CalcLineTop`
          return(
            <CalcLine props={article} key={key} />
          )
        })
      }
      </div>

    </section>
  )
}

export default ElCalculator