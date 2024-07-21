import { PostToApi } from "./../../../AppFunctions"
import { ZLreducer } from "./AreaZL/ZLreducer";


export const OfficeReducer = (
  action, setDef, setCompanies, setCompany, company, search, setSearch,
  calendar, setCalendar, invoices, setInvoices, finances, setFinances
)=>{

  switch (action.type) {
    case "GET_COMPANIES":   GET_COMPANIES();    break
    case "SET_NEW_ZL":      SET_NEW_ZL();       break
    case "SET_NEW_FS":      SET_NEW_FS();       break
    case "SET_NEW_FI":      SET_NEW_FI();       break
    default:                                    break
  }

  function GET_COMPANIES(){

    const query = {getCompany:true}
    PostToApi( '/getOfficeOld', query, (data)=>{
      const newID = Date.now()
      const newCompany = {
        "id": newID,
        shortName: `MyFirm_${newID}`,
        "director": data?.userLogin ?? `ID_${newID}`
      }
      const companies = data?.companiesData ? [newCompany, ...data?.companiesData] : [newCompany]
      const def = companies.length > 1 ? 1 : 0
      setDef(def)
      setCompanies(companies)
      setCompany(companies[def])
    })
  }

  function SET_NEW_ZL(){

    const newDoc = action?.doc
    const mode = action?.mode

    setSearch({ ...search, docs: search?.docs?.map( el=> ( el?._id !== newDoc?._id ) ? el : newDoc ) })

    ZLreducer( {type:"GET_CALENDAR", calendar, mode, company}, (data)=>setCalendar(prev=>data) )

  }

  function SET_NEW_FS(){

    const newDoc = action?.doc

    setInvoices( invoices?.map( el=> ( el?._id !== newDoc?._id ) ? el : newDoc ) )

  }

  function SET_NEW_FI(){

    const newDoc = action?.doc

    // console.log(finances);
    // console.log(newDoc);

    setFinances( finances?.map( fi=> ({...fi, doc:fi?.doc?.map( el=> ( el?._id !== newDoc?._id ) ? el : newDoc )}) ) )

  }
}