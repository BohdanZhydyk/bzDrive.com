import React from "react"
import { Routes, Route } from 'react-router-dom'


function Apps({ props:{} }) {
  return(
    <div className="flex column">

      <h2>Apps</h2>

      <Routes>
        <Route path="/pass" element={<div>Passwords</div>} />
        <Route path="/files" element={<div>Files</div>} />
      </Routes>

    </div>
  )
}

export default Apps