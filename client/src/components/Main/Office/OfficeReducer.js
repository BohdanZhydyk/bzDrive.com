import { PostToApi } from "./../../../AppFunctions"


export const OfficeReducer = (action, user, setDef, setCompanies, setCompany)=>{

  switch (action.type) {
    case "GET_COMPANIES": GET_COMPANIES(); break;
    default: break;
  }

  function GET_COMPANIES(){

    const query = {getCompany:true}
    PostToApi( '/getOffice', query, (data)=>{
      const newID = new Date().getTime()
      const newCompany = {"id": newID, "director": user?.login ?? `ID_${newID}`}
      const companies = [newCompany, ...data]
      const def = companies.length > 1 ? 1 : 0
      setDef(def)
      setCompanies(companies)
      setCompany(companies[def])
    })
  }

}