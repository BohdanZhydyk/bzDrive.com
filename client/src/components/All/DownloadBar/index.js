import React, { useEffect, useState } from "react"

import "./DownloadBar.scss"


function DownloadBar(){

  const [bar, setBar] = useState(0)

  useEffect( ()=>{
    let barInt
    barInt = setInterval( () => { setBar( (prev) => prev + (100 - prev)/200 ) }, 5 )
    return () => clearInterval(barInt)
  }, [bar])

  return(
    <div className="DownloadBar flex start">
      <div className="Bar flex" style={{width:`${bar}%`}}>{`-`}</div>
    </div>
  )
}

export default DownloadBar