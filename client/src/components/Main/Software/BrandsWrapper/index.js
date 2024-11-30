import React from "react"

import "./BrandsWrapper.scss"
import { Brand } from "./Brand"


function BrandsWrapper({ props:{isSoftware, software, carTop, Reducer} }){

  return (
    <div className="BrandsWrapper flex start wrap">

      { isSoftware && software?.map( (item, i)=> <Brand props={{carTop, item, i, Reducer}} key={`Brand${i}`}/> ) }

    </div>
  )
}

export default BrandsWrapper