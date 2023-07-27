import React, { useState } from "react"
import Input from "../../../All/Input"
import { searchProps } from "./PassElement/passProps"


export function UserArea({ props:{user, pass, actGroup, groups, SORT_PASS, ACT_GROUP_CHG}}){

  const att = [
    `Nie jesteś zalogowany, więc wszystkie wprowadzone przez Ciebie dane będą widoczne do momentu ponownego uruchomienia aplikacji.`,
    `Zachęcamy do wprowadzenia jedynie przykładowych danych w celu przetestowania funkcjonalności https://bzdrive.com/apps/pass.`
  ]

  const passCount = ()=>{
    let count = 0
    pass.forEach( el=> count += el?.siteData?.length)
    return count
  }

  const [txt, setTxt] = useState(false)

  return(
    <div className="UserArea">

      {
        !user?.role &&
        <div className="UserAtt flex column">
          { att.map( (txt, p)=> <span key={`UserAtt${p}`}>{txt}</span>) }
        </div>
      }

      <div className="ToolsPannel flex between stretch wrap">

        <div className="CounterTxt flex start">
          <span>{`user:`}</span>
          <span className="txtOrg bold">{user?.login}</span>
          <span>{`saved sites:`}</span>
          <span className="txtOrg bold">{pass?.length}</span>
          <span>{`saved passwords:`}</span>
          <span className="txtOrg bold">{passCount()}</span>
        </div>

        <div className="Search flex end">
          <Input props={ searchProps(txt, setTxt, SORT_PASS) }/>
        </div>

        <div className="Groups flex end wrap">
        {
          groups.map( (group, g)=>{
            const classes = `Group ${group === actGroup ? `ActGroup` : ``} flex`
            const key = `GroupNr${g}`
            return <span className={classes} onClick={ ()=> ACT_GROUP_CHG(group) } key={key}>{group}</span>
          })
        }
        </div>

      </div>

    </div>
  )
}