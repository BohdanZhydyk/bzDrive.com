import React from "react"

import './TopLine.scss'
import { tr } from "../../../../AppTranslate"
import ActionBtn from "../../../All/ActionBtn"


function TopLineOld({ props:{user, navLineData, setSearch, toggleSearchPannel, setToggleSearchPannel, toggleCompany, setToggleCompany} }) {

  const searchBtnProps = {
    name: toggleSearchPannel ? `cancel` : `doc`,
    click: ()=>{
      setToggleSearchPannel(prev=> !prev)
      setSearch( prev=> ({query:{}, docs:[]}) )
    }
  }

  const settingsBtnProps = {
    name: toggleCompany ? `cancel` : `settings`,
    click: ()=>{ setToggleCompany(prev=> !prev) }
  }

  return(
    <div className="TopLineOld flex wrap">

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
        <ActionBtn props={{name:"vin", click:()=>{}}} />
        <ActionBtn props={{name:"nip", click:()=>{}}} />
        <ActionBtn props={searchBtnProps} />
        <ActionBtn props={settingsBtnProps} />
      </div>

    </div>
  )
}

export default TopLineOld