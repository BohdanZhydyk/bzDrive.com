import React from "react"
import { Routes, Route } from 'react-router-dom'

import "./Apps.scss"
import Pass from "./Pass"


function Apps({ props:{} }) {
  return(
    <div className="Apps flex column">

      <Routes>
        <Route path="/pass" element={<Pass />} />
        <Route path="/files" element={<div>Files</div>} />
      </Routes>

    </div>
  )
}

export default Apps