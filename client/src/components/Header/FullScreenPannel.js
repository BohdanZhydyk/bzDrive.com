import React from "react"

import AuthPanel from "./AuthPannel"


export function FullScreenPannel({ props:{blur, BLUR} }) {
  return (
    <div className="FullScreenPannel">

      <div className="BlurPannel flex" onClick={()=>blur && BLUR()}></div>

      {
        blur &&
        <div className="SidePannel">

          <div className="SidePannelTop flex"></div>

          <AuthPanel props={{}} />

          <div className="Logout flex between">
            <span className="txtRed">{`Logout`}</span>
            <img className="ImgBtnSmall" src="https://bzdrive.com/files/ico/icoLogOut.png" alt="logout" />
          </div>

        </div>
      }

    </div>
  )
}