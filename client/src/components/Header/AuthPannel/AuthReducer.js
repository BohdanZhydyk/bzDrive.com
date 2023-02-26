import { PostToApi } from "../../../AppFunctions"
import { tr } from "../../../AppTranslate"
import { GetUser, SetUser, RemUser } from "../../../AppFunctions";


export const AuthReducer = (action, setServErr, AppReload)=>{

  switch (action.type) {
    case "SUBMIT": SUBMIT(); break;
    case "LOGOUT": LOGOUT(); break;
    default: break;
  }

  const lang = GetUser().lang

  function SUBMIT(){

    const query = {act:action.act, formData:action.formData}

    PostToApi( '/getAuth', query, (authData)=>{

      if(authData?.errors){
        const obj = authData?.errors
        const result = 
          (obj.login ? `${ tr(obj.login, lang) }\n` : '') +
          (obj.pass ? `${ tr(obj.pass, lang) }\n` : '')
        setServErr( result ) //logika bledow servera
        return
      }

      // logika pomyslnego logowania
      SetUser(authData)
      AppReload()

    })
  }

  function LOGOUT(){
    RemUser()
    AppReload()
  }

}