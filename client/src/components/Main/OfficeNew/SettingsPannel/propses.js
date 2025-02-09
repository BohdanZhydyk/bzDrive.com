import { sanitizeTxt } from "../../../../AppFunctions"


export const companyPropses = ({myCompany, setMyCompany, setIsCompanyEdit})=>([
  [
    {
      st:"CompanyNameShort", props:{
        legend:"Nazwa", val:sanitizeTxt(myCompany?.shortName, "CompanyNameShort")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({ ...prev, shortName:sanitizeTxt(val, "CompanyNameShort")?.sanText }))
          setIsCompanyEdit(prev=>true)
        }
      }
    },
    {
      st:"InputNIP", props:{
        legend:"NIP", val:sanitizeTxt(myCompany?.nip, "NIP")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({ ...prev, nip:sanitizeTxt(val, "NIP")?.sanText }))
          setIsCompanyEdit(prev=>true)
        }
      }
    },
    {
      st:"InputREGON", props:{
        legend:"REGON", val:sanitizeTxt(myCompany?.regon, "REGON")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({ ...prev, regon:sanitizeTxt(val, "REGON")?.sanText }))
          setIsCompanyEdit(prev=>true)
        }
      }
    },
    {
      st:"InputKRS", props:{
        legend:"KRS", val:sanitizeTxt(myCompany?.krs, "NIP")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({ ...prev, krs:sanitizeTxt(val, "NIP")?.sanText }))
          setIsCompanyEdit(prev=>true)
        }
      }
    }
  ],
  [
    {
      st:"CompanyNameFull", props:{
        legend:"Pełna Nazwa", val:sanitizeTxt(myCompany?.name, "CompanyNameFull")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({ ...prev, name:sanitizeTxt(val, "CompanyNameFull")?.sanText }))
          setIsCompanyEdit(prev=>true)
        }
      }
    },
    {
      st:"BusinessType", props:{
        legend:"Rodzaj działalności", val:sanitizeTxt(myCompany?.businessType, "default")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({ ...prev, businessType:sanitizeTxt(val, "default")?.sanText }))
          setIsCompanyEdit(prev=>true)
        }
      }
    }
  ],
  [
    {
      st:"InputZIP", props:{
        legend:"Kod", val:sanitizeTxt(myCompany?.addr?.zip, "ZIP")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({ ...prev, addr:{...prev?.addr, zip:sanitizeTxt(val, "ZIP")?.sanText} }))
          setIsCompanyEdit(prev=>true)
        }
      }
    },
    {
      st:"InputTown", props:{
        legend:"Miejscowość", val:sanitizeTxt(myCompany?.addr?.town, "town")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({ ...prev, addr:{...prev?.addr, town:sanitizeTxt(val, "town")?.sanText} }))
          setIsCompanyEdit(prev=>true)
        }
      }
    },
    {
      st:"InputStreet", props:{
        legend:"Ulica", val:sanitizeTxt(myCompany?.addr?.street, "StreetName")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({...prev, addr:{...prev?.addr, street:sanitizeTxt(val, "StreetName")?.sanText} }))
          setIsCompanyEdit(prev=>true)
        }
      }
    },
    {
      st:"InputNr", props:{
        legend:"Nr", val:sanitizeTxt(myCompany?.addr?.nr, "default")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({...prev, addr:{...prev?.addr, nr:sanitizeTxt(val, "default")?.sanText} }))
          setIsCompanyEdit(prev=>true)
        }
      }
    }
  ],
  [
    {
      st:"InputTel", props:{
        legend:"Telefon", val:sanitizeTxt(myCompany?.contacts?.tel, "tel")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({...prev, contacts:{...prev?.contacts, tel:sanitizeTxt(val, "tel")?.sanText} }))
          setIsCompanyEdit(prev=>true)
        }
      }
    },
    {
      st:"InputWWW", props:{
        legend:"WWW", val:sanitizeTxt(myCompany?.contacts?.www, "www")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({...prev, contacts:{...prev?.contacts, www:sanitizeTxt(val, "www")?.sanText} }))
          setIsCompanyEdit(prev=>true)
        }
      }
    },
    {
      st:"InputEmail", props:{
        legend:"Email", val:sanitizeTxt(myCompany?.contacts?.email, "email")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({...prev, contacts:{...prev?.contacts, email:sanitizeTxt(val, "email")?.sanText} }))
          setIsCompanyEdit(prev=>true)
        }
      }
    }
  ],
  [
    {
      st:"InputAcc", props:{
        legend:"Rachunek bankowy", val:sanitizeTxt(myCompany?.account, "ACC")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({...prev, account:sanitizeTxt(val, "ACC")?.sanText} ))
          setIsCompanyEdit(prev=>true)
        }
      }
    }
  ],
  [
    {
      st:"InputAccZUS", props:{
        legend:"Rachunek ZUS", val:sanitizeTxt(myCompany?.acc_ZUS, "ACC")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({...prev, acc_ZUS:sanitizeTxt(val, "ACC")?.sanText} ))
          setIsCompanyEdit(prev=>true)
        }
      }
    }
  ],
  [
    {
      st:"InputAccVAT", props:{
        legend:"Rachunek VAT", val:sanitizeTxt(myCompany?.acc_VAT, "ACC")?.sanText,
        onChange:(val)=>{
          setMyCompany(prev=> ({...prev, acc_VAT:sanitizeTxt(val, "ACC")?.sanText} ))
          setIsCompanyEdit(prev=>true)
        }
      }
    }
  ]
])