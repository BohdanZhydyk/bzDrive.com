import React, { useEffect, useState } from "react"

import { bzScroolToDiv } from "../../../../AppFunctions"
import { brandIco } from "../SoftwareReducer"
import ActionBtn from "../../../All/ActionBtn"
import CarLine from "../CarLine"


export function Brand({ props:{carTop, item, i, Reducer} }){

  const [firstLoad, setFirstLoad] = useState(false)

  useEffect(() => { firstLoad && bzScroolToDiv(`ScroolToCarsWrapper${i}`, -1) }, [item?.cars])

  function SHOW_MODELS(){
    Reducer({type:"SELECT_BRAND", brand:item?.brand})
    setFirstLoad( prev=> true )
  }

  const classes = `${!item?.cars ? `Brand` : `CarsWrapper wrap`} flex start ScroolToCarsWrapper${i}`

  return(
    <div className={classes} onClick={!item?.cars ? SHOW_MODELS : undefined}>

      { item?.brand && <img className="BrandImg IcoColor flex" src={brandIco(item?.brand)} alt="SVG" /> }
  
      <div className="BrandName bold flex start overflow">{item?.brand}</div>

      { !item?.cars && <div className="Count flex">{item?.count}</div> }

      { item?.cars && <ActionBtn props={{ name:`cancel`, click:SHOW_MODELS }} /> }

      {
        item?.cars &&
        <div className="CarLines flex column">

          <CarLine props={{car:carTop}} key={`CarLineTop`}/>

          {
            item?.cars
            .sort((a, b) => a.model.localeCompare(b.model))
            .map( (car, c)=> <CarLine props={{car}} key={`CarLine${c}${car?.id}`}/> )
          }
          
        </div>
      }

    </div>
  )
}