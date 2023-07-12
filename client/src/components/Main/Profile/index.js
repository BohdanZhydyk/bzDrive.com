import React, { useState } from "react"

import "./Profile.scss"
import { tr } from "../../../AppTranslate"
import { GetUser, sanitizeTxt } from "../../../AppFunctions"
import ActionBtn from "../../All/ActionBtn"
import Input from "../../All/Input"
import RadioInput from "../../All/RadioInput"


function Profile() {

  const lang = GetUser()?.lang

  const [user, setUser] = useState( GetUser() )

  const [email, setEmail] = useState( {val:user?.email, edit:false, err:false} )
  const [pass, setPass] = useState( {val:'', edit:false, err:false} )
  const [verify, setVerify] = useState( {val:'', edit:false, err:false} )
  const [userLang, setUserLang] = useState( {val:user?.lang, values:["en","ua","pl"], edit:false, err:false} )
  const [gender, setGender] = useState( {val:user?.sex, values:["male","female"], edit:false, err:false} )

  const login = user?.login
  const role = user?.role
  const ava = user?.ava

  const SAVE_PROFILE = ()=>{
    // save action
    alert("save")
  }

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

  const saveBtnProps = { name:"save", click:SAVE_PROFILE }

  const emailProps = {
    legend: tr(`EmailLegend`,lang),
    type: `text`,
    plhol: tr(`PlaceHolder`,lang),
    val: email?.val ? sanitizeTxt(email.val, `email`).sanText : '',
    err: email?.err ?? '',
    cbVal: (val)=> setEmail( (prev)=> ({...prev, val:sanitizeTxt(val, `email`).sanText, edit:true}) ),
    cbErr: (val)=> setEmail( (prev)=> ({...prev, err:sanitizeTxt(val, `email`).sanErr}))
  }
  const passProps = {
    legend: tr(`PassLegend`,lang),
    type: `password`,
    plhol: tr(`PlaceHolder`,lang),
    val: pass?.val ? sanitizeTxt(pass.val, `pass`).sanText : '',
    err: pass?.err ?? '',
    cbVal: (val)=> setPass( (prev)=> ({...prev, val:sanitizeTxt(val, `pass`).sanText, edit:true}) ),
    cbErr: (val)=> setPass( (prev)=> ({...prev, err:sanitizeTxt(val, `pass`).sanErr}))
  }
  const verifyProps = {
    legend: tr(`VerifyLegend`,lang),
    type: `password`,
    plhol: tr(`PlaceHolder`,lang),
    val: verify?.val ? sanitizeTxt(verify.val, `verify`).sanText : '',
    err: verify?.err ?? '',
    cbVal: (val)=> setVerify( (prev)=> ({...prev, val:sanitizeTxt(val, `verify`).sanText, edit:true}) ),
    cbErr: (val)=> setVerify( (prev)=> ({...prev, err:sanitizeTxt(val, `verify`).sanErr}))
  }
  // const confirmProps = {
  //   legend: tr(`ConfirmLegend`,lang),
  //   type: `text`,
  //   plhol: tr(`PlaceHolder`,lang),
  //   val: formData?.confirm ? sanitizeTxt(formData.confirm, `confirm`).sanText : '',
  //   err: formErr?.confirm ?? '',
  //   cbVal: (val)=> setFormData( (prev) => ({
  //     ...prev, confirm:sanitizeTxt(val, `confirm`).sanText
  //   })),
  //   cbErr: (val)=> setFormErr( (prev) => ({
  //     ...prev, confirm:sanitizeTxt(val, `confirm`).sanErr
  //   }))
  // }
  const langProps = {
    radios: userLang?.values,
    images: [
      "https://bzdrive.com/files/ico/lng/lngen.png",
      "https://bzdrive.com/files/ico/lng/lngua.png",
      "https://bzdrive.com/files/ico/lng/lngpl.png"
    ],
    act: userLang?.values.indexOf(userLang?.val),
    cb: (nr)=> setUserLang( prev=> ({...prev, val:userLang?.values[nr], edit:true}) )
  }
  const genderProps = {
    radios: gender?.values,
    images: [
      "https://bzdrive.com/files/users/male.png",
      "https://bzdrive.com/files/users/female.png"
    ],
    act: gender?.values.indexOf(gender?.val),
    cb: (nr)=> setGender( prev=> ({...prev, val:gender?.values[nr], edit:true}) )
  }

  const sections = [
    {
      name: `Email change`,
      act: email?.act,
      edit: email?.edit,
      fn: ()=>ACTIVE_SECTION("email"),
      component:
      <div className="InputsPannel flex column">
        <Input props={emailProps} />
      </div>
    },
    {
      name: `Password change`,
      act: (pass?.act || verify?.act ),
      edit: (pass?.edit || verify?.edit),
      fn: ()=>ACTIVE_SECTION("pass"),
      component:
      <div className="InputsPannel flex column">
        <Input props={passProps} />
        <Input props={verifyProps} />
      </div>
    },
    {
      name: `Language change`,
      act: userLang?.act,
      edit: userLang?.edit,
      fn: ()=>ACTIVE_SECTION("lang"),
      component:
      <div className="InputsPannel flex column">
        <RadioInput props={langProps} />
      </div>
    },
    {
      name: `Gender change`,
      act: gender?.act,
      edit: gender?.edit,
      fn: ()=>ACTIVE_SECTION("gender"),
      component:
      <div className="InputsPannel flex column">
        <RadioInput props={genderProps} />
      </div>
    }
  ]

  console.log("user", user)

  return(
    <div className="Profile flex column">
    {
      user?.login &&
      <>
        <div className="UserLogin flex start bold">{`[${role}] - ${login}`}</div>

        <div className="ProfilePannel flex stretch wrap">

          <div className="ProfileUser flex column start">
            <img className="ProfileAva flex" src={`https://bzdrive.com/files/users/${ava}`} alt="ava" />
          </div>

          <div className="ProfileSections flex column start">

            <div className="ProfileSectionWraper flex start stretch wrap">

            {
              sections.map( (sect, s)=>{
                const classes = `SectionName ${sect?.act ? `ActiveName` : ``} flex start bold`
                const key = `ProfileSection${s}`
                return(
                  <section className="ProfileSection flex column start" key={key}>
                    <div className={classes} onClick={()=>sect?.fn()}><span>{sect?.name}</span></div>
                    {
                      sect?.act &&
                      <div className="SectionArea flex column start">
                        <div className="SectionLine flex start">
                          { sect?.component }
                          { sect?.edit && <ActionBtn props={saveBtnProps} /> }
                        </div>
                      </div>
                    }
                  </section>
                )
              })
            }

            </div>

          </div>

        </div>
      </>
    }

    </div>
  )
}

export default Profile