import React from "react"


export function StatControls({ props:{from, to, now, oneDay, setTo} }) {
  return (
    <div className="StatControls flex bold">

      {
        (from - to) > oneDay &&
        <div className="StatControlBtn OnlyDay flex" onClick={()=>setTo(now - oneDay)}><span>{`Tylko dziś`}</span></div>
      }

      <div className="StatControlBtn PlusDay flex" onClick={()=>setTo(to - oneDay)}><span>{`+1 dzień`}</span></div>
      <div className="StatControlBtn PlusWeek flex" onClick={()=>setTo(to - oneDay * 7)}><span>{`+1 tydzień`}</span></div>
      <div className="StatControlBtn PlusMonth flex" onClick={()=>setTo(to - oneDay * 30)}><span>{`+1 miesiąc`}</span></div>
      <div className="StatControlBtn PlusQuarter flex" onClick={()=>setTo(to - oneDay * 90)}><span>{`+3 miesiące`}</span></div>

    </div>
  )
}
