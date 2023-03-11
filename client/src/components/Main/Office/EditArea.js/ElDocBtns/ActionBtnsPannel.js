import React from "react"


export function ActionBtnsPannel({ props:{tr, lang, setSave, status, setStatus} }) {

  function ACT_CHG(act){
    setSave(true)
    setStatus(act)
  }

  return(
    <>
    {
      ['open', 'repair', 'close', 'delete'].map( (btn, n)=>{
        const classes = `ActBtn ${btn === status ? `ActBtn_${btn}` : ``} flex`
        return(
          <div className={classes} key={`ActBtn${n}`} onClick={()=>ACT_CHG(btn)}>
            { tr(`ActionBtn_${btn}`, lang) }
          </div>
        )
      })
    }
    </>
  )
}