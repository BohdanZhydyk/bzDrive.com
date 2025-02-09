import React from "react"

import './TopLine.scss'
import { tr } from "../../../../AppTranslate"
import ActionBtn from "../../../All/ActionBtn"
import { GetUser } from "../../../../AppFunctions"


function TopLine({ props:{toggle, setToggle} }) {
  
  const user = GetUser()

  const navLineData = window.location.pathname?.split("/").slice(1,3)

  const financesBtnProps = {
    name: toggle?.finances ? `cancel` : `fin`,
    click: ()=>{ setToggle(prev=> ({finances:!prev.finances})) }
  }

  const vinDecoderBtnProps = {
    name: toggle?.decoderVIN ? `cancel` : `vin`,
    click: ()=>{ setToggle(prev=> ({decoderVIN:!prev.decoderVIN})) }
  }

  const nipDecoderBtnProps = {
    name: toggle?.decoderNIP ? `cancel` : `nip`,
    click: ()=>{ setToggle(prev=> ({decoderNIP:!prev.decoderNIP})) }
  }

  const searchBtnProps = {
    name: toggle?.search ? `cancel` : `doc`,
    click: ()=>{
      setToggle(prev=> ({search:!prev.search}))
    }
  }

  const settingsBtnProps = {
    name: toggle?.settings ? `cancel` : `settings`,
    click: ()=>{ setToggle(prev=> ({settings:!prev.settings})) }
  }

  return(
    <div className="TopLine flex wrap">

      <div className="NavLine flex start">
      {
        (navLineData?.length > 1) && navLineData?.map( (navEl, n)=>{
          return(
            <div className="NavEl flex start" key={`NavEl${n}`}>

              <span className="NavElLink flex start bold">
                {tr(`Nav_${navEl.toUpperCase()}`,user?.lang)}
              </span>

              <span>{">"}</span>

            </div>
          )
        })
      }
      </div>

      <div className="BtnsPannel flex end">
        <ActionBtn props={financesBtnProps} />
        <ActionBtn props={vinDecoderBtnProps} />
        <ActionBtn props={nipDecoderBtnProps} />
        <ActionBtn props={searchBtnProps} />
        <ActionBtn props={settingsBtnProps} />
      </div>

    </div>
  )
}

export default TopLine