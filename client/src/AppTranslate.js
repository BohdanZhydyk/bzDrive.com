
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
  }

  return translations[txt] ? translations[txt][lang] : <span className="txtRed">-</span>
}