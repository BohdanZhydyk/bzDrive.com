import { PostToApi } from "../../../AppFunctions"


export const WorkshopReducer = (action, workshop, setWorkshop)=>{

  switch (action.type) {
    case "GET_WORKSHOP":    GET_WORKSHOP();   break;
    case "SAVE_WORKSHOP":   SAVE_WORKSHOP();  break;
    default: break;
  }

  function GET_WORKSHOP(){
    const query = {getWS:true}
    setWorkshop(prev=>false)
    PostToApi( '/getWorkshop', query, (data)=> setWorkshop(data?.workshop) )
  }

  function SAVE_WORKSHOP(){
    const query = {setWS:true, workshop}
    setWorkshop(prev=>false)
    PostToApi( '/getWorkshop', query, (data)=> setWorkshop(data?.workshop) )
  }

}