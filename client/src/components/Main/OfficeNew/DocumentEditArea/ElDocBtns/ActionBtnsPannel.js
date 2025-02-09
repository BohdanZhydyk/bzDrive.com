import React, { useState } from "react"


export function ActionBtnsPannel({ props:{tr, mode, lang, status, Reducer} }) {

  const [showMenu, setShowMenu] = useState( false )

  function SHOW_MENU(){ setShowMenu( prev=> true ) }
  function STATUS_CHANGE(statusName){
    setShowMenu( prev=> false )
    Reducer({ type:"STATUS_CHANGE", status:statusName })
  }

  const btns = ()=>{
    switch (mode) {
      case "ZL": return ['open', 'repair', 'close', 'delete']
      case "FS": return ['open', 'delete']
      case "FZ": return ['open', 'delete']
      case "PS": return ['open', 'delete']
      case "PZ": return ['open', 'delete']
      case "ZU": return ['open', 'delete']
      case "VA": return ['open', 'delete']
      default: return []
    }
  }

  return(
    <div className="ActionBtnsPannel">

      {
        btns().filter(btn=> btn === status).map( (btn, n)=>{

          const classes = `ActBtn ActBtn_${btn} flex`
          const key = `ActBtn${n}`
          const txt = tr(`ActionBtn_${btn}`, lang)

          return(
            <div className={classes} key={key} onClick={SHOW_MENU}>{ txt }</div>
          )
        })
      }

      <div className="ActionBtnsMenu">
      {
        showMenu && btns().filter(btn=> btn !== status).map( (btn, n)=>{

          const classes = `ActBtn ActBtn_${btn} flex`
          const key = `ActBtn${n}`
          const txt = tr(`ActionBtn_${btn}`, lang)

          return(
            <div className={classes} key={key} onClick={()=>STATUS_CHANGE(btn)}>{ txt }</div>
          )
        })
      }
      </div>

    </div>
  )
}