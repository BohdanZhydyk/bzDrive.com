import React from "react"


export function UlWrapper({ props:{el, user} }){
  return(
    <div className="UlWrapper flex wrap">

      <span className="Ul">{el?.body[user?.lang]?.ul}</span>

      <ul className="LiWrapper flex column">
      {
        el?.body[user?.lang]?.li &&
        el.body[user?.lang].li.map( (li, l)=>{
          const keyLi = `LiEl${l}`
          return <li className="Li flex start" key={keyLi}>{`- ${li}`}</li>
        })
      }
      </ul>

    </div>
  )
}