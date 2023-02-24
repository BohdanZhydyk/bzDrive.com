import React from "react"

import { Input } from './../All/Input'


export function FullScreenPannel({ props:{blur, BLUR} }) {

  const propsEmail = {
    legend: `email`,
    type:`email`,
    plhol:`wprowadź dane...`,
    val:``
  }
  const propsPassword = {
    legend: `password`,
    type:`password`,
    plhol:`wprowadź dane...`,
    val:``
  }

  const authLinks = [`Zaloguj się`, `Zarejestruj się`, `Resetowanie hasła`]
  const actLinks = [`Log In`, `Sign Up`, `Forgot Password?`, `Privacy Policy`]

  return (
    <div className="FullScreenPannel">

      <div className="BlurPannel flex" onClick={()=>blur && BLUR()}></div>

      {
        blur &&
        <div className="SidePannel">

          <div className="SidePannelTop flex"></div>

          <div className="AuthPanel flex column">

            <div className="Title">{authLinks[0]}</div>

            <form className="FormPannel flex column">

              <Input props={propsEmail}/>

              <Input props={propsPassword}/>

              <button className="Button" type="submit">{actLinks[0]}</button>
              
            </form>

            <div className="EnotherButtons flex">
              <div className="Link flex"><a href="/privacy">{actLinks[1]}</a></div>
              <div className="Link flex"><a href="/privacy">{actLinks[2]}</a></div>
            </div>

            <div className="Link flex"><a href="/privacy">{actLinks[3]}</a></div>
            
          </div>

        </div>
      }

    </div>
  )
}