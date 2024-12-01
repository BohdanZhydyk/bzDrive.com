import React from "react"

import { sanitizeTxt } from "../../../../AppFunctions"


export function Company({ props:{txt, lang} }){
  
  const company = txt

  const name = company?.name
  const addr = company?.addr
  const contacts = company?.contacts
  
  const addres = `${sanitizeTxt(addr?.zip, "ZIP")?.sanText} ${addr?.town}, ${sanitizeTxt(addr?.street, "StreetName")?.sanText} ${addr?.nr}`
  const nip = sanitizeTxt(company?.nip, "NIP")?.sanText
  const tel = `+48 ${sanitizeTxt(contacts?.tel, "tel")?.sanText}`
  const email = sanitizeTxt(contacts?.email, "email")?.sanText

  const maps = `https://www.google.com/maps/search/?api=1&query=${sanitizeTxt(addr?.zip, "ZIP")?.sanText}+${addr?.town}+${sanitizeTxt(addr?.street, "StreetName")?.sanText}+${addr?.nr}`
  
  return(
    <div className="Company flex column">
      <div className="CompanyLine flex start">
        <span className="CompanyLineTitle txtOrg flex start">Nazwa Firmy:</span>
        <span className="CompanyLineValue txtYlw flex start">{name}</span>
      </div>
      <div className="CompanyLine flex start">
        <span className="CompanyLineTitle txtOrg flex start">Adres:</span>
        <a className="CompanyLineValue txtYlw flex start" href={maps} target="_blank" rel="noreferrer">{addres}</a>
      </div>
      <div className="CompanyLine flex start">
        <span className="CompanyLineTitle txtOrg flex start">NIP:</span>
        <span className="CompanyLineValue txtYlw flex start">{nip}</span>
      </div>
      <div className="CompanyLine flex start">
        <span className="CompanyLineTitle txtOrg flex start">Telefon:</span>
        <a className="CompanyLineValue txtYlw flex start" href={`tel: ${tel}`} target="_blank" rel="noreferrer">{tel}</a>
      </div>
      <div className="CompanyLine flex start">
        <span className="CompanyLineTitle txtOrg flex start">E-mail:</span>
        <a className="CompanyLineValue txtYlw flex start" href={`mailto: ${email}`} target="_blank" rel="noreferrer">{email}</a>
      </div>
    </div>
  )
}