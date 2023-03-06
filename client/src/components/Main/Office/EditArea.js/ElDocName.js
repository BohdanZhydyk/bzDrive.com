import React from "react"

import { DocNameNormalize } from "../ZL/ZLfunctions"
import Input from "../../../All/Input"


export function ElDocName({ props:{mode, nr, setNr, setSave} }) {

  const DocSignProps = [
    {
      legend: "place", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: nr?.place ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setNr( (prev) => ({...prev, place:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "from", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: nr?.from ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setNr( (prev) => ({...prev, from:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    },
    {
      legend: "to", //tr(`LogInLegend`,lang),
      type: `text`,
      plhol: "right here...", //tr(`PlaceHolder`,lang),
      val: nr?.to ?? '',
      // err: formErr?.login ?? '',
      cbVal: (val)=>{
        setNr( (prev) => ({...prev, to:val}))
        setSave(true)
      }, //sanitizeTxt(val, `login`).sanText
      // cbErr: (val)=> setFormErr( (prev) => ({
      //   ...prev, login:sanitizeTxt(val, `login`).sanErr
      // }))
    }
  ]

  return(
    <div className="ElDocName flex column">

      <div className="DocTitle bold flex">
        <div className="DocName flex end">{`${mode} Nr`}</div>
        <div className="DocNr flex">{DocNameNormalize(nr)}</div>
      </div>

      <div className="DocSign flex end">
      {
        DocSignProps.map( (input, i)=> <Input props={input} key={`DocSignInput${i}`}/> )
      }
      </div>

    </div>
  )
}