import React from "react"
import { Link } from 'react-router-dom'

import "./CarLine.scss"

function CarLine({ props: { car } }) {

  const isTop = car?.id === "top"
  const classes = `CarLine ${isTop ? "CarLineTop txtYlw bold" : ""} flex`
  const to = `/softpage/${car?.id}`

  return(
    <React.Fragment>
    {
      isTop
      ? <div className={classes}><CarContent props={{car}}/></div>
      : <Link className={classes} to={to} target="_blank" rel="noopener noreferrer"><CarContent props={{car}}/></Link>
    }
    </React.Fragment>
  )
}

function CarContent({ props:{car} }){
  return(
    <React.Fragment>
      <div className="Model flex start">{car?.model}</div>
      <div className="ECUType flex start">{car?.ECUType}</div>
      <div className="SWv flex start">{car?.swVersion}</div>
      <div className="HWv flex start">{car?.hwVersion}</div>
      <div className="Programmer flex start">{car?.programmer}</div>
      <div className="Mod flex start">{car?.mod}</div>
      <div className="Method flex start">{car?.readMethod}</div>
      <div className="Type flex start">{car?.swType}</div>
    </React.Fragment>
  )
}

export default CarLine
