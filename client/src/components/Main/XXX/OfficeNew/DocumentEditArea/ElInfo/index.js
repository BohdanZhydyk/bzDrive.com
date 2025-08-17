import React from "react"

import "./ElInfo.scss"
import { InfoPannel } from "./InfoPannel"
import {CarPropses, LocationPropses, ClientPropses, DealerPropses, BuyerPropses, SellerPropses} from "./propses"


function ElInfo({ props:{
  tr, lang, mode, businessType, dealer, setDealer, car, setCar, client, setClient, location, setLocation, buyer, setBuyer, seller, setSeller, setSave
} }){

  const CarPr       = CarPropses({tr, lang, car, setCar, setSave})
  const LocationPr  = LocationPropses({tr, lang, location, setLocation, setSave})
  const ClientPr    = ClientPropses({tr, lang, client, setClient, setSave})
  const DealerPr    = DealerPropses({tr, lang, dealer, setDealer, setSave})
  const BuyerPr     = BuyerPropses({tr, lang, buyer, setBuyer, setSave})
  const SellerPr    = SellerPropses({tr, lang, seller, setSeller, setSave})

  const pannel = ()=>{
    switch (mode) {
      case "ZL":
        switch (businessType) {
          case "AutomotiveWorkshop":  return {title1:`InfoPannelCar`,       title2:`InfoPannelClient`, info1:CarPr,       info2:ClientPr}
          case "CleaningCompany":     return {title1:`InfoPannelLocation`,  title2:`InfoPannelClient`, info1:LocationPr,  info2:ClientPr}
          default: break
        } break
      case "PS": return {title1:`InfoPannelDealer`, title2:`InfoPannelBuyer`,  info1:DealerPr,  info2:ClientPr}
      case "PZ": return {title1:`InfoPannelDealer`, title2:`InfoPannelBuyer`,  info1:SellerPr,  info2:DealerPr}
      case "FS": return {title1:`InfoPannelDealer`, title2:`InfoPannelBuyer`,  info1:DealerPr,  info2:ClientPr}
      case "FZ": return {title1:`InfoPannelDealer`, title2:`InfoPannelBuyer`,  info1:SellerPr,  info2:DealerPr}
      case "ZU": return {title1:`InfoPannelBuyer`,  title2:`InfoPannelPayer`,  info1:SellerPr,  info2:DealerPr}
      case "VA": return {title1:`InfoPannelBuyer`,  title2:`InfoPannelPayer`,  info1:SellerPr,  info2:DealerPr}
      default: break
    }
  }

  return(
    <section className="ElInfo flex between stretch wrap">

      <InfoPannel props={{lang, title:pannel()?.title1, InfoProps:pannel()?.info1, printMode:false}} />
      
      <InfoPannel props={{lang, title:pannel()?.title2, InfoProps:pannel()?.info2, printMode:false}} />

    </section>
  )
}

export default ElInfo