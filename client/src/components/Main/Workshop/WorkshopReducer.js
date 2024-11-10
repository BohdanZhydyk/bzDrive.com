import { PostToApi } from "../../../AppFunctions"


export const WorkshopReducer = ({action, editingTag, setWorkshop, setEditMode, setEditingTag, AppReload})=>{

  setWorkshop(prev=>false)
  setEditMode(prev=>false)
  setEditingTag(prev=>false)

  switch (action.type) {
    case "GET_WORKSHOP":      GET_WORKSHOP();       break
    case "SAVE_WORKSHOP":     SAVE_WORKSHOP();      break
    case "SAVE_NAVIGATION":   SAVE_NAVIGATION();    break
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

  function SAVE_NAVIGATION(){
    const query = {saveNavigation:true, nav:action?.nav}
    PostToApi( '/getWorkshop', query, (data)=> AppReload() )
  }

}