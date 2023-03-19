import React from 'react'
import { bzPriceToWord, SumArray } from '../../../../../AppFunctions'

import "./ElSummary.scss"


function ElSummary({ props:{nr, articles} }){

  const sum = SumArray(articles?.map( (el)=> el.SUM ) )
  const word = bzPriceToWord(sum)
  const method = nr.method === 0 ? 'gotówka' : 'przelew'
  const to = nr?.to

  const summary = [
    {name:`Do zapłaty`,         component: sum,     cl1:`TopCell bold`},
    {name:`Kwota słownie`,      component: word,    cl2:`LinesCell`},
    {name:`Sposób płatności`,   component: method,  cl2:`LinesCell`},
    {name:`Termin płatności`,   component: to,      cl2:`LinesCell`}
  ]

  return(
    <section className="ElSummary flex column">
    {
      summary?.map( (line, l)=>{

        const key = `SumLine${l}`
        const nameCl = `SumName ${line.cl1 ?? ``} flex start`
        const valueCl = `SumValue ${line.cl1 ?? ``}  ${line.cl2 ?? ``} flex start`

        return(
          <div className="SumLine flex stretch" key={key}>
            <div className="SumEmpty"></div>
            <div className={nameCl}>{`${line.name} :`}</div>
            <div className={valueCl}>{line.component}</div>
          </div>
        )

      })
    }

    </section>
  )
}

export default ElSummary 