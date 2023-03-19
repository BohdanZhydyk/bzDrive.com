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
        const key = `ActBtn${n}`
        const txt = tr(`ActionBtn_${btn}`, lang)

        return(
          <div className={classes} key={key} onClick={()=>ACT_CHG(btn)}>
            { txt }
          </div>
        )
      })
    }
    </>
  )
}