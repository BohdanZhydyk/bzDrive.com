
export const tr = (txt, lang)=>{

  const translations = {
    PlaceHolder:{en:`enter data...`, ua:`введіть дані...`, pl:`wprowadź dane...`},
    LogInLegend:{en:`login`, ua:`логін`, pl:`login`},
    EmailLegend:{en:`email`, ua:`email`, pl:`email`},
    PassLegend:{en:`password`, ua:`пароль`, pl:`hasło`},
    VerifyLegend:{en:`confirm password`, ua:`підтвердження пароля`, pl:`potwierdzenie hasła`},
    ConfirmLegend:{en:`confirmation`, ua:`підтвердження`, pl:`potwierdzenie`},
    LogInTitle:{en:`Login`, ua:`Вхід`, pl:`Logowanie`},
    SignUpTitle:{en:`Registration`, ua:`Реєстрація`, pl:`Rejestracja`},
    ForgotTitle:{en:`Password Reset`, ua:`Скидання пароля`, pl:`Resetowanie hasła`},
    ConfirmTitle:{en:`Confirmation`, ua:`Підтвердження`, pl:`Potwierdzenie`},
    LogInBtn:{en:`Log In`, ua:`Увійти`, pl:`Zaloguj się`},
    SignUpBtn:{en:`Sign Up`, ua:`Зареєструватися`, pl:`Zarejestruj się`},
    ForgotBtn:{en:`Forgot Password?`, ua:`Забув пароль?`, pl:`Zapomniałeś hasła?`},
    PrivacyBtn:{en:`Privacy Policy`, ua:`Політика конфіденційності`, pl:`Polityka prywatności`},
    LogOutBtn:{en:`Log Out`, ua:`Вийти`, pl:`Wyloguj się`},
    CommingSoon_1:{
      en: `Information panel, where users can view their data and activity history, coming soon.`,
      ua: `Панель інформації, де користувачі зможуть переглянути свої дані та історію дій, скоро буде доступна.`,
      pl: `Panel informacji, gdzie użytkownicy będą mogli zobaczyć swoje dane oraz historię działań, wkrótce będzie dostępny.`,
    },
    CommingSoon_2:{
      en: `Stay tuned!..`,
      ua: `Слідкуйте за оновленнями!..`,
      pl: `Śledź nasze aktualności!..`,
    },
    Err_1:{
      en: "this field cannot be empty!",
      ua: "це поле не може бути порожнім!",
      pl: "to pole nie może być puste!"
    },
    Err_2: {
      en: "must contain from 4 to 8 characters!",
      ua: "має містити від 4 до 8 символів!",
      pl: "musi zawierać od 4 do 8 znaków!"
    },
    Err_3: {
      en: "wrong e-mail is entered!",
      ua: "введено неправильний e-mail!",
      pl: "wprowadzono nieprawidłowy adres e-mail!"
    },
    Err_4: {
      en: "must contain at least one special character!",
      ua: "має містити принаймні один спеціальний символ!",
      pl: "musi zawierać co najmniej jeden znak specjalny!"
    },    
    Err_5: {
      en: "must contain at least one lowercase letter!",
      ua: "має містити принаймні одну малу літеру!",
      pl: "musi zawierać przynajmniej jedną małą literę!"
    },
    Err_6: {
      en: "must contain at least one digit!",
      ua: "має містити принаймні одну цифру!",
      pl: "musi zawierać przynajmniej jedną cyfrę!"
    },
    Err_7: {
      en: "must contain at least one uppercase letter!",
      ua: "має містити хоча б одну велику літеру!",
      pl: "musi zawierać co najmniej jedną dużą literę!"
    },
    Err_8: {
      en: "must contain from 8 to 20 characters!",
      ua: "має містити від 8 до 20 символів!",
      pl: "musi zawierać od 8 do 20 znaków!",
    },
    UserNotPresent:{
      en: "such user is not present in a database!",
      ua: "такий користувач не знайдений в базі даних!",
      pl: "taki użytkownik nie istnieje w bazie danych!"
    },
    WrongPass:{
      en: "a wrong password is entered!",
      ua: "введено неправильний пароль!",
      pl: "wprowadzono nieprawidłowe hasło!"
    },
    AppAuthor: {
      en: `Web application author:`,
      ua: `Автор веб-додатку:`,
      pl: `Autor aplikacji webowej:`,
    },
    NewTranslate:{en:``, ua:``, pl:``}
  }

  return translations[txt] ? translations[txt][lang] : <span className="txtRed">-</span>
}