import React, { useState } from "react"

import SoftwareCard from "../../../../All/SoftwareCard"
import { getFileLinkAddr } from "../../../../All/SoftwareCard/SoftwareReducer"


export function SoftwareLine({ props:{nr, car, setCar, setSoft, sw, s, setSave, printMode} }){

  const [isLine, setIsLine] = useState(true)

  const {link, defaultFileAddr} = getFileLinkAddr(nr, sw?.id)

  const progIcon = `https://bzdrive.com/files/ico/Prog ${sw?.programmer}.png`

  return (
    <div className="SoftwareElement flex" >
      {
        !printMode && isLine
        ?
        <div className="SoftwareLine flex stretch" onClick={()=>setIsLine(prev=>!prev)}>
          <span className="Icon Line flex start">
            { sw?.programmer && <img className="ImgBtn" src={progIcon} alt={sw?.programmer} /> }
          </span>
          <span className="Prog flex start">{sw?.programmer}</span>
          <span className="Type flex start">{sw?.ECUType}</span>
          <span className="Method flex start">{sw?.readMethod}</span>
          <span className="SwType flex start">{sw?.swType}</span>
          <span className="Mod flex start">{sw?.mod}</span>
          <span className="LineID flex start">{sw?.id}</span>
        </div>
        :
        <SoftwareCard props={{car, setCar, setSoft, sw, s, setSave, printMode, link, defaultFileAddr, isLine, setIsLine}} />
      }
    </div>
  )
}
