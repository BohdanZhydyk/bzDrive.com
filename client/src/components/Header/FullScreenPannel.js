import React from "react"
import { GetUser, SetUser } from "../../AppFunctions"

import ActionBtn from "../All/ActionBtn"
import AuthPanel from "./AuthPannel"
import NavPannel from "./NavPannel"


import { tr } from "../../AppTranslate"
import { AuthReducer } from "./AuthPannel/AuthReducer"


export function FullScreenPannel({ props:{info, nav, blur, BLUR, AppReload} }) {

  const user = GetUser()
  const lang = user.lang
  const login = user.login
  const languages = ["en", "ua", "pl"]
  const icoLogOut = `https://bzdrive.com/files/ico/icoLogOut.png`

  const icoLng = (lang)=> `https://bzdrive.com/files/ico/lng/lng${lang}.png`

  const LNG_CHG = (lang)=>{
    SetUser( {...user, lang} )
    BLUR()
  }

  const LOGOUT = ()=> AuthReducer( { type:"LOGOUT", act:"logout" }, false, false, AppReload )

  return (
    <div className="FullScreenPannel">

      <div className="BlurPannel flex" onClick={()=>blur && BLUR()}></div>

      {
        blur &&
        <div className="SidePannel">

          <div className="SidePannelTop flex end">

            <div className="LangPannel flex">
            {
              languages.map( (lng, l)=>{
                const key = `LangFlagBtn${l}`
                const cl = `ImgBtn${lang === lng ? `` : `Small`}`
                return(
                  <img className={cl} src={icoLng(lng)} alt={`flag_${lng}`} onClick={()=>LNG_CHG(lng)} key={key} />
                )
              })
            }
            </div>

            <ActionBtn props={{name:`cancel`, click:BLUR}} />

          </div>

          { blur === "ava" && <AuthPanel props={{AppReload}} /> }

          { blur === "nav" && <NavPannel props={{info, nav, BLUR, burger:true}}/> }

          <div className="AuthBottomPannel flex stretch end wrap">

            <div className="CookiesLink flex bold">
              <a href="/cookies" target="_blank" rel="noreferrer">
                {tr(`PrivacyBtn`,lang)}
              </a>
            </div>

            {
              login &&
              <div className="Logout flex end" onClick={ ()=>LOGOUT() }>
                <span className="txtRed flex">{tr(`LogOutBtn`,lang)}</span>
                <img className="ImgBtnSmall" src={icoLogOut} alt="logout" />
              </div>
            }

            </div>

          </div>
      }

    </div>
  )
}