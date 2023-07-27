import React from "react"


export function InfoPrintPannel({ props:{InfoProps} }){

  const filterProps = (objName)=>{
    const obj = InfoProps.filter( el=> el.classes === objName)
    return obj[0] ?? false
  }

  const name = filterProps("name")
  const nip = filterProps("nip")
  const account = filterProps("account")
  const zip = filterProps("zip")
  const town = filterProps("town")
  const street = filterProps("street")
  const nr = filterProps("nr")
  const tel = filterProps("tel")
  const www = filterProps("www")
  const email = filterProps("email")
  const brand = filterProps("brand")
  const model = filterProps("model")
  const vin = filterProps("vin")
  const prod = filterProps("prod")
  const engine = filterProps("engine")
  const fuel = filterProps("fuel")
  const odo = filterProps("odo")
  const agree = filterProps("agree")

  const addrProps = {
    legend: `
      ${zip?.legend ? `${zip.legend} /` : ``}
      ${town?.legend ? `${town.legend} /` : ``}
      ${street?.legend ? `${street.legend} /` : ``}
      ${nr?.legend ? `${nr.legend}` : ``}
    `,
    val: `
      ${zip?.val ? `${zip.val}` : ``}
      ${town?.val ? `${town.val}${street?.val ? `,` : ``}` : ``}
      ${street?.val ? `${street.val}` : ``}
      ${nr?.val ? `${nr.val}` : ``}
    `
  }
  const contactsProps = {
    legend: `
      ${tel?.legend ? `${tel.legend} /` : ``}
      ${www?.legend ? `${www.legend} /` : ``}
      ${email?.legend ? `${email.legend}` : ``}
    `,
    val: `
      ${tel?.val ? `${tel.val}${www?.val ? `,` : ``}` : ``}
      ${www?.val ? `${www.val}${email?.val ? `,` : ``}` : ``}
      ${email?.val ? `${email.val}` : ``}
    `
  }
  const carProps = {
    legend: `
      ${brand?.legend ? `${brand.legend} /` : ``}
      ${model?.legend ? `${model.legend}` : ``}
    `,
    val: `
      ${brand?.val ? `${brand.val}${(brand?.val && model?.val) ? ` - ` : ``}` : ``}
      ${model?.val ? `${model.val}` : ``}
    `
  }
  const carInfoProps = {
    legend: `
      ${odo?.legend ? `${odo.legend} /` : ``}
      ${fuel?.legend ? `${fuel.legend} /` : ``}
      ${agree?.legend ? `${agree.legend}` : ``}
    `,
    val: `
      ${odo?.val ? `${odo.val}${fuel?.val ? `,` : ``}` : ``}
      ${fuel?.val ? `${fuel.val}${agree?.val ? `,` : ``}` : ``}
      ${agree?.val ? `${agree.val}` : ``}
    `
  }

  return(
    <div className="InfoPrintPannel flex column start">
    { name && <InfoPrintLine props={name}/> }
    { nip && <InfoPrintLine props={nip}/> }
    { account && <InfoPrintLine props={account}/> }
    { (zip || town || street || nr) && <InfoPrintLine props={addrProps}/> }
    { (tel || www || email) && <InfoPrintLine props={contactsProps}/> }
    { (brand || model) && <InfoPrintLine props={carProps}/> }
    { vin && <InfoPrintLine props={vin}/> }
    { prod && <InfoPrintLine props={prod}/> }
    { engine && <InfoPrintLine props={engine}/> }
    { (fuel || odo || agree) && <InfoPrintLine props={carInfoProps}/> }
    </div>
  )
}

function InfoPrintLine({ props:{legend, val} }){
  return(
    <div className={`InfoLine flex column`}>
      <span className="InfoLineTitle flex start">{legend}</span>
      <span className="InfoLineVal flex start">{val}</span>
    </div>
  )
}