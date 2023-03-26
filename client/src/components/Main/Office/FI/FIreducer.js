import { PostToApi } from "../../../../AppFunctions"


export const FIreducer = (action, callback)=>{

  switch (action.type) {
    case "GET_FINANCES":  GET_FINANCES();   break;
    case "SAVE_DOC":      SAVE_DOC();       break;
    case "SAVE_MONTH":    SAVE_MONTH();     break;
    default: break;
  }

  function GET_FINANCES(){
    const query = {getFinances:true, query:action?.query}
    PostToApi( '/getOffice', query, (data)=> callback(data) )
  }

  function SAVE_DOC(){

    const id = action?.id
    const docData = action?.docData

    const query = {saveDoc:true, id, docData}
    PostToApi( '/getOffice', query, (data)=> GET_FINANCES() )

  }

  function SAVE_MONTH(){
    const query = {saveMonth:true, query:action?.query}
    PostToApi( '/getOffice', query, (data)=> callback(data) )
  }

}