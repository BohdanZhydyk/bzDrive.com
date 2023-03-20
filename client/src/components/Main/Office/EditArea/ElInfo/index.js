import React from "react"

import "./ElInfo.scss"
import { tr } from "../../../../../AppTranslate"
import { sanitizeTxt } from "../../../../../AppFunctions"
import { CarPropses, DealerPropses, ClientPropses } from "./propses"
import { InfoPannel } from "./InfoPannel"


function ElInfo({ props:{
  user, mode, car, setCar, client, setClient, dealer, setDealer, setSave, editErr, setEditErr
} }){

  const lang = user.lang

  const CarPr = CarPropses(tr, lang, car, setCar, editErr, setEditErr, setSave, sanitizeTxt)
  const DealerPr = DealerPropses(tr, lang, dealer, setDealer, editErr, setEditErr, setSave, sanitizeTxt)
  const ClientPr = ClientPropses(tr, lang, client, setClient, editErr, setEditErr, setSave, sanitizeTxt)

  return(
    <section className="ElInfo flex between stretch wrap">

      {
        ["ZL"].includes(mode) &&
        <InfoPannel props={{lang, title:`InfoPannelCar`, InfoProps: CarPr}} />
      }
      {
        ["FS"].includes(mode) &&
        <InfoPannel props={{lang, title:`InfoPannelDealer`, InfoProps: DealerPr}} />
      }
      {
        ["ZL","FS"].includes(mode) &&
        <InfoPannel props={{lang, title:`InfoPannelClient`, InfoProps: ClientPr}} />
      }

    </section>
  )
}

export default ElInfo