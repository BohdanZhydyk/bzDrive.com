import { PostToApi } from "../../../../AppFunctions"


export const FSreducer = (action, callback)=>{

  switch (action.type) {
    case "GET_INVOICES":  GET_INVOICES();   break;
    default: break;
  }

  function GET_INVOICES(){
    const query = {getInvoices:true, query:action?.query}
    PostToApi( '/getOffice', query, (data)=> callback(data) )
  }

}