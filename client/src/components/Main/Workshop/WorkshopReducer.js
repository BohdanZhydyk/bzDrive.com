import { PostToApi } from "../../../AppFunctions"


export const WorkshopReducer = ({action, editingTag, setWorkshop, setEditMode, setEditingTag, AppReload})=>{

  function SetAll(){
    setWorkshop(prev=>false)
    setEditMode(prev=>false)
    setEditingTag(prev=>false)
  }

  switch (action.type) {
    case "GET_WORKSHOP":          GET_WORKSHOP();           break
    case "SAVE_WORKSHOP":         SAVE_WORKSHOP();          break
    case "SAVE_NAVIGATION":       SAVE_NAVIGATION();        break
    case "ADD_NEW_SHORT":         ADD_NEW_SHORT();          break
    case "DELETE_SHORT":          DELETE_SHORT();           break
    default: break;
  }

  function GET_WORKSHOP(){
    SetAll()
    const query = {getWorkshop:true}
    PostToApi( '/getWorkshop', query, (data)=> setWorkshop(data?.workshop) )
  }

  function SAVE_WORKSHOP(){
    SetAll()
    const query = {setWorkshop:true, tag:editingTag}
    PostToApi( '/getWorkshop', query, (data)=> setWorkshop(data?.workshop) )
  }

  function SAVE_NAVIGATION(){
    SetAll()
    const query = {saveNavigation:true, nav:action?.nav}
    PostToApi( '/getWorkshop', query, (data)=> AppReload() )
  }

  function ADD_NEW_SHORT(){
    const query = { addNewShort: true, newShort: action?.newShort, i: action?.i }
    PostToApi('/getWorkshop', query, (data)=> { setWorkshop(prev => prev.map(el => el.tag !== "youtube" ? el : data)) })
  }

  function DELETE_SHORT(){
    const query = {deleteShort:true, id:action?.short?.id}
    PostToApi('/getWorkshop', query, (data)=> { setWorkshop(prev => prev.map(el => el.tag !== "youtube" ? el : data)) })
  }

}