import React from "react"

import "./ElSoft.scss"
import { tr } from "../../../../../AppTranslate"
import ActionBtn from "../../../../All/ActionBtn"
import { SoftwareLine } from "./SoftwareLine"
import { GetUser } from "../../../../../AppFunctions"

function ElSoft({ props:{user, nr, car, setCar, soft, setSoft, save, setSave, printMode} }){

  const isAdmin = GetUser().role === "admin"

  function ADD_NEW_SOFTLINE(){
    const newSoft = {id:`${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`}
    setSoft(soft ? [...soft, newSoft] : [newSoft])
  }

  return(
    <div className="ElSoft flex column">

      <div className="ElSoftTop bold flex between">

        <span>{tr(`SoftTop`,user?.lang)}</span>

        { !printMode && isAdmin && <ActionBtn props={{ name:`plus`, click:ADD_NEW_SOFTLINE }} /> }

      </div>

      <div className="ElSoftBody flex column start">

        <div className="SoftwareLines flex column start">
        {
          soft && soft.map( (sw, s)=>{
            const key = `SoftwareID-${sw?.id}`
            return <SoftwareLine props={{nr, car, setCar, setSoft, sw, s, setSave, printMode}} key={key} />
          })
        }
        </div>

      </div>

    </div>
  )
}

export default ElSoft