import React, { useState, useEffect } from "react"

import { OfficeReducer } from "./OfficeReducer"
import { SettingsPanel } from "./SettingsPanel"


export function ZL({ props:{} }) {

  const [settings, setSettings] = useState(false)

  useEffect( ()=>{ !settings && OfficeReducer( { type:"GET_SETTINGS" }, settings, setSettings ) }, [])

  return(
    <div className="flex column">

      <SettingsPanel props={{}} />

      <h2>ZL</h2>

    </div>
  )
}