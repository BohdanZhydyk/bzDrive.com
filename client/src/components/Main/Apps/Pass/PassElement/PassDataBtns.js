import React from "react"

import ActionBtn from "../../../../All/ActionBtn"


export function PassDataBtns({ props:{element, save, SAVE_ELEMENT, OPEN_CLOSE}}){

  const isLink = element?.link?.length > 5
  const isSiteName = element?.siteName?.length > 0
  const isSaveAble = save && isSiteName && isLink

  return(
    <div className="PassDataBtns flex end">

      {
        isLink &&
        <a href={element?.link} target="_blank" rel="noreferrer">
          <ActionBtn props={{name:"link", click:()=>{}}} />
        </a>
      }

      { isSaveAble && <ActionBtn props={{name:"save", click:()=>SAVE_ELEMENT()}} /> }

      <ActionBtn props={{name:"cancel", click:OPEN_CLOSE}} />

    </div>
  )
}