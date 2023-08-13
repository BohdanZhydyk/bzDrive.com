import { PostToApi } from "../../../AppFunctions"


export const WorkshopReducer = (action, editingTag, setWorkshop, setEditMode, setEditingText)=>{

  setWorkshop(prev=>false)
  setEditMode(prev=>false)
  setEditingText(prev=>false)

  switch (action.type) {
    case "GET_WORKSHOP":    GET_WORKSHOP();   break;
    case "SAVE_WORKSHOP":   SAVE_WORKSHOP();  break;
    default: break;
  }

  function GET_WORKSHOP(){
    const query = {getWorkshop:true}
    PostToApi( '/getWorkshop', query, (data)=> setWorkshop(data?.workshop) )
  }

  function SAVE_WORKSHOP(){
    const query = {setWorkshop:true, tag:editingTag}
    PostToApi( '/getWorkshop', query, (data)=> setWorkshop(data?.workshop) )
  }

}