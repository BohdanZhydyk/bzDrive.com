import React from "react"

import "./BrandsWrapper.scss"
import ActionBtn from "../../../All/ActionBtn"
import { Brand } from "./Brand"


function BrandsWrapper({ props:{isSoftware, software, isAdmin, carTop, Reducer} }){

  return (
    <div className="BrandsWrapper flex start wrap">

      {
        isAdmin &&
        <a className="Brand AddNew flex" href={`/softpage/new`} target="_blank" rel="noopener noreferrer" key={`newElement`} >
          <ActionBtn props={{ name:`plus`, click:()=>Reducer({type:"ADD_NEW_CAR"}) }} />
        </a>
      }

      { isSoftware && software?.map( (item, i)=> <Brand props={{carTop, item, Reducer}} key={`Brand${i}`}/> ) }

    </div>
  )
}

export default BrandsWrapper