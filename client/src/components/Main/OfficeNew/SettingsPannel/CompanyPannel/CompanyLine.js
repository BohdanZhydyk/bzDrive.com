import React from "react"

import InputText from "../../../../All/Inputs/InputText"


export function CompanyLine({ props:{companyLine, l} }){
  return(
    <div className="CompanyLine flex">
    {
      companyLine.map( (input, i)=>{
        return(
          <div className={`${input?.st} flex`} key={`CompanyInput${companyLine?._id}${l}${i}`}>
            <InputText props={input?.props} />
          </div>
        )
      })
    }
    </div>
  )
}