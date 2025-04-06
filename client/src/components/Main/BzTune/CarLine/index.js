import React from "react"
import { Link } from 'react-router-dom'

import "./CarLine.scss"

function CarLine({ props: { car } }) {

  const isTop = car?.id === "top"
  const classes = `CarLine ${isTop ? "CarLineTop txtOrg bold" : ""} flex wrap`
  const to = `/softpage/${car?.id}`

  return(
    <React.Fragment>
    {
      isTop
      ? <div className={classes}><CarContent props={{isTop, car}}/></div>
      : <Link className={classes} to={to} target="_blank" rel="noopener noreferrer"><CarContent props={{isTop, car}}/></Link>
    }
    </React.Fragment>
  )
}

function CarContent({ props:{isTop, car} }){
  return(
    <React.Fragment>
      
      <div className={`BrandModel Cell ${isTop ? "txtOrg" : "txtYlw"} flex start`}>{`${car?.brand} - ${car?.model}`}</div>

      <div className="MethodSM Cell flex start">{car?.readMethod}</div>

      <div className="Lines flex column">

        <div className="ECU flex start">
          <div className="ECUType Cell flex start">{car?.ECUType}</div>
          <div className="HWv Cell flex start">{car?.hwVersion}</div>
          <div className="SWv Cell flex start">{car?.swVersion}</div>
        </div>

        <div className="Prog flex start">
          <div className="Programmer Cell flex start">{car?.programmer}</div>
          <div className="Mod Cell flex start">{car?.mod}</div>
          <div className="Type Cell flex start">{car?.swType}</div>
        </div>

      </div>

      <div className="Method Cell flex start">{car?.readMethod}</div>

    </React.Fragment>
  )
}

export default CarLine
