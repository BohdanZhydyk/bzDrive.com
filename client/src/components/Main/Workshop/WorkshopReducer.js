import { PostToApi } from "../../../AppFunctions"


export const WorkshopReducer = (action, workshop, setWorkshop)=>{

  switch (action.type) {
    case "GET_WORKSHOP": GET_WORKSHOP(); break;
    default: break;
  }

  function GET_WORKSHOP(){
    const query = {}
    PostToApi( '/getWorkshop', query, (data)=> setWorkshop(data?.workshop) )
  }

}