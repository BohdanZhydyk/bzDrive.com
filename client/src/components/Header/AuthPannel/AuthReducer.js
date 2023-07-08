import { PostToApi, RemToken } from "../../../AppFunctions"
import { tr } from "../../../AppTranslate"
import { GetUser, SetUser, RemUser } from "../../../AppFunctions";


export const AuthReducer = (action, setFormErr, CHG_ACT, AppReload)=>{

  const lang = GetUser().lang

  switch (action.type) {
    case "SUBMIT": SUBMIT(); break;
    case "LOGOUT": LOGOUT(); break;
    default: break;
  }
  
  function SUBMIT(){

    const query = {act:action.act, lang, formData:action.formData}

    PostToApi( '/getAuth', query, (authData)=>{

      if(authData?.chgPannel){
        CHG_ACT(authData?.chgPannel)
        return
      }
      
      const errors = authData?.errors

      if(errors){
        setFormErr(
          {
            login:    errors?.login    ? tr(errors.login, lang)   : false,
            email:    errors?.email    ? tr(errors.email, lang)   : false,
            pass:     errors?.pass     ? tr(errors.pass, lang)    : false,
            verify:   errors?.verify   ? tr(errors.verify, lang)  : false,
            confirm:  errors?.confirm  ? tr(errors.confirm, lang) : false,
          }
        )
        return
      }

      SetUser(authData)
      AppReload()

    })
  }

  function LOGOUT(){

    const query = {act:action.act, login:GetUser().login}
    PostToApi( '/getAuth', query, (logoutData)=>{})

    RemUser()
    RemToken()
    AppReload()

  }

}