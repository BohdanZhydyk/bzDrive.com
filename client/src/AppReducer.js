import { PostToApi } from "./AppFunctions";


export const AppReducer = (action, state, setState)=>{

  switch (action.type) {
    case "GET_STATE": GET_STATE(); break;
    default: break;
  }

  // function GET_STATE(){ cb({...state, user:"bz"}) }
  function GET_STATE(){
    PostToApi( '/getState', {myObj:true}, (data)=> setState(data) )
  }

}