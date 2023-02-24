import React from "react"

import { ColorAuthorName } from "../All/ColorName/ColorAuthorName"


export function CopyrightLine1({ props:{author} }) {
  return (
    <div className="flex end">
      <span className="Whitespace"></span>
      <span>{`Autor aplikacji webowej:`}</span>
      <span className="Whitespace"></span>
      <ColorAuthorName props={{author}}/>
    </div>
  )
}