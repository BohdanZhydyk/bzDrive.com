import { PostToApi } from "./AppFunctions";


export const AppReducer = (action, state, setState)=>{

  switch (action.type) {
    case "GET_STATE": GET_STATE(); break;
    default: break;
  }

  function GET_STATE(){
    const query = {}
    PostToApi( '/getState', query, (data)=> setState(data) )
  }

}