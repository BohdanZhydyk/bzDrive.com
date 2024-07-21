import { PostToApi } from "../../../../AppFunctions"


export const FIreducer = (action, callback)=>{

  switch (action.type) {
    case "GET_FINANCES":    GET_FINANCES();   break;
    case "SAVE_MONTH":      SAVE_MONTH();     break;
    case "GET_DOCUMENTS":   GET_DOCUMENTS();  break;
    default: break;
  }

  function GET_FINANCES(){
    const query = {getFinances:true, query:action?.query}
    PostToApi( '/getOfficeOld', query, (data)=> callback(data) )
  }

  function SAVE_MONTH(){
    const query = {saveMonth:true, query:action?.query}
    PostToApi( '/getOfficeOld', query, (data)=> callback(data) )
  }

  function GET_DOCUMENTS(){
    const query = {getDocuments:true, date:action?.taxDate, company:action?.company}
    PostToApi( '/getOfficeOld', query, (data)=> callback(data) )
  }

}