import React, { useEffect, useState } from "react"

import "./TuningAddWrapper.scss"
import { SoftTr } from "../SoftwareTranslate"
import ActionBtn from "../../../All/ActionBtn"


function TuningAddWrapper({ props:{lang} }){

  const services = [{name:"TuneCPU"},{name:"TuneFireTire"},{name:"TuneDPF"},{name:"TuneDTC"}]

  const [activeService, setActiveService] = useState(false)

  const linkToImg = `https://bzdrive.com/files/ico/`
  const moreBtn = `${linkToImg}sliderBtnD.png`
  const lessBtn = `${linkToImg}sliderBtnU.png`

  useEffect( ()=> { setActiveService(prev=>false) }, [lang])

  return(
    <div className="TuningAddWrapper flex column">

      <div className="ServicesPannel flex stretch wrap">
      {
        services.map( (serv, s)=>{

          const key = `ServiceTile${s}`
          const translate = SoftTr(`Service${serv?.name}`, lang)
          const link = `${linkToImg}${serv?.name}.png`
          const txt = translate?.txt
          const desc = translate?.desc
          const isActive = activeService?.nr === s
          function MORE_CLICK(){ setActiveService( prev=> isActive ? false : {nr:s, more:translate?.more} ) }

          return(
            <div className={`Serv Border${isActive ? `Grn` : `Org`} flex wrap`} onClick={MORE_CLICK} key={key}>
              <img className="ServImage flex" src={link} alt="ServImg" />
              <div className="ServTxt bold flex">{txt}</div>
              <div className="ServDesc flex">{desc}</div>
              <img className="ServMoreBtn flex" src={isActive ? lessBtn : moreBtn} alt="moreBtn" />
            </div>
          )
        })
      }
      </div>

      {
        activeService &&
        <div className="MorePannel flex wrap">

          <div className="MorePannelTopBtns flex end">
            <ActionBtn props={{ name: `cancel`, click:()=> setActiveService(prev=>false) }} />
          </div>

          {
            activeService?.more?.map( (txt, n)=>{
              return(
                <p className="MoreParagraph flex start" key={`MoreParagraph${n}`}>
                  {txt}
                </p>
              )
            })
          }

        </div>
      }

    </div>
  )
}

export default TuningAddWrapper