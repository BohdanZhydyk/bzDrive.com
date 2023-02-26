import React from "react"

import { tr } from './../../AppTranslate'
import { GetUser } from './../../AppFunctions'
import { ColorAuthorName } from "../All/ColorName/ColorAuthorName"


export function CopyrightLine1({ props:{author} }) {

  const lang = GetUser().lang
  return (
    <div className="flex end">
      <span className="Whitespace"></span>
      <span>{ tr(`AppAuthor`,lang) }</span>
      <span className="Whitespace"></span>
      <ColorAuthorName props={{author}}/>
    </div>
  )
}