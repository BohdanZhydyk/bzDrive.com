import React, { useState } from "react"

import './AuthPannel.scss'
import { GetUser } from "../../../AppFunctions"
import { AuthReducer } from "./AuthReducer"
import { tr } from "../../../AppTranslate"
import { AuthProps } from "./AuthProps"
import { UserInfo } from "./UserInfo"
import { SecurityPannel } from "./SecurityPannel"


function AuthPanel({ props:{AppReload} }) {

  const user = GetUser()
  const lang = user.lang
  const login = user.login
  const icoLogOut = `https://bzdrive.com/files/ico/icoLogOut.png`

  const [formData, setFormData] = useState({})
  const [act, setAct] = useState([`login`, `LogIn`, `SignUp`, `Forgot`])
  const [servErr, setServErr] = useState(false)

  const propses = ()=> AuthProps(formData, setFormData, lang, setServErr)

  const CHG_ACT = (act)=>{
    setFormData({})
    setServErr(false)
    switch(act){
      case "LogIn":   setAct([`login`, `LogIn`, `SignUp`, `Forgot`]);  return;
      case "SignUp":  setAct([`signup`, `SignUp`, `LogIn`, `Forgot`]); return;
      case "Forgot":  setAct([`forgot`, `Forgot`, `LogIn`, `SignUp`]); return;
      default:        setAct([`login`, `LogIn`, `SignUp`, `Forgot`]);  return;
    }
  }

  const SUBMIT = ()=> AuthReducer( { type:"SUBMIT", act:act[0], formData }, setServErr, AppReload )
  const LOGOUT = ()=> AuthReducer( { type:"LOGOUT", act:act[0], formData }, setServErr, AppReload )

  return (
    <div className="AuthPanel flex column">

    {
      login
      ? <UserInfo props={{user}}/>
      : <SecurityPannel props={{lang, act, servErr, propses, CHG_ACT, SUBMIT}}/>
    }

      {
        login &&
        <div className="Logout flex between" onClick={ ()=>LOGOUT() }>
          <span className="txtRed">{tr(`LogOutBtn`,lang)}</span>
          <img className="ImgBtnSmall" src={icoLogOut} alt="logout" />
        </div>
      }
            
    </div>
  )
}

export default AuthPanel