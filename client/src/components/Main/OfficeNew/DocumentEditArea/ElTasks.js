import React from "react"

import TextArea from "../../../All/TextArea"


export function ElTasks({ props:{tr, lang, tasks, setTasks, setSave, printMode} }) {

  const TextAreaProps = {
    plhol: tr(`PlaceHolder`,lang),
    val: tasks ?? '',
    cbVal: (val)=>{ setSave(true); setTasks( (prev) => val ) },
    cbErr: (val)=> {}
  }

  const title = tr(`TasksTop`,lang)

  const strToLines = (str)=>{

    if(!str || str === "") return ""
    
    return(
      str.split('\n').map( (line, l)=>{
        let key = `StrToLines_${l}_${Math.floor(Math.random() * 5)}`
        return (<div className="Line flex start" key={key}>{line}</div>)
      })
    )
  }

  return(
    <section className="ElTasks flex column">

      <div className="TasksTop bold flex start">{title}</div>

      <div className="TextAreaSection flex column start">
      {
        printMode
        ? <div className="StrToLines">{ strToLines(tasks?.faults) }</div>
        : <TextArea props={TextAreaProps}/>
      }
      </div>

    </section>
  )
}