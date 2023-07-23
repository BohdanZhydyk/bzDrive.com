import { PostToApi } from "./../../../AppFunctions"


export const OfficeReducer = (action, user, setDef, setCompanies, setCompany)=>{

  switch (action.type) {
    case "GET_COMPANIES": GET_COMPANIES(); break;
    default: break;
  }

  function GET_COMPANIES(){

    const query = {getCompany:true}
    PostToApi( '/getOffice', query, (data)=>{
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

}