import React, { useEffect, useState } from "react"

import { companyPropses } from "../propses"
import { CompanyLineTop } from "./CompanyLineTop"
import { CompanyLine } from "./CompanyLine"
import { CompanyPersonel } from "./CompanyPersonel"


function CompanyPannel({ props:{company, c, Reducer} }){

  const [isCompanyEdit, setIsCompanyEdit] = useState( false )

  const [myCompany, setMyCompany] = useState( false )

  function SAVE_COMPANY(){ Reducer({ type:"SAVE_COMPANY", myCompany }) }

  useEffect( ()=>{
    setIsCompanyEdit(false)
    setMyCompany(company)
  }, [company])

  return(
    <div className="CompanyPannel radius flex column start">

      <CompanyLineTop props={{company, isCompanyEdit, SAVE_COMPANY}} />

      {
        companyPropses({myCompany, setMyCompany, setIsCompanyEdit}).map( (companyLine, l)=>{
          return(
            <CompanyLine props={{companyLine, l}} key={`CompanyLine${companyLine?._id}${l}`} />
          )
        })
      }

      <CompanyPersonel props={{company}} />

    </div>
  )
}

export default CompanyPannel