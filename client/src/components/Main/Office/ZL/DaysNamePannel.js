import React from "react"


export function DaysNamePannel({ props:{} }) {

  const dayNames = ['mo','tu','we','th','fr','sa','su']

  return(
    <div className="DaysNamePannel flex stretch">
      <div className="LeftLine flex"></div>
      <div className="RightLine flex">
      {
        dayNames.map( (day, d)=>{
          const key = `DayName${d}${day}`
          const classes = `DayName ${(d > 4) ? `HolyDay` : ``} txtOrg bold flex`
          return <div className={classes} key={key}>{day.toUpperCase()}</div>
        })
      }
      </div>
    </div>
  )
}