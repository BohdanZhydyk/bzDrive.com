import React from "react"
import { SubLinks } from "../SubLinks"


function Apps({ props:{sub} }) {
  return(
    <div className="flex column">

      <h2>Apps</h2>

      <SubLinks props={{sub}}/>

    </div>
  )
}

export default Apps