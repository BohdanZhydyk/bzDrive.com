import { PostToApi } from "../../../../AppFunctions"


export const PassReducer = (action, callback)=>{

  switch (action.type) {
    case "GET_PASS":    GET_PASS();   break;
    case "SAVE_PASS":   SAVE_PASS();  break;
    case "SHOW_PASS":   SHOW_PASS();  break;
    default: break;
  }

  function GET_PASS(){
    const query = {getPass:true, query:{}}
    PostToApi( '/getPass', query, (data)=> callback(
      data.sort( (a, b)=> a.siteName.localeCompare(b.siteName) )
    ))
  }

  function SAVE_PASS(){
    const query = {savePass:true, query:action?.query}
    PostToApi( '/getPass', query, (data)=> callback(
      data.sort( (a, b)=> a.siteName.localeCompare(b.siteName) )
    ))
  }

  function SHOW_PASS(){
    const query = {showPass:true, query:{_id:action?.query?.id, l:action?.query?.l}}
    PostToApi( '/getPass', query, (data)=> callback(data) )
  }

}