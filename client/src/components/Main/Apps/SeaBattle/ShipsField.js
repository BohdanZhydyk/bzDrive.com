import React from "react"


export function ShipsField({ props:{ships} }){
  return(
    <div className="ShipsField flex wrap">

      <div className="Ships flex wrap">
      {
        ships.map( (el, i)=>{
          const classes = `${(el === `#0000`) ? `EmptyEl` : `ShipEl`} flex`
          const styles = {backgroundColor:el}
          const key = `ShipEl${i}`
          return(
            <div className={classes} style={styles} key={key} ></div>
          )
        })
      }
      </div>

    </div>
  )
}