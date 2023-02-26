import { PostToApi } from "./../../../AppFunctions"


export const OfficeReducer = (action, settings, setSettings)=>{

  switch (action.type) {
    case "GET_SETTINGS": GET_SETTINGS(); break;
    default: break;
  }

  function GET_SETTINGS(){
    const query = {getSettings:true}
    // PostToApi( '/getOffice', query, (data)=> console.log("setData",data) )
  }

}