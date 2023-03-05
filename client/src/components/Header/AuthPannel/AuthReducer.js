import { PostToApi, RemToken } from "../../../AppFunctions"
import { tr } from "../../../AppTranslate"
import { GetUser, SetUser, RemUser } from "../../../AppFunctions";


export const AuthReducer = (action, setFormErr, AppReload)=>{

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
        setFormErr(
          {
            login:    obj?.login    ? tr(obj.login, lang)   : false,
            email:    obj?.email    ? tr(obj.email, lang)   : false,
            pass:     obj?.pass     ? tr(obj.pass, lang)    : false,
            verify:   obj?.verify   ? tr(obj.verify, lang)  : false,
            confirm:  obj?.confirm  ? tr(obj.confirm, lang) : false,
          }
        )
        return
      }

      SetUser(authData)
      AppReload()

    })
  }

  function LOGOUT(){
    RemUser()
    RemToken()
    AppReload()
  }

}