import React, { useEffect, useState } from "react"
import "./Statistic.scss"
import { StatisticReducer } from "./StatisticLogic"
import { TimeToObject } from "../../../../AppFunctions"
import ActionBtn from "../../../All/ActionBtn"


function Statistic() {

  const [statistic, setStatistic] = useState(false)
  const [delCount, setDelCount] = useState(false)

  const now = Date.now()
  const oneDay = 24 * 60 * 60 * 1000

  const [from, setFrom] = useState( now )
  const [to, setTo] = useState( now - oneDay )

  const fromObj = `${TimeToObject(from)?.year}.${TimeToObject(from)?.month}.${TimeToObject(from)?.day}`
  const toObj = `${TimeToObject(to)?.year}.${TimeToObject(to)?.month}.${TimeToObject(to)?.day}`
  const delCountTxt = `Usunęto: ${delCount} rekordów`

  const tableTop = { nr:"Nr", user:"User", IP:{ip:"IP", city:"City", country_name:"Country"}, date:{dateTime:{date:"Date", time:"Time"}} }

  function Reducer(action){ StatisticReducer({action, statistic, setStatistic, from, setFrom, to, setTo, delCount, setDelCount})}

  useEffect( ()=> { Reducer({type:"GET_STATISTIC"}) }, [to])

  // console.log("statistic", statistic)

  return (
    <div className="Statistic flex column">

      <div className="StatRange flex bold">{`Zakres: ${toObj} - ${fromObj} ${delCount ? delCountTxt : ``}`}</div>

      <div className="StatTable flex column">
      {
        statistic && [ tableTop, ...statistic ].map((line, l)=>{

          const key = `${line?.date?.unix}${l}`
          const count = line?.count
          const nr = line?.nr ?? l
          const user = line?.user
          const ip = line?.IP?.ip
          const city = line?.IP?.city
          const country = line?.IP?.country_name
          const asn = line?.IP?.asn_org
          const dayTime = line?.date?.dateTime
          const date = dayTime?.date ?? `${dayTime?.year}.${dayTime?.month}.${dayTime?.day}`
          const time = dayTime?.time ?? `${dayTime?.hour}:${dayTime?.min}:${dayTime?.sec}`

          const cell = l === 0 ? `TopLine flex center` : `Cell flex`
          const countClass = count > 50 ? "high" : count > 10 ? "mid" : count > 0 ? "low" : ""

          return(
            <div className="StatLine flex stretch" key={key}>

              <div className={`LineNr ${cell}`}>
                <span className="Nr flex start">{nr}</span>
                <span className={`Count ${countClass} flex`}>{count}</span>
              </div>
              <div className={`LineUser ${cell} start`}>{user}</div>
              <div className={`LineIP ${cell} overflow start`} title={ip}>{ip}</div>
              <div className={`LineCity ${cell} overflow start`} title={city}>{city}</div>
              <div className={`LineCountry ${cell} overflow start`} title={country}>{country}</div>
              <div className={`LineASN ${cell} overflow start`} title={asn}>{asn}</div>
              <div className={`LineDate ${cell}`}>{date}</div>
              <div className={`LineTime ${cell}`}>{time}</div>
              <div className={`LineDelete ${cell}`} title="Usuń powiązane wpisy" >
                { l !== 0 && <ActionBtn props={{name:'delete', click:()=>Reducer({ type: "DELETE_USER_IP", user, ip })}} /> }
              </div>

            </div>
          )
        })
      }
      </div>

      {
        statistic && 
        <div className="StatControls flex">
          {
            (from - to) > oneDay &&
            <div className="StatControlBtn OnlyDay flex" onClick={() => setTo(now - oneDay)}>{`Tylko dziś`}</div>
          }
          <div className="StatControlBtn PlusDay flex" onClick={() => setTo(to - oneDay)}>{`+1 dzień`}</div>
          <div className="StatControlBtn PlusWeek flex" onClick={() => setTo(to - oneDay * 7)}>{`+1 tydzień`}</div>
          <div className="StatControlBtn PlusMonth flex" onClick={() => setTo(to - oneDay * 30)}>{`+1 miesiąc`}</div>
        </div>
      }

    </div>
  )
}

export default Statistic
