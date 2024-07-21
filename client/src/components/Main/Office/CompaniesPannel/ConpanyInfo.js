import React from "react"

import { tr } from "../../../../AppTranslate"
import { CompanyProps } from "./CompanyProps"
import ActionBtn from "../../../All/ActionBtn"
import InputText from '../../../All/InputText'



export function ConpanyInfo({ props:{user, activeCompany, companies, setCompanies} }) {

  const lang = user.lang

  const company = companies?.companiesData[activeCompany]

  const propses = ()=> CompanyProps(lang, activeCompany, companies, setCompanies)

  const compImg = `https://bzdrive.com/files/dealers/${company?.img ?? `empty.png`}`

  return(
    <div className="ConpanyInfo flex column">

      <div className="Company flex wrap">

        <div className="CompanyAva flex">
          <img src={compImg} alt="CompImg" />
        </div>

        <div className="CompanyWarning">
          <ActionBtn props={{name:"save", click:()=>alert("save")}} />
        </div>

        <div className="CompanyTitle flex wrap">
          <div className="TitleShortName flex"><InputText props={ propses().shortName } /></div>
          <div className="TitleName flex"><InputText props={ propses().name } /></div>
        </div>

        <div className="Digits flex">
          <div className="DigNip flex"><InputText props={ propses().nip } /></div>
          <div className="DigAcc flex"><InputText props={ propses().account } /></div>
        </div>

        <div className="Address flex wrap">
          <div className="AddrZip flex"><InputText props={ propses().zip } /></div>
          <div className="AddrTown flex"><InputText props={ propses().town } /></div>
          <div className="AddrStreet flex"><InputText props={ propses().streetName } /></div>
          <div className="AddrNr flex"><InputText props={ propses().streetNr } /></div>
        </div>

        <div className="Contacts flex wrap">
          <div className="ContTel flex"><InputText props={ propses().tel } /></div>
          <div className="ContEmail flex"><InputText props={ propses().email } /></div>
          <div className="ContWww flex"><InputText props={ propses().www } /></div>
        </div>

        <div className="Personnel flex stretch between">
          <div className="Range">
            <div className="RangeName">{`${tr(`DirectorsList`,lang)}:`}</div>
            <div>{`${company?.director}`}</div>
          </div>
          <div className="Range">
            <div className="RangeName">{`${tr(`AccountantsList`,lang)}:`}</div>
            <div>{company?.personnel?.accountants && company.personnel.accountants.join(", ")}</div>
          </div>
          <div className="Range">
            <div className="RangeName">{`${tr(`WorkersList`,lang)}:`}</div>
            <div>{company?.personnel?.workers && company.personnel.workers.join(", ")}</div>
          </div>
        </div>

      </div>

    </div>
  )
}