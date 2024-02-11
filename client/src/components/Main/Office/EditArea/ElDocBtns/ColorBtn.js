import React, { useState } from "react"


export function ColorBtn({ props:{tr, lang, setSave, car, setCar} }) {
  
  const [colorPicker, setColorPicker] = useState(false)

  const color = car?.color

  function COLOR_CHG(e){
    setSave(true)
    setColorPicker(false)
    setCar( prev=> ({ ...prev, color:e.target.value }) )
  }

  const OrderStyle = {
    backgroundColor: color,
    backgroundImage:`linear-gradient(0deg, ${color}, #111a 30% 70%, ${color})`
  }

  return(
    <div className="ActBtn flex" style={OrderStyle} onClick={()=>setColorPicker(true)} >

      <span>{ tr(`ActionBtn_color`, lang) }</span>

      <input type="color" style={OrderStyle} defaultValue={color} onChange={COLOR_CHG} />

    </div>
  )
}