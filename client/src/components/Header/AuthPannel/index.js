import React, { useState } from "react"

import './AuthPannel.scss'
import { GetUser } from "../../../AppFunctions"
import { AuthReducer } from "./AuthReducer"
import { AuthProps } from "./AuthProps"
import { UserInfo } from "./UserInfo"
import { SecurityPannel } from "./SecurityPannel"


function AuthPanel({ props:{AppReload} }) {

  const user = GetUser()
  const lang = user.lang
  const login = user.login

  const [formData, setFormData] = useState({})
  const [formErr, setFormErr] = useState({})
  const [act, setAct] = useState([`login`, `LogIn`, `SignUp`, `Forgot`])

  const propses = ()=> AuthProps(lang, formData, setFormData, formErr, setFormErr)

  const CHG_ACT = (act)=>{
    setFormData({})
    setFormErr(false)
    switch(act){
      case "LogIn":   setAct([`login`, `LogIn`, `SignUp`, `Forgot`]);  return;
      case "SignUp":  setAct([`signup`, `SignUp`, `LogIn`, `Forgot`]); return;
      case "Forgot":  setAct([`forgot`, `Forgot`, `LogIn`, `SignUp`]); return;
      case "Confirm": setAct([`confirm`, `Confirm`]); return;
      default:        setAct([`login`, `LogIn`, `SignUp`, `Forgot`]);  return;
    }
  }

  const SUBMIT = ()=> AuthReducer( { type:"SUBMIT", act:act[0], formData }, setFormErr, CHG_ACT, AppReload )

  return (
    <div className="AuthPanel flex column">

      {
        login
        ? <UserInfo props={{user}}/>
        : <SecurityPannel props={{lang, act, formErr, propses, CHG_ACT, SUBMIT}}/>
      }
            
    </div>
  )
}

export default AuthPanel