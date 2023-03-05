import React from "react"
import { GetUser, SetUser } from "../../AppFunctions"

import ActionBtn from "../All/ActionBtn"
import AuthPanel from "./AuthPannel"


export function FullScreenPannel({ props:{blur, BLUR, AppReload} }) {

  const user = GetUser()
  const lang = GetUser().lang
  const languages = ["en", "ua", "pl"]

  const icoLng = (lang)=> `https://bzdrive.com/files/ico/lng/lng${lang}.png`

  const LNG_CHG = (lang)=>{
    SetUser( {...user, lang} )
    BLUR()
  }

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

          <AuthPanel props={{AppReload}} />

        </div>
      }

    </div>
  )
}