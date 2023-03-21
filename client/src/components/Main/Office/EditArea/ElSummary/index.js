import React from 'react'

import "./ElSummary.scss"
import { tr } from "../../../../../AppTranslate"
import { bzPriceToWord, GetUser, SumArray } from '../../../../../AppFunctions'
import Input from "../../../../All/Input"
import RadioInput from '../../../../All/RadioInput'


function ElSummary({ props:{nr, setNr, setSave, articles, printMode} }){

  const lang = GetUser().lang

  const sum = SumArray(articles?.map( (el)=> el.SUM ) )
  const word = bzPriceToWord(sum)
  const toStr = nr?.to.toString()
  const to = `${toStr.slice(6,8)}.${toStr.slice(4,6)}.${toStr.slice(0,4)}`

  const radios = tr("MethodRadioBtns",lang)
  const method = nr?.method ?? 0
  const methodTxt = radios[method]

  const METHOD_CHG = (method)=>{
    setSave(true)
    setNr({...nr, method})
  }

  const toProps = {
    type: `date`,
    val: nr?.to ?? '',
    cbVal: (val)=>{
      setNr( (prev)=> ( val >= prev.from ? {...prev, to:val} : {...prev, from:val, to:val} ))
      setSave(true)
    },
    cbErr: ()=>{}
  }

  const summary = [
    {
      name:tr("SummaryLineTop",lang),
      cl1:`TopCell bold`,
      component: sum
    },
    {
      name:tr("SummaryAmount",lang),
      cl2:`LinesCell`,
      component: word
    },
    {
      name:tr("SummaryMethod",lang),
      cl2:`LinesCell`,
      component: printMode
        ? methodTxt
        : <RadioInput props={{radios, act:method, cb:(method)=>METHOD_CHG(method)}} />
    },
    {
      name:tr("SummaryDeadline",lang),
      cl2:`LinesCell`,
      component: printMode
        ? to
        : <Input props={toProps} />
    }
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