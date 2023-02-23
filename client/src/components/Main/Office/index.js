import React from "react"
import { SubLinks } from "../SubLinks"


function Office({ props:{sub} }) {
  return(
    <div className="flex column">

      <h2>Office</h2>

      <SubLinks props={{sub}}/>

    </div>
  )
}

export default Office