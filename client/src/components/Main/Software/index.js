import React, { useEffect, useState } from "react"

import "./Software.scss"
import { GetUser } from "../../../AppFunctions"
import { SoftwareReducer } from "./SoftwareReducer"
import SiteIcon from "../../All/SiteIcon"
import { SoftInfo } from "./SoftInfo"
import BrandsWrapper from "./BrandsWrapper"
import { LastSoftware } from "./LastSoftware"
import { SoftTr } from "./SoftwareTranslate"


function Software() {

  const user = GetUser()
  const lang = user?.lang
  const isAdmin = user?.role === "admin"

  const [initialState, setInitialState] = useState([])

  const [software, setSoftware] = useState(false)

  const [isInfo, setIsInfo] = useState(true)

  const isSoftware = ( (initialState?.length > 0) && software )

  const carTop = {
    id: "top",
    brand: SoftTr("brand", lang),
    model: SoftTr("model", lang),
    ECUType: SoftTr("ECUType", lang),
    swVersion: SoftTr("swVersion", lang),
    hwVersion: SoftTr("hwVersion", lang),
    programmer: SoftTr("programmer", lang),
    mod: SoftTr("mod", lang),
    readMethod: SoftTr("readMethod", lang),
    swType: SoftTr("swType", lang)
  }

  function CLOSE_INFO(){ setIsInfo(prev => false) }

  const Reducer = (action)=> SoftwareReducer({action, initialState, setInitialState, setSoftware})

  useEffect( ()=> { Reducer({type:"GET_CAR_CARDS"}) }, [])

  // console.log("initialState",initialState)
  // console.log("software",software)

  return (
    <div className="Software flex wrap" onClick={()=> isInfo && CLOSE_INFO()}>
      
      <div className="Pattern flex"></div>

      {
        !software
        ?
        <div className="DownloadIcon flex"><SiteIcon props={{speed:4}} /></div>
        :
        <>

          { !isAdmin && isInfo && <SoftInfo props={{lang, CLOSE_INFO}}/> }

          <BrandsWrapper props={{isSoftware, software, carTop, Reducer}}/>

          <LastSoftware props={{initialState, carTop, lang}} />

        </>
      }

    </div>
  )
}

export default Software