import React, { useState } from "react"

import { brandIco } from "../StoreSoftwareReducer"
import ActionBtn from "../../../All/ActionBtn"
import CarLine from "../CarLine"


export function Brand({ props:{carTop, item, Reducer} }){

  function SHOW_MODELS(){ Reducer({type:"SELECT_BRAND", brand:item?.brand}) }

  return(
    <div className={`${!item?.cars ? `Brand` : `CarsWrapper wrap`} flex start`} onClick={!item?.cars ? SHOW_MODELS : undefined}>

      { item?.brand && <img className="ImgBtn IcoColor flex" src={brandIco(item?.brand)} alt="SVG" /> }
  
      <div className="BrandName bold flex start">{item?.brand}</div>

      { !item?.cars && <div className="Count flex">{item?.count}</div> }

      { item?.cars && <ActionBtn props={{ name:`cancel`, click:SHOW_MODELS }} /> }

      {
        item?.cars &&
        <div className="CarLines flex column">

          <CarLine props={{car:carTop}} key={`CarLineTop`}/>

          { item?.cars.map( (car, c)=> <CarLine props={{car}} key={`CarLine${c}${car?.id}`}/> ) }
          
        </div>
      }

    </div>
  )
}