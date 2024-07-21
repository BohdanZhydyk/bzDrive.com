import React, { useState } from "react"


export function ActionBtnsPannel({ props:{tr, mode, lang, setSave, status, setStatus} }) {

  const [menu, setMenu] = useState(false)

  function ACT_CHG(act){
    setSave(true)
    setStatus(act)
    setMenu(prev=>!prev)
  }

  const btns = ()=>{
    switch (mode) {
      case "ZU": return ['open', 'delete']
      case "FS": return ['open', 'delete']
      case "FZ": return ['open', 'delete']
      case "PS": return ['open', 'delete']
      case "PZ": return ['open', 'delete']
      case "ZL": return ['open', 'repair', 'close', 'delete']
      default: return []
    }
  }

  return(
    <div className="ActionBtnsPannel">

      {
        btns().filter(btn=> btn === status).map( (btn, n)=>{

          const classes = `ActBtn ${btn === status ? `ActBtn_${btn}` : ``} flex`
          const key = `ActBtn${n}`
          const txt = tr(`ActionBtn_${btn}`, lang)

          return(
            <div className={classes} key={key} onClick={()=>setMenu(prev=>!prev)}>
              { txt }
            </div>
          )
        })
      }

      <div className="ActionBtnsMenu">
      {
        menu && btns().filter(btn=> btn !== status).map( (btn, n)=>{

          const classes = `ActBtn ActBtn_${btn} flex`
          const key = `ActBtn${n}`
          const txt = tr(`ActionBtn_${btn}`, lang)

          return(
            <div className={classes} key={key} onClick={()=>ACT_CHG(btn)}>
              { txt }
            </div>
          )
        })
      }
      </div>

    </div>
  )
}