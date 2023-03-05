import { tr } from "../../../../AppTranslate"
import { sanitizeTxt } from "../../../../AppFunctions"


export const CompanyProps = (lang, company, setCompany)=>{
  return {
    shortName: {
      legend: "Short Name",
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.shortName ? sanitizeTxt(company.shortName, `CompanyNameShort`).sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, shortName:val
      })),
      cbErr: ()=>{}
    },
    name: {
      legend: "Name",
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.name ? sanitizeTxt(company.name, 'CompanyName').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, name:val
      })),
      cbErr: ()=>{}
    },
    nip: {
      legend: "NIP",
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.nip ? sanitizeTxt(company.nip, 'NIP').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, nip:val
      })),
      cbErr: ()=>{}
    },
    account: {
      legend: "Account",
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.account ? sanitizeTxt(company.account, 'ACC').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, account:val
      })),
      cbErr: ()=>{}
    },
    zip: {
      legend: "ZIP",
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.addr?.zip ? sanitizeTxt(company.addr.zip, 'ZIP').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, addr:{...prev.addr, zip:val}
      })),
      cbErr: ()=>{}
    },
    town: {
      legend: "town",
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.addr?.town ? sanitizeTxt(company.addr.town, 'town').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, addr:{...prev.addr, town:val}
      })),
      cbErr: ()=>{}
    },
    streetName: {
      legend: "streetName",
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.addr?.street?.name ? sanitizeTxt(company.addr.street.name, 'StreetName').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, addr:{...prev.addr, street:{...prev.addr.street, name:val}}
      })),
      cbErr: ()=>{}
    },
    streetNr: {
      legend: "streetNr",
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.addr?.street?.nr ? sanitizeTxt(company.addr.street.nr, 'town').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, addr:{...prev.addr, street:{...prev.addr.street, nr:val}}
      })),
      cbErr: ()=>{}
    },
    tel: {
      legend: "tel",
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.contacts?.tel ? sanitizeTxt(company.contacts.tel, 'tel').sanText : '',
      cbVal: (val)=> setCompany( (prev) => ({
        ...prev, contacts:{...prev.contacts, tel:val}
      })),
      cbErr: ()=>{}
    },
    www: {
      legend: "www",
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