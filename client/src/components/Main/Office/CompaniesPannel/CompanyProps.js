import { tr } from "../../../../AppTranslate"
import { sanitizeTxt } from "../../../../AppFunctions"


export const CompanyProps = ({lang, company, setCompanies})=>{

  return {
    shortName: {
      legend: tr(`ShortName`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.shortName ? sanitizeTxt(company.shortName, `CompanyNameShort`).sanText : '',
      cbVal: (val)=> setCompanies( (prev) => ({
        ...prev, companiesData: prev?.companiesData.map( (comp, c)=> c !== company ? comp : {...comp, shortName:val  } )
      })),
      cbErr: ()=>{}
    },
    name: {
      legend: tr(`NameLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.name ? sanitizeTxt(company.name, 'CompanyName').sanText : '',
      cbVal: (val)=> setCompanies( (prev) => ({
        ...prev, companiesData: prev?.companiesData.map( (comp, c)=> c !== company ? comp : {...comp, name:val  } )
      })),
      cbErr: ()=>{}
    },
    nip: {
      legend: tr(`NipLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.nip ? sanitizeTxt(company.nip, 'NIP').sanText : '',
      cbVal: (val)=> setCompanies( (prev) => ({
        ...prev, companiesData: prev?.companiesData.map( (comp, c)=> c !== company ? comp : {...comp, nip:val  } )
      })),
      cbErr: ()=>{}
    },
    account: {
      legend: tr(`AccountLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.account ? sanitizeTxt(company.account, 'ACC').sanText : '',
      cbVal: (val)=> setCompanies( (prev) => ({
        ...prev, companiesData: prev?.companiesData.map( (comp, c)=> c !== company ? comp : {...comp, account:val  } )
      })),
      cbErr: ()=>{}
    },
    zip: {
      legend: tr(`ZipLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.addr?.zip ? sanitizeTxt(company.addr.zip, 'ZIP').sanText : '',
      cbVal: (val)=> setCompanies( (prev) => ({
        ...prev, companiesData: prev?.companiesData.map( (comp, c)=> c !== company ? comp : {...comp, addr:{...comp.addr, zip:val}  } )
      })),
      cbErr: ()=>{}
    },
    town: {
      legend: tr(`TownLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.addr?.town ? sanitizeTxt(company.addr.town, 'town').sanText : '',
      cbVal: (val)=> setCompanies( (prev) => ({
        ...prev, companiesData: prev?.companiesData.map( (comp, c)=> c !== company ? comp : {...comp, addr:{...comp.addr, town:val}  } )
      })),
      cbErr: ()=>{}
    },
    streetName: {
      legend: tr(`StreetLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.addr?.street ? sanitizeTxt(company.addr.street, 'StreetName').sanText : '',
      cbVal: (val)=> setCompanies( (prev) => ({
        ...prev, companiesData: prev?.companiesData.map( (comp, c)=> c !== company ? comp : {...comp, addr:{...comp.addr, street:val}  } )
      })),
      cbErr: ()=>{}
    },
    streetNr: {
      legend: tr(`StreetNrLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.addr?.nr ? sanitizeTxt(company.addr.nr, 'default').sanText : '',
      cbVal: (val)=> setCompanies( (prev) => ({
        ...prev, companiesData: prev?.companiesData.map( (comp, c)=> c !== company ? comp : {...comp, addr:{...comp.addr, nr:val}  } )
      })),
      cbErr: ()=>{}
    },
    tel: {
      legend: tr(`TelLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.contacts?.tel ? sanitizeTxt(company.contacts.tel, 'tel').sanText : '',
      cbVal: (val)=> setCompanies( (prev) => ({
        ...prev, companiesData: prev?.companiesData.map( (comp, c)=> c !== company ? comp : {...comp, contacts:{...comp.contacts, tel:val}  } )
      })),
      cbErr: ()=>{}
    },
    www: {
      legend: tr(`WwwLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.contacts?.www ? sanitizeTxt(company.contacts.www, 'www').sanText : '',
      cbVal: (val)=> setCompanies( (prev) => ({
        ...prev, companiesData: prev?.companiesData.map( (comp, c)=> c !== company ? comp : {...comp, contacts:{...comp.contacts, www:val}  } )
      })),
      cbErr: ()=>{}
    },
    email: {
      legend: tr(`EmailLegend`,lang),
      type: `email`,
      plhol: tr(`PlaceHolder`,lang),
      val: company?.contacts?.email ? sanitizeTxt(company.contacts.email, 'email').sanText : '',
      cbVal: (val)=> setCompanies( (prev) => ({
        ...prev, companiesData: prev?.companiesData.map( (comp, c)=> c !== company ? comp : {...comp, contacts:{...comp.contacts, email:val}  } )
      })),
      cbErr: ()=>{}
    }
  }
}