import React from "react"
import { GetUser, SetUser } from "../../AppFunctions"

import AuthPanel from "./AuthPannel"


export function FullScreenPannel({ props:{blur, BLUR, AppReload} }) {

  const user = GetUser()
  const lang = GetUser().lang
  const languages = ["en", "ua", "pl"]

  const icoCancel = `https://bzdrive.com/files/ico/icoCancel.png`
  const icoLng = (lang)=> `https://bzdrive.com/files/ico/lng/lng${lang}.png`

  const LNG_CHG = (lang)=> SetUser( {...user, lang} )

  return (
    <div className="FullScreenPannel">

      <div className="BlurPannel flex" onClick={()=>blur && BLUR()}></div>

      {
        blur &&
        <div className="SidePannel">

          <div className="SidePannelTop flex end" onClick={()=>BLUR()}>

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

            <img className="ImgBtn" src={icoCancel} alt="cancel" />

          </div>

          <AuthPanel props={{AppReload}} />

        </div>
      }

    </div>
  )
}