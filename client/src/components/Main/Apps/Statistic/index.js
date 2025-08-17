import React, { useEffect, useState } from "react"
import "./Statistic.scss"
import { StatisticReducer } from "./StatisticLogic"
import { DelCountMessage } from "./DelCountMessage"
import { StatRange } from "./StatRange"
import StatTable from "./StatTable"
import { StatControls } from "./StatControls"


function Statistic() {

  const now = Date.now()
  const oneDay = 24 * 60 * 60 * 1000

  const [statistic, setStatistic] = useState(false)
  const [delMsg, setDelMsg] = useState(false)

  const [from, setFrom] = useState( now )
  const [to, setTo] = useState( now - oneDay )

  function Reducer(action){ StatisticReducer({action, statistic, setStatistic, from, setFrom, to, setTo, delMsg, setDelMsg})}

  useEffect( ()=> { Reducer({type:"GET_STATISTIC"}) }, [to])
  useEffect(() => {
    if (delMsg) {
      const timeout = setTimeout(() => setDelMsg(false), 5000)
      return () => clearTimeout(timeout)
    }
  }, [delMsg])

  // console.log("statistic", statistic)
  // console.log("delMsg", delMsg)

  return (
    <div className="Statistic flex column">

      { delMsg && <DelCountMessage props={{delMsg}}/> }
      
      { statistic && <StatRange props={{from, to}} /> }

      { statistic && <StatTable props={{statistic, from, to, Reducer}}/> }

      { statistic && <StatControls props={{from, to, now, oneDay, setTo}}/> }

    </div>
  )
}

export default Statistic
