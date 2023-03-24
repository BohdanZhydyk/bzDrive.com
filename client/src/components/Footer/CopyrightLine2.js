import React from "react"

import { TimeTo_YYYYMM } from "../../AppFunctions"
import { ColorSiteName } from "../All/ColorName/ColorSiteName"


export function CopyrightLine2({ props:{link} }) {

  const years = `2018-${ TimeTo_YYYYMM( Date.now() ).toString().slice(0,4) }`

  return (
    <div className="flex end">
      <span className="Whitespace"></span>
      <span>{`Copyright`}</span>
      <span className="Whitespace"></span>
      <span>&copy;</span>
      <span className="Whitespace"></span>
      <span>{years}</span>
      <span className="Whitespace"></span>
      <ColorSiteName props={{link}} />
    </div>
  )
}