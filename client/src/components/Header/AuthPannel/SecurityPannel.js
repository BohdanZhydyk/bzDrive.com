import React from "react"

import { tr } from "../../../AppTranslate"
import Input from "../../All/Input"


export function SecurityPannel({ props:{lang, act, formErr, propses, CHG_ACT, SUBMIT} }) {
  
  const anyErr = Object.values(formErr).some(val => val !== false)

  const SUBMIT_CLICK = ()=> !anyErr && SUBMIT()
  const colorBtn = `Button ColorBtn${anyErr ? `Red` : `Grn`} flex`

  return (
    <div className="SecurityPannel flex column">

      <form className="FormPannel flex column">

        { ['login', 'signup'].includes(act[0]) && <Input props={ propses().login }/> }

        { ['signup', 'forgot'].includes(act[0]) && <Input props={ propses().email }/> }

        { ['login', 'signup', 'forgot'].includes(act[0]) && <Input props={ propses().pass }/> }

        { ['signup', 'forgot'].includes(act[0]) && <Input props={ propses().verify }/> }

        { ['confirm'].includes(act[0]) && <Input props={ propses().confirm }/> }

        <div className={colorBtn} onClick={ ()=> SUBMIT_CLICK() }>
          {tr(`${act[1]}Btn`,lang)}
        </div>
        
      </form>

      <div className="EnotherButtons flex">
        <div className="Button ColorBtnGrn flex" onClick={()=>CHG_ACT(act[2])}>{tr(`${act[2]}Btn`,lang)}</div>
        <div className="Button ColorBtnGrn flex" onClick={()=>CHG_ACT(act[3])}>{tr(`${act[3]}Btn`,lang)}</div>
      </div>

      <div className="Link flex"><a href="/privacy">{tr(`PrivacyBtn`,lang)}</a></div>

    </div>
  )
}