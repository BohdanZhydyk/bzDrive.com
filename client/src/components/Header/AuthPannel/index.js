import React, { useState } from "react"

import './AuthPannel.scss'
import { GetUser } from "../../../AppFunctions"
import { tr } from "../../../AppTranslate"
import { AuthProps } from "./AuthProps"
import { Input } from '../../All/Input'


function AuthPanel({ props:{} }) {

  const lang = GetUser().lang

  const [formData, setFormData] = useState({})
  const [act, setAct] = useState([`login`, `LogIn`, `SignUp`, `Forgot`])

  const propses = ()=> AuthProps(formData, setFormData, lang)

  const CHG_ACT = (act)=>{
    switch(act){
      case "LogIn":   setAct([`login`, `LogIn`, `SignUp`, `Forgot`]);   setFormData({}); return;
      case "SignUp":  setAct([`signup`, `SignUp`, `LogIn`, `Forgot`]);  setFormData({}); return;
      case "Forgot":  setAct([`forgot`, `Forgot`, `LogIn`, `SignUp`]);  setFormData({}); return;
      default:        setAct([`login`, `LogIn`, `SignUp`, `Forgot`]);   setFormData({}); return;
    }
  }

  return (
    <div className="AuthPanel flex column">

      <form className="FormPannel flex column">

        { ['login', 'signup'].includes(act[0]) && <Input props={ propses().login }/> }

        { ['signup', 'forgot'].includes(act[0]) && <Input props={ propses().email }/> }

        { ['login', 'signup', 'forgot'].includes(act[0]) && <Input props={ propses().pass }/> }

        { ['signup', 'forgot'].includes(act[0]) && <Input props={ propses().verify }/> }

        { ['confirm'].includes(act[0]) && <Input props={ propses().confirm }/> }

        <div className="Button flex" onClick={()=>CHG_ACT(act[1])}>{tr(`${act[1]}Btn`,lang)}</div>
        
      </form>

      <div className="EnotherButtons flex">
        <div className="Button flex" onClick={()=>CHG_ACT(act[2])}>{tr(`${act[2]}Btn`,lang)}</div>
        <div className="Button flex" onClick={()=>CHG_ACT(act[3])}>{tr(`${act[3]}Btn`,lang)}</div>
      </div>

      <div className="Link flex"><a href="/privacy">{tr(`PrivacyBtn`,lang)}</a></div>
            
    </div>
  )
}

export default AuthPanel