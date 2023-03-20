import { tr } from "../../../../AppTranslate"
import { sanitizeTxt } from "../../../../AppFunctions"


export const CompanyProps = (lang, company, setCompany)=>{
  return {
    shortName: {
      legend: tr(`ShortName`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.shortName ? sanitizeTxt(company.shortName, `CompanyNameShort`).sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, shortName:val
      })),
      cbErr: ()=>{}
    },
    name: {
      legend: tr(`NameLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.name ? sanitizeTxt(company.name, 'CompanyName').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, name:val
      })),
      cbErr: ()=>{}
    },
    nip: {
      legend: tr(`NipLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.nip ? sanitizeTxt(company.nip, 'NIP').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, nip:val
      })),
      cbErr: ()=>{}
    },
    account: {
      legend: tr(`AccountLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.account ? sanitizeTxt(company.account, 'ACC').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, account:val
      })),
      cbErr: ()=>{}
    },
    zip: {
      legend: tr(`ZipLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.addr?.zip ? sanitizeTxt(company.addr.zip, 'ZIP').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, addr:{...prev.addr, zip:val}
      })),
      cbErr: ()=>{}
    },
    town: {
      legend: tr(`TownLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.addr?.town ? sanitizeTxt(company.addr.town, 'town').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, addr:{...prev.addr, town:val}
      })),
      cbErr: ()=>{}
    },
    streetName: {
      legend: tr(`StreetLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.addr?.street ? sanitizeTxt(company.addr.street, 'StreetName').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, addr:{...prev.addr, street:val}
      })),
      cbErr: ()=>{}
    },
    streetNr: {
      legend: tr(`StreetNrLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.addr?.nr ? sanitizeTxt(company.addr.nr, 'town').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, addr:{...prev.addr, nr:val}
      })),
      cbErr: ()=>{}
    },
    tel: {
      legend: tr(`TelLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.contacts?.tel ? sanitizeTxt(company.contacts.tel, 'tel').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, contacts:{...prev.contacts, tel:val}
      })),
      cbErr: ()=>{}
    },
    www: {
      legend: tr(`WwwLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.contacts?.www ? sanitizeTxt(company.contacts.www, 'www').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, contacts:{...prev.contacts, www:val}
      })),
      cbErr: ()=>{}
    },
    email: {
      legend: tr(`EmailLegend`,lang),
      type: `email`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.contacts?.email ? sanitizeTxt(company.contacts.email, 'email').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, contacts:{...prev.contacts, email:val}
      })),
      cbErr: ()=>{}
    }
  }
}