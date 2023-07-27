import React from "react"

import "./ElInfo.scss"
import { tr } from "../../../../../AppTranslate"
import { CarPropses, DealerPropses, ClientPropses, SellerPropses, BuyerPropses } from "./propses"
import { InfoPannel } from "./InfoPannel"


function ElInfo({ props:{
  user, mode,
  car, setCar, client, setClient, dealer, setDealer, buyer, setBuyer, seller, setSeller,
  setSave, editErr, setEditErr, printMode
} }){

  const lang = user.lang

  const CarPr     = CarPropses(tr, lang, car, setCar, editErr, setEditErr, setSave)
  const ClientPr  = ClientPropses(tr, lang, client, setClient, editErr, setEditErr, setSave)
  const SellerPr  = SellerPropses(tr, lang, seller, setSeller, editErr, setEditErr, setSave)
  const DealerPr  = DealerPropses(tr, lang, dealer, setDealer, editErr, setEditErr, setSave)
  const BuyerPr   = BuyerPropses(tr, lang, buyer, setBuyer, editErr, setEditErr, setSave)

  const pannel = ()=>{
    switch (mode) {
      case "ZU": return {title1:`InfoPannelBuyer`,  title2:`InfoPannelPayer`,  info1:SellerPr, info2:DealerPr }
      case "ZL": return {title1:`InfoPannelCar`,    title2:`InfoPannelClient`, info1:CarPr, info2:ClientPr   }
      case "FS": return {title1:`InfoPannelDealer`, title2:`InfoPannelBuyer`,  info1:DealerPr, info2:ClientPr}
      case "PS": return {title1:`InfoPannelDealer`, title2:`InfoPannelBuyer`,  info1:DealerPr, info2:ClientPr}
      case "FZ": return {title1:`InfoPannelDealer`, title2:`InfoPannelBuyer`,  info1:SellerPr, info2:DealerPr}
      case "PZ": return {title1:`InfoPannelDealer`, title2:`InfoPannelBuyer`,  info1:SellerPr, info2:DealerPr}
      default: break;
    }
  }

  return(
    <section className="ElInfo flex between stretch wrap">

      <InfoPannel props={{lang, title:pannel().title1, InfoProps:pannel().info1, printMode}} />
      
      <InfoPannel props={{lang, title:pannel().title2, InfoProps:pannel().info2, printMode}} />

    </section>
  )
}

export default ElInfo