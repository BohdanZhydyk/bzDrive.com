import { emailProps, langProps, passProps, verifyProps, confirmProps, genderProps } from "./propses"

import InputText from "../../All/InputText"
import RadioInput from "../../All/RadioInput"


export const saveBtnProps = ()=>{

  const SAVE_PROFILE = ()=>{
    // save action
    alert("save")
  }

  return { name:"save", click:SAVE_PROFILE }
}

export const sections = (props)=>{

  const {
    user, setUser,
    userLang, setUserLang,
    email, setEmail,
    pass, setPass,
    verify, setVerify,
    confirm, setConfirm,
    gender, setGender
  } = props

  const ACTIVE_SECTION = (btn)=>{
    switch(btn){
      case "email":
        setEmail(prev=> ({...prev, val:user?.email, act:!prev.act, edit:false, err:false}) )
        setPass(prev=> ({...prev, act:false, edit:false, err:false}) )
        setVerify(prev=> ({...prev, act:false, edit:false, err:false}) )
        setUserLang(prev=> ({...prev, act:false, edit:false, err:false}) )
        setGender(prev=> ({...prev, act:false, edit:false, err:false}) )
        break
      case "pass":
        setEmail(prev=> ({...prev, act:false, edit:false, err:false}) )
        setPass(prev=> ({...prev, val:'', act:!prev.act, edit:false, err:false}) )
        setVerify(prev=> ({...prev, val:'', act:!prev.act, edit:false, err:false}) )
        setUserLang(prev=> ({...prev, act:false, edit:false, err:false}) )
        setGender(prev=> ({...prev, act:false, edit:false, err:false}) )
        break
      case "lang":
        setEmail(prev=> ({...prev, act:false, edit:false, err:false}) )
        setPass(prev=> ({...prev, act:false, edit:false, err:false}) )
        setVerify(prev=> ({...prev, act:false, edit:false, err:false}) )
        setUserLang(prev=> ({...prev, val:user?.lang, act:!prev.act, edit:false, err:false}) )
        setGender(prev=> ({...prev, act:false, edit:false, err:false}) )
        break
      case "gender":
        setEmail(prev=> ({...prev, act:false, edit:false, err:false}) )
        setPass(prev=> ({...prev, act:false, edit:false, err:false}) )
        setVerify(prev=> ({...prev, act:false, edit:false, err:false}) )
        setUserLang(prev=> ({...prev, act:false, edit:false, err:false}) )
        setGender(prev=> ({...prev, val:user?.sex, act:!prev.act, edit:false, err:false}) )
        break
      default: break
    }
  }

  return [
    {
      name: `Password change`,
      act: (pass?.act || verify?.act ),
      edit: (pass?.edit || verify?.edit),
      fn: ()=>ACTIVE_SECTION("pass"),
      component:
      <div className="InputsPannel flex column">
        <InputText props={passProps(pass, setPass)} />
        <InputText props={verifyProps(verify, setVerify)} />
      </div>
    },
    {
      name: `Email change`,
      act: email?.act,
      edit: email?.edit,
      fn: ()=>ACTIVE_SECTION("email"),
      component:
      <div className="InputsPannel flex column">
        <InputText props={emailProps(email, setEmail)} />
      </div>
    },
    {
      name: `Language change`,
      act: userLang?.act,
      edit: userLang?.edit,
      fn: ()=>ACTIVE_SECTION("lang"),
      component:
      <div className="InputsPannel flex column">
        <RadioInput props={langProps(userLang, setUserLang)} />
      </div>
    },
    {
      name: `Gender change`,
      act: gender?.act,
      edit: gender?.edit,
      fn: ()=>ACTIVE_SECTION("gender"),
      component:
      <div className="InputsPannel flex column">
        <RadioInput props={genderProps(gender, setGender)} />
      </div>
    }
  ]
}