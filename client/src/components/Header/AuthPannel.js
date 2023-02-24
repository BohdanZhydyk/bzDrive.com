import React, { useState } from "react"

import { GetUser } from "../../AppFunctions"
import { tr } from "../../AppTranslate"
import { Input } from './../All/Input'


export function AuthPanel({ props:{} }) {

  const lang = GetUser().lang

  const [formData, setFormData] = useState({})
  const [act, setAct] = useState([`login`, `LogIn`, `SignUp`, `Forgot`])

  const CHG_ACT = (act)=>{
    switch(act){
      case "LogIn":   setAct([`login`, `LogIn`, `SignUp`, `Forgot`]);   setFormData({}); return;
      case "SignUp":  setAct([`signup`, `SignUp`, `LogIn`, `Forgot`]);  setFormData({}); return;
      case "Forgot":  setAct([`forgot`, `Forgot`, `LogIn`, `SignUp`]);  setFormData({}); return;
      default:        setAct([`login`, `LogIn`, `SignUp`, `Forgot`]);   setFormData({}); return;
    }
  }

  const sanitizeLogin = (txt)=> {
    const min = 4
    const max = 8
    let sanErr = false
    let sanText = txt ? txt.replace(/[^a-zA-Z0-9]/g, '').trim().slice(0, max) : ''
    if(sanText.length < min) sanErr = `must contain from ${min} to ${max} characters!`
    if(sanText.length < 1) sanErr = `this field cannot be empty!`
    return {sanText, sanErr}
  }

  const sanitizeEmail = (txt) => {
    const max = 64
    let sanErr = false
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let sanText = txt ? txt.trim().toLowerCase().slice(0, max) : ''
    if(!re.test(sanText)) sanErr = `wrong e-mail is entered!`
    if(sanText.length < 1) sanErr = `this field cannot be empty!`
    return {sanText, sanErr}
  }

  const sanitizePassword = (txt) => {
    const min = 8
    const max = 20
    let sanErr = false
    const regExDigit = /\d/
    const regExLowercase = /[a-z]/
    const regExUppercase = /[A-Z]/
    const regExSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/
    let sanText = txt ? txt.trim().slice(0, max) : ''
    // if(!regExSpecialChar.test(sanText)) sanErr = "must contain at least one special character!"
    if(!regExLowercase.test(sanText)) sanErr = "must contain at least one lowercase letter!"
    if(!regExDigit.test(sanText)) sanErr = "must contain at least one digit!"
    if(!regExUppercase.test(sanText)) sanErr = "must contain at least one uppercase letter!"
    if(sanText.length < min) sanErr = `must contain from ${min} to ${max} characters!`
    if(sanText.length < 1) sanErr = "this field cannot be empty!"
    return {sanText, sanErr}
  }

  const propsLogin = {
    legend: tr(`LogInLegend`,lang),
    type: `text`,
    plhol: tr(`PlaceHolder`,lang),
    val: formData?.login,
    sanit: (txt)=>sanitizeLogin(txt),
    cb: (val)=> setFormData( (prev) => ({...prev, login:val}) )
  }
  const propsEmail = {
    legend: tr(`EmailLegend`,lang),
    type: `email`,
    plhol: tr(`PlaceHolder`,lang),
    val: formData?.email,
    sanit: (txt)=>sanitizeEmail(txt),
    cb: (val)=> setFormData( (prev) => ({...prev, email:val}) )
  }
  const propsPassword = {
    legend: tr(`PassLegend`,lang),
    type: `password`,
    plhol: tr(`PlaceHolder`,lang),
    val: formData?.pass,
    sanit: (txt)=>sanitizePassword(txt),
    cb: (val)=> setFormData( (prev) => ({...prev, pass:val}) )
  }
  const propsVerifyPassword = {
    legend: tr(`VerifyLegend`,lang),
    type: `password`,
    plhol: tr(`PlaceHolder`,lang),
    val: formData?.verify,
    sanit: (txt)=>sanitizePassword(txt),
    cb: (val)=> setFormData( (prev) => ({...prev, verify:val}) )
  }
  const propsConfirm = {
    legend: tr(`ConfirmLegend`,lang),
    type: `text`,
    plhol: tr(`PlaceHolder`,lang),
    val: formData?.logconfirmin,
    sanit: (txt)=>sanitizePassword(txt),
    cb: (val)=> setFormData( (prev) => ({...prev, confirm:val}) )
  }

  return (
    <div className="AuthPanel flex column">

      <form className="FormPannel flex column">

        { ['login', 'signup'].includes(act[0]) && <Input props={propsLogin}/> }

        { ['signup', 'forgot'].includes(act[0]) && <Input props={propsEmail}/> }

        { ['login', 'signup', 'forgot'].includes(act[0]) && <Input props={propsPassword}/> }

        { ['signup', 'forgot'].includes(act[0]) && <Input props={propsVerifyPassword}/> }

        { ['confirm'].includes(act[0]) && <Input props={propsConfirm}/> }

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