import React from "react"

import { ColorSiteName } from "../All/ColorName/ColorSiteName"


export function CopyrightLine2({ props:{link} }) {
  return (
    <div className="flex end">
      <span className="Whitespace"></span>
      <span>{`Copyright`}</span>
      <span className="Whitespace"></span>
      <span>&copy;</span>
      <span className="Whitespace"></span>
      <span>{`2018-2023`}</span>
      <span className="Whitespace"></span>
      <ColorSiteName props={{link}} />
    </div>
  )
}