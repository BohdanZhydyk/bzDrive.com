import React from "react"


export function BattleField({ props:{player, field, elClass, EL_CLICK} }){
  return(
    <div className="BattleField flex wrap">
    {
      field.map( (line, y)=>{
        return(
          <div className={`Line flex`} key={`Pl-${player}_Line_${y}`}>
          {
            line.map( (el, x)=>{
              const classes = `${elClass(el,x,y)} flex`
              const styles = {backgroundColor:el}
              const key = `Pl-${player}_Element_${x}${y}`
              return(
                <div className={classes} style={styles} key={key} onClick={()=>EL_CLICK(player,x,y)}>
                  {((el?.length < 3) && (el !== 'Z')) ? el : ``}
                </div>
              )
            })
          }
          </div>
        )
      })
    }
    </div>
  )
}