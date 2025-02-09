import { PostToApi } from "../../../../AppFunctions"


export const FIreducer = (action, callback)=>{

  switch (action.type) {
    case "GET_FINANCES":      GET_FINANCES();     break;
    case "SAVE_FIN_MONTH":    SAVE_FIN_MONTH();   break;
    case "GET_FIN_DOCS":      GET_FIN_DOCS();     break;
    default: break;
  }

  function GET_FINANCES(){
    const query = {getFinances:true, query:action?.query}
    PostToApi( '/getOffice', query, (data)=> callback(data) )
  }

  function SAVE_FIN_MONTH(){
    const query = {saveFinMonth:true, query:action?.query}
    PostToApi( '/getOffice', query, (data)=> callback(data) )
  }

  function GET_FIN_DOCS(){
    const query = {getFinDocs:true, date:action?.taxDate, company:action?.company}
    PostToApi( '/getOffice', query, (data)=> callback(data) )
  }

}