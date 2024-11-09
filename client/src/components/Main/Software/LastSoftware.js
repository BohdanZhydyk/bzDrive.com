import React from "react"

import CarLine from "./CarLine"


export function LastSoftware({ props:{initialState, carTop} }){

  return(
    <div className="LastSoftware flex column start">

    <CarLine props={{car:carTop}} key={`LastCarLineTop`}/>

    {
      initialState.sort((a, b) => b.id.localeCompare(a.id)).map( (car, c)=> <CarLine props={{car}} key={`LastCarLine${c}${car?.id}`}/> )
    }
    </div>
  )
}