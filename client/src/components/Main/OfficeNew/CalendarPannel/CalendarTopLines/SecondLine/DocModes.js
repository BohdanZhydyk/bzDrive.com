import React from "react"

import { tr } from "../../../../../../AppTranslate"
import DownloadBar from "./../../../../../All/DownloadBar"


export function DocModes({ props:{user, docSelect, forms, setForms, scroolTo, dowloadBar, Reducer} }){

  function DOC_MODE_BTN_CLICK(mode){
    if(forms?.newDocBtn){
      setForms( {newDocBtn:false, filterDocBtn:true} )
      Reducer({ type:"OPEN_CLOSE_NEW_DOCUMENT", mode, scroolTo })
    }
    if(forms?.filterDocBtn){
      Reducer({ type:"SELECT_MODES", mode })
    }
  }

  return(
    <div className={`DocModes ${forms?.newDocBtn ? `ToNewDocBtn` : ``} flex`}>

      <div className="DownloadBarWrapper flex start">
        { dowloadBar && <DownloadBar props={{color:`#171`}} /> }
      </div>

      {
        docSelect.map( (btn, b)=>{

          const newDocBtn = forms?.newDocBtn ? `NewDocBtnHover` : ``
          const filterDocBtnActive = btn?.act ? `FilterDocBtnActive` : ``
          const filterDocBtn = forms?.filterDocBtn ? `FilterDocBtnHover ${filterDocBtnActive}` : ``
          const classes = `DocModeBtn ${newDocBtn} ${filterDocBtn} radius flex`
          const title = tr(`DocName_${btn?.name}`, user?.lang)[!forms?.filterDocBtn ? 0 : 1]

          return(
            <div className={classes} onClick={()=>DOC_MODE_BTN_CLICK(btn?.name)} title={title} key={`DocModeBtn${b}`}>
              <span>{btn?.name}</span>
            </div>
          )
          
        })
      }

    </div>
  )
}
