import React from "react"
import { TimeToObject } from "../../../../../AppFunctions"


export function StateLineBody({ props:{entry, login, i, j, classes, Reducer} }) {

  const id = entry?._id
  const ip = entry?.IP?.ip
  const city = entry?.IP?.city
  const country = entry?.IP?.country_name
  const asn = entry?.IP?.asn_org

  const date = TimeToObject(login?.lastUnix)

  const nr = i === 0 ? entry?.nr : i + '-' + j
  const user = login?.user
  const dateStr = !login?.lastUnix ? `Date` : `${date?.year}.${date?.month}.${date?.day}`
  const timeStr = !login?.lastUnix ? `Time` : `${date?.hour}:${date?.min}:${date?.sec}`
          
  const count = login?.links?.reduce((sum, link) => sum + (link.count || 0), 0)
  const countClass = count > 50 ? "high" : count > 10 ? "mid" : count > 0 ? "low" : ""

  function OPEN_CLOSE_LINE(){ Reducer({type:"OPEN_CLOSE_LINE", id, unix:login?.lastUnix}) }

  return (
    <div className="StateLineBody flex stretch" onClick={OPEN_CLOSE_LINE}>

      <div className={`LineNr ${classes} flex start`}>
        <span className="Nr flex start">{nr}</span>
        <span className={`Count ${countClass} flex`}>{count}</span>
      </div>
      
      <div className={`LineUser ${classes} flex start`}>{user}</div>
      <div className={`LineIP ${classes} flex overflow start`} title={ip}>{ip}</div>
      <div className={`LineCity ${classes} flex overflow start`} title={city}>{city}</div>
      <div className={`LineCountry ${classes} flex overflow start`} title={country}>{country}</div>
      <div className={`LineASN ${classes} flex overflow start`} title={asn}>{asn}</div>
      <div className={`LineDate ${classes} flex`}>{dateStr}</div>
      <div className={`LineTime ${classes} flex`}>{timeStr}</div>

    </div>
  )
}
