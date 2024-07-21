import React from "react"


export function OrderRightPart({ props:{order, title, styles, checkImg, pannels, edit, setEdit} }) {

  const cellSt = styles.cellStyles
  const beforeSt = styles.beforeStyles
  const orderSt = styles.orderStyles

  const repairStatus = order?.status === "repair"

  return(
    <div className="RightLine flex stretch start" style={{display:pannels.RP}}>

      <span className="BeforeOrder flex" style={beforeSt}></span>

      <span className="OrderR flex" style={orderSt} onClick={()=>setEdit(!edit)} title={title}>
        <div className="OrderBody flex end" style={cellSt}>
          <div className="ImgBtn flex">
          { repairStatus && <img className="ImgBtn flex" src={checkImg} alt="check" /> }
          </div>
        </div>
          <div className={`StatusLine StatusLineColor_${order?.status} flex`}></div>
      </span>

    </div>
  )
}