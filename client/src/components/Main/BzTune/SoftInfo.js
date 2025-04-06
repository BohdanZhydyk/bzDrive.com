import React, { useState, useEffect } from "react"

import ActionBtn from "../../All/ActionBtn"
import { SoftTr } from "./SoftwareTranslate"


export function SoftInfo({ props: { lang, CLOSE_INFO } }) {

  const [secondsLeft, setSecondsLeft] = useState(30)

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setInterval(() => { setSecondsLeft(prev => prev - 1) }, 1000)
      return () => clearInterval(timer)
    }
    else { CLOSE_INFO() }
  }, [secondsLeft])

  return (
    <div className="SoftInfo flex">

      <div className="InfoArea flex column">

        <div className="CloseBtn flex between stretch">

          <img className="InfoImg" src="https://bzdrive.com/files/ico/icoInfo.png" alt="info" />

          <div className="flex column">
            <ActionBtn props={{ name: `cancel`, click:()=>CLOSE_INFO() }} />
            { secondsLeft > 0 && <div className={secondsLeft > 3 ? `txtOrg` : `txtRed bold`}>{`${secondsLeft} s`}</div> }
          </div>


        </div>

        <p>{SoftTr("SoftwareParagraph1", lang)}</p>
        <p>{SoftTr("SoftwareParagraph2", lang)}</p>

      </div>

    </div>
  )
}
