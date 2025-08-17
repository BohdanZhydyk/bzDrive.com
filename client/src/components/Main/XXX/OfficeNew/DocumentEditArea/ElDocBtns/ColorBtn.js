import React, { useState } from "react"


export function ColorBtn({ props:{tr, lang, nr, Reducer} }) {
  
  const [colorPicker, setColorPicker] = useState(false)

  const color = nr?.color

  function OPEN_COLOR_PICKER(){ setColorPicker( prev=> true ) }
  function COLOR_CHG(e){
    setColorPicker( prev=> false )
    Reducer({ type:"COLOR_CHANGE", color:e.target.value })
  }

  const OrderStyle = {
    backgroundColor: color,
    backgroundImage:`linear-gradient(0deg, ${color}, #111a 30% 70%, ${color})`
  }

  return(
    <div className="ActBtn flex" style={OrderStyle} onClick={OPEN_COLOR_PICKER} >

      <span>{ tr(`ActionBtn_color`, lang) }</span>

      <input type="color" style={OrderStyle} defaultValue={color} onChange={COLOR_CHG} />

    </div>
  )
}