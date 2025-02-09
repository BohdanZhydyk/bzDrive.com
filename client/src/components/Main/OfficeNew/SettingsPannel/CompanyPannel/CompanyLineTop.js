import React from "react"

import Avatar from "../../Elements/Avatar"
import ActionBtn from "../../../../All/ActionBtn"


export function CompanyLineTop({ props:{company, isCompanyEdit, SAVE_COMPANY} }){

  const link = `https://bzdrive.com/files/dealers/`
  const ava = company?.img

  return(
    <div className="CompanyLineTop flex between">

      <Avatar props={{link, ava}} />
      
      { isCompanyEdit && <ActionBtn props={{name:"save", click:SAVE_COMPANY}} /> }

    </div>
  )
}