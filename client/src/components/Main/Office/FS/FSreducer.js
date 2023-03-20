import { PostToApi } from "../../../../AppFunctions"


export const FSreducer = (action, callback)=>{

  switch (action.type) {
    case "GET_INVOICES":  GET_INVOICES();   break;
    case "SAVE_DOC":      SAVE_DOC();       break;
    default: break;
  }

  function GET_INVOICES(){
    const query = {getInvoices:true, query:action?.query}
    PostToApi( '/getOffice', query, (data)=> callback(data) )
  }

  function SAVE_DOC(){

    const id = action?.id
    const docData = action?.docData

    const query = {saveDoc:true, id, docData}
    PostToApi( '/getOffice', query, (data)=> GET_INVOICES() )

  }

}