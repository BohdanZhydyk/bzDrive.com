import React from "react"

import Input from "../../../All/Input"
import ActionBtn from "../../../All/ActionBtn"
import { carProps, clientProps, fromProps, telProps, toProps, vinProps } from "./searchProps"


export function SearchPannel({ props:{tr, lang, searchBtn, search, setSearch, KEY_ENTER, SEARCH, ERASE} }) {

  const inputsArr = [
    {cl:`From flex`,    pr:fromProps(tr, lang, search, setSearch)},
    {cl:`To flex`,      pr:toProps(tr, lang, search, setSearch)},
    {cl:`VIN flex`,     pr:vinProps(search, setSearch)},
    {cl:`Car flex`,     pr:carProps(search, setSearch)},
    {cl:`Client flex`,  pr:clientProps(search, setSearch)},
    {cl:`Tel flex`,     pr:telProps(search, setSearch)},
  ]

  const isErase = Object.keys(search).length !== 0

  return(
    <div className="SearchPannel flex start stretch wrap" onKeyDown={(e)=>KEY_ENTER(e)}>

      {
        inputsArr.map( (input, i)=>{
          return( <div className={input.cl} key={`Inp${i}`}><Input props={input.pr} /></div> )
        })
      }

      {
        searchBtn &&
        <div className="SearchBtn flex">
          <ActionBtn props={{name:'search', click:()=>SEARCH()}} />
          { isErase && <ActionBtn props={{name:'erase', click:()=>ERASE()}} /> }
        </div>
      }

      <div className="RightLine flex stretch start"></div>

    </div>
  )
}