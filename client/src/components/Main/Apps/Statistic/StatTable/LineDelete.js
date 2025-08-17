import React from "react"
import ActionBtn from "../../../../All/ActionBtn"


export function LineDelete({ props:{entry, login, i, classes, from, to, Reducer} }) {

  const id = entry?._id

  function DELETE_LINE(){ Reducer({ type:"DELETE_LINE", id, unix:login?.lastUnix, from, to }) }

  return (
    <div className={`LineDelete ${classes} flex`}>
      { i !== 0 && <ActionBtn props={{ name:'delete', click:DELETE_LINE }} /> }
    </div>
  )
}
