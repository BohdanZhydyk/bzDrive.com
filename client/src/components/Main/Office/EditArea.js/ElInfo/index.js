import React from "react"

import "./ElInfo.scss"
import { tr } from "../../../../../AppTranslate"
import { sanitizeTxt } from "../../../../../AppFunctions"
import { CarPropses, ClientPropses } from "./propses"
import { InfoPannel } from "./InfoPannel"


function ElInfo({ props:{user, mode, car, setCar, client, setClient, setSave, editErr, setEditErr} }){

  const lang = user.lang

  return(
    <div className="ElInfo flex between stretch wrap">

      {
        mode === "ZL" &&
        <>
          <InfoPannel props={{
            lang,
            title:`InfoPannelCar`,
            InfoProps:CarPropses(tr, lang, car, setCar, editErr, setEditErr, setSave, sanitizeTxt)
          }} />
          <InfoPannel props={{
            lang,
            title:`InfoPannelClient`,
            InfoProps:ClientPropses(tr, lang, client, setClient, editErr, setEditErr, setSave, sanitizeTxt)
          }} />
        </>
      }

    </div>
  )
}

export default ElInfo