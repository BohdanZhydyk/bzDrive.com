import React from "react"
import { SubLinks } from "../SubLinks"


function Statistic({ props:{sub} }) {
  return(
    <div className="flex column">

      <h2>Statistic</h2>

      <SubLinks props={{sub}}/>

    </div>
  )
}

export default Statistic