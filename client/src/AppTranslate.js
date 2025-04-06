
export const tr = (txt, lang)=>{

  const translations = {
    Nav_WORKSHOP: {en: "Workshop", ua:"Майстерня", pl:"Warsztat"},
    Nav_NEWS: {en: "News", ua:"Новини", pl:"Aktualności"},
    Nav_BZTUNE:{en:"bzTune", ua:"bzTune", pl:"bzTune"},
    Nav_APPS: {en: "Apps", ua:"Додатки", pl:"Aplikacje"},
    Nav_BZPASS:{en:"bzPasswords", ua:"bzПаролі", pl:"bzHasła"},
    Nav_BZFILES:{en:"bzFiles", ua:"bzФайли", pl:"bzPliki"},
    Nav_SEABATTLE:{en:"Sea Battle", ua:"Морський бій", pl:"Morski bój"},
    Nav_OFFICE:{en:"Office", ua:"Офіс", pl:"Biuro"},
    Nav_OFFICENEW:{en:"OfficeNew", ua:"ОфісNew", pl:"BiuroNew"},
    Nav_CLEANING:{en:"Cleaning", ua:"Cleaning", pl:"Cleaning"},
    Nav_FI:{en:"Accounting", ua:"Бухгалтерія", pl:"Księgowość"},
    Nav_ZL:{en:"Orders", ua:"Замовлення", pl:"Zlecenia"},
    Nav_FS:{en:"Invoices", ua:"Рахунки", pl:"Faktury"},
    Nav_STATISTIC:{en:"Statistic", ua:"Статистика", pl:"Statystyka"},
    Nav_TRAFFIC:{en:"Traffic", ua:"Трафік", pl:"Trafik"},
    Nav_PROFILE:{en:"Profile", ua:"Профіль", pl:"Profil"},
    Nav_BZCONNECT:{en:"bzConnect", ua:"bzConnect", pl:"bzConnect"},
    PlaceHolder:{en:"enter data...", ua:"введіть дані...", pl:"wprowadź dane..."},
    NipSearchPlaceHolder:{en:"Search by NIP", ua:"Пошук за ІПН", pl:"Wyszukiwarka NIP"},
    DocSearchPlaceHolder:{en:"Document Search", ua:"Пошук документів", pl:"Wyszukiwarka dokumentów"},
    VinSearchPlaceHolder:{en:"VIN decoder", ua:"VIN decoder", pl:"VIN decoder"},
    DocNrLegend:{en:"Document number", ua:"Номер документу", pl:"Numer dokumentu"},
    LogInLegend:{en:"login", ua:"логін", pl:"login"},
    EmailLegend:{en:"email", ua:"email", pl:"email"},
    PassLegend:{en:"password", ua:"пароль", pl:"hasło"},
    VerifyLegend:{en:"confirm password", ua:"підтвердження пароля", pl:"potwierdzenie hasła"},
    ConfirmLegend:{en:"confirmation", ua:"підтвердження", pl:"potwierdzenie"},
    PlaceLegend:{en:"locality", ua:"населений пункт", pl:"miejscowość"},
    PlaceLegendTop:{en:"Locality", ua:"Населений пункт", pl:"Miejscowość"},
    FromLegend:{en:"Issuance date", ua:"Дата видачі", pl:"Data wystawienia"},
    ToLegend:{en:"Repair period", ua:"Термін ремонту", pl:"Termin naprawy"},
    BrandLegend:{en:"brand", ua:"бренд", pl:"marka"},
    ModelLegend:{en:"model", ua:"модель", pl:"model"},
    NumbersLegend:{en:"numbers", ua:"номери", pl:"tablice"},
    VinLegend:{en:"VIN", ua:"VIN", pl:"VIN"},
    EngineLegend:{en:"engine", ua:"двигун", pl:"silnik"},
    ProdLegend:{en:"year of production", ua:"рік виробництва", pl:"rok produkcji"},
    FuelLegend:{en:"fuel level", ua:"рівень палива", pl:"poziom paliwa"},
    OdoLegend:{en:"mileage", ua:"пробіг", pl:"przebieg"},
    AgreeLegend:{en:"test drive consent", ua:"згода на тест-драйв", pl:"zgoda na jazdę próbną"},
    ShortName:{en:"short name", ua:"коротка назва", pl:"krótka nazwa"},
    NameLegend:{en:"name / company name", ua:"ім'я / назва компанії", pl:"imię / nazwa firmy"},
    NipLegend:{en:"NIP", ua:"NIP", pl:"NIP"},
    AccountLegend:{en:"bank account number", ua:"номер банківського рахунку", pl:"numer rachunku bankowego"},
    ZipLegend:{en:"postal code", ua:"поштовий індекс", pl:"kod pocztowy"},
    TownLegend:{en:"town", ua:"населений пункт", pl:"miejscowość"},
    StreetLegend:{en:"street", ua:"вулиця", pl:"ulica"},
    StreetNrLegend:{en:"house", ua:"будинок", pl:"numer"},
    FileNameLegend:{en:"file name", ua:"ім'я файлу", pl:"nazwa pliku"},
    FileAddrLegend:{en:"link", ua:"посилання", pl:"skrót"},
    TelLegend:{en:"phone", ua:"телефон", pl:"telefon"},
    DocLegend:{en:"DOC", ua:"DOC", pl:"DOC"},
    WwwLegend:{en:"website", ua:"веб-сайт", pl:"strona internetowa"},
    Link_tel:{en:"Phone",ua:"Телефон",pl:"Telefon"},
    Link_mailto:{en:"E-mail address", ua:"Електронна адреса", pl:"Adres e-mail"},
    Link_fb:{en:"Facebook",ua:"Facebook",pl:"Facebook"},
    DirectorsList:{en:"director",ua:"директор",pl:"dyrektor"},
    AccountantsList:{en:"accountant",ua:"бухгалтер",pl:"księgowy"},
    WorkersList:{en:"worker", ua:"робітник", pl:"pracownik"},
    LogInTitle:{en:"Login", ua:"Вхід", pl:"Logowanie"},
    SignUpTitle:{en:"Registration", ua:"Реєстрація", pl:"Rejestracja"},
    ForgotTitle:{en:"Password Reset", ua:"Скидання пароля", pl:"Resetowanie hasła"},
    ConfirmTitle:{en:"Confirmation", ua:"Підтвердження", pl:"Potwierdzenie"},
    LogInBtn:{en:"Log In", ua:"Увійти", pl:"Zaloguj się"},
    SignUpBtn:{en:"Sign Up", ua:"Зареєструватися", pl:"Zarejestruj się"},
    ForgotBtn:{en:"Forgot Password?", ua:"Забув пароль?", pl:"Zapomniałeś hasła?"},
    ConfirmBtn:{en:"Confirm", ua:"Підтвердити", pl:"Potwierdźić"},
    PrivacyBtn:{en:"Privacy Policy", ua:"Політика конфіденційності", pl:"Polityka prywatności"},
    LogOutBtn:{en:"Log Out", ua:"Вийти", pl:"Wyloguj się"},
    ImgBtn_empty:{en:"", ua:"", pl:""},
    ImgBtn_check:{en:"check", ua:"позначити", pl:"zaznaczyć"},
    ImgBtn_save:{en:"save", ua:"зберегти", pl:"zapisać"},
    ImgBtn_edit:{en:"edit", ua:"редагувати", pl:"edytować"},
    ImgBtn_print:{en:"print", ua:"друкувати", pl:"drukować"},
    ImgBtn_settings:{en:"settings", ua:"налаштування", pl:"ustawienia"},
    ImgBtn_cancel:{en:"cancel", ua:"скасувати", pl:"anulować"},
    ImgBtn_plus:{en:"add", ua:"додати", pl:"dodać"},
    ImgBtn_delete:{en:"delete", ua:"видалити", pl:"usunąć"},
    ImgBtn_upload:{en:"upload", ua:"вивантажити", pl:"wgrać"},
    ImgBtn_download:{en:"download", ua:"завантажити", pl:"pobrać"},
    ImgBtn_show:{en:"show", ua:"показати", pl:"pokazać"},
    ImgBtn_hide:{en:"hide", ua:"сховати", pl:"schować"},
    ImgBtn_search:{en:"search", ua:"пошук", pl:"szukać"},
    ImgBtn_erase:{en:"erase", ua:"стерти", pl:"wymazać"},
    ImgBtn_link:{en:"navigate", ua:"навігувати", pl:"nawigować"},
    ImgBtn_more:{en:"more", ua:"більше", pl:"więcej"},
    ImgBtn_up:{en:"up", ua:"вгору", pl:"w górę"},
    ImgBtn_down:{en:"down", ua:"вниз", pl:"w dół"},
    ImgBtn_left:{en:"left", ua:"ліворуч", pl:"lewo"},
    ImgBtn_right: {en:"right", ua:"праворуч", pl:"prawo"},
    MethodRadioBtns:{en:['cash','transfer'], ua:['готівка','переказ'], pl:['gotówka','przelew']},
    SummaryLineTop:{en:"To pay", ua:"До сплати", pl:"Do zapłaty"},
    SummaryAmount:{en:"Amount in words", ua:"Сума словами", pl:"Kwota słownie"},
    SummaryMethod:{en:"Payment method", ua:"Спосіб оплати", pl:"Sposób płatności"},
    SummaryDeadline:{en:"Payment deadline", ua:"Термін оплати", pl:"Termin płatności"},
    DayNames:{
      en:['mo','tu','we','th','fr','sa','su'],
      ua:['пн','вт','ср','чт','пт','сб','нд'],
      pl:['po','wt','śr','cz','pi','so','ni']
    },
    MonthNames:{
      en:['jan','feb','mar','apr','maj','jun','jul','aug','sep','oct','nov','dec'],
      ua:['січ','лют','бер','кві','тра','чер','лип','сер','вер','жов','лис','гру'],
      pl:['sty','lut','mrz','kwi','maj','cze','lip','sie','wrz','paź','lis','gru']
    },
    CommingSoon_1:{
      en:"Information panel, where users can view their data and activity history, coming soon.",
      ua:"Панель інформації, де користувачі зможуть переглянути свої дані та історію дій, скоро буде доступна.",
      pl:"Panel informacji, gdzie użytkownicy będą mogli zobaczyć swoje dane oraz historię działań, wkrótce będzie dostępny.",
    },
    CommingSoon_2:{
      en:"Stay tuned!..",
      ua:"Слідкуйте за оновленнями!..",
      pl:"Śledź nasze aktualności!..",
    },
    StoreWarning_1:{
      en:"Welcome!",
      ua:"Вітаємо!",
      pl:"Witamy!",
    },
    StoreWarning_2:{
      en:"You are currently in the testing version of our store.",
      ua:"Зараз ви знаходитесь у тестовій версії нашого магазину.",
      pl:"Obecnie znajdujesz się w wersji testowej naszego sklepu.",
    },
    StoreWarning_3:{
      en:"This is an excellent opportunity for you to observe our development. We ask for your understanding if you encounter any shortcomings while using the platform.",
      ua:"Це відмінна можливість для вас спостерігати за нашим розвитком. Ми просимо про розуміння, якщо ви зіткнетеся з якими-небудь недоліками під час використання платформи.",
      pl:"To doskonała okazja dla Ciebie, aby obserwować nasz rozwój. Prosimy o zrozumienie, jeśli napotkasz jakieś niedoskonałości podczas korzystania z platformy.",
    },
    Err_0:{
      en:"**en**",
      ua:"**ua**",
      pl:"**pl**"
    },
    Err_1:{
      en:"this field cannot be empty!",
      ua:"це поле не може бути порожнім!",
      pl:"to pole nie może być puste!"
    },
    Err_2: {
      en:"must contain from 4 to 8 characters!",
      ua:"має містити від 4 до 8 символів!",
      pl:"musi zawierać od 4 do 8 znaków!"
    },
    Err_3: {
      en:"wrong e-mail is entered!",
      ua:"введено неправильний e-mail!",
      pl:"wprowadzono nieprawidłowy adres e-mail!"
    },
    Err_4: {
      en:"must contain at least one special character!",
      ua:"має містити принаймні один спеціальний символ!",
      pl:"musi zawierać co najmniej jeden znak specjalny!"
    },    
    Err_5: {
      en:"must contain at least one lowercase letter!",
      ua:"має містити принаймні одну малу літеру!",
      pl:"musi zawierać przynajmniej jedną małą literę!"
    },
    Err_6: {
      en:"must contain at least one digit!",
      ua:"має містити принаймні одну цифру!",
      pl:"musi zawierać przynajmniej jedną cyfrę!"
    },
    Err_7: {
      en:"must contain at least one uppercase letter!",
      ua:"має містити хоча б одну велику літеру!",
      pl:"musi zawierać co najmniej jedną dużą literę!"
    },
    Err_8: {
      en:"must contain from 8 to 20 characters!",
      ua:"має містити від 8 до 20 символів!",
      pl:"musi zawierać od 8 do 20 znaków!",
    },
    Err_9: {
      en:"does not match the URL format!",
      ua:"не відповідає формату URL!",
      pl:"nie pasuje do formatu URL!"
    },
    Err_10:{
      en:"must contain btn than 4 characters!",
      ua:"має містити більше 4 символів!",
      pl:"musi zawierać btn niż 4 znaki!"
    },
    Err_11:{
      en:"number is too short!",
      ua:"номер занадто короткий!",
      pl:"numer jest za krótki!"
    },
    UserPresent:{
      en:"such user already exists in the database!",
      ua:"такий користувач вже є в базі даних!",
      pl:"taki użytkownik już istnieje w bazie danych!"
    },
    UserNotPresent:{
      en:"such user is not present in a database!",
      ua:"такий користувач не знайдений в базі даних!",
      pl:"taki użytkownik nie istnieje w bazie danych!"
    },
    EmailPresent:{
      en:"such email already exists in the database!",
      ua:"такий email вже є в базі даних!",
      pl:"taki email już istnieje w bazie danych!"
    },
    EmailNotPresent:{
      en:"such email is not present in a database!",
      ua:"такий email не знайдений в базі даних!",
      pl:"taki email nie istnieje w bazie danych!"
    },
    EmailNotSent:{
      en:"the server failed to send the email!",
      ua:"сервер не зміг відправити email!",
      pl:"serwer nie mógł wysłać wiadomości email!"
    },
    WrongPass:{
      en:"a wrong password is entered!",
      ua:"введено неправильний пароль!",
      pl:"wprowadzono nieprawidłowe hasło!"
    },
    SamePass:{
      en:"the passwords do not match!",
      ua:"паролі не співпадають!",
      pl:"hasła nie zgadzają się!"
    },
    AppAuthor: {
      en:"Web application author:",
      ua:"Автор веб-додатку:",
      pl:"Autor aplikacji webowej",
    },
    SecurityPannelTxtLogin:{
      en: "Logging in is required to access certain features of the website. If you do not have an account yet, you can easily create one.",
      ua: "Увійти до системи необхідно, щоб отримати доступ до деяких функцій сайту. Якщо у тебе ще немає облікового запису, можеш легко створити його.",
      pl: "Logowanie jest wymagane, aby uzyskać dostęp do niektórych funkcji strony. Jeśli nie masz jeszcze konta, możesz łatwo je założyć."
    },
    SecurityPannelTxtSignup:{
      en: "Registering on the website is a step towards fully utilizing all of its features. Personalize your experience with the site.",
      ua: "Реєстрація на сайті - це крок до повного використання всіх його функцій. Сперсоналізуй свій досвід з сайтом.",
      pl: "Rejestracja na stronie to krok w kierunku pełnego korzystania z jej wszystkich funkcji. Spersonalizuj swoje doświadczenie ze stroną."
    },
    SecurityPannelTxtForgot:{
      en: "Forgot your account password? It can happen to anyone. Just a few clicks are enough to fully restore the functionality of your account.",
      ua: "Забув пароль до акаунту? Це може трапитися з будь-ким. Достатньо кількох кліків, щоб повністю відновити функціональність свого акаунту.",
      pl: "Zapomniałeś hasła do swojego konta? To może przytrafić się każdemu. Wystarczy kilka kliknięć, aby w pełni przywrócić funkcjonalność swojego konta."
    },
    SecurityPannelTxtConfirm:{
      en: "Enter the password you received in the email within 10 minutes to proceed.",
      ua: "Введіть пароль, який ви отримали в email протягом 10 хвилин, щоб продовжити.",
      pl: "Wprowadź hasło, które otrzymałeś w wiadomości email w ciągu 10 minut, aby kontynuować."
    },
    AddNewCompanyBtn:{en:"Add a new company", ua:"Додати нову компанію", pl:"Dodać nową firmę"},
    ActionBtn_color:{en:"color", ua:"колір", pl:"kolor"},
    ActionBtn_open:{en:"open", ua:"відкритий", pl:"otwarty"},
    ActionBtn_repair:{en:"repaired", ua:"відремонтований", pl:"naprawiony"},
    ActionBtn_close:{en:"closed", ua:"закритий", pl:"zamknięty"},
    ActionBtn_delete:{en:"deleted", ua:"видалений", pl:"usunięty"},
    NewOrderBtn:{en:"Add new order", ua:"Додати нове замовлення", pl:"Dodac nowe zlecenie"},
    DocName_ZL:{en:["Order", "Orders"], ua:["Замовлення", "Замовлення"], pl:["Zlecenie", "Zlecenia"]}, 
    DocName_FS:{en:["Sales Invoice", "Sales Invoices"], ua:["Рахунок продажу", "Рахунки продажу"], pl:["Faktura Sprzedaży", "Faktury Sprzedaży"]}, 
    DocName_FZ:{en:["Purchase Invoice", "Purchase Invoices"], ua:["Рахунок закупівлі", "Рахунки закупівлі"], pl:["Faktura Zakupu", "Faktury Zakupu"]}, 
    DocName_PZ:{en:["Purchase Receipt", "Purchase Receipts"], ua:["Чек закупівлі", "Чеки закупівлі"], pl:["Paragon Zakupu", "Paragony Zakupu"]}, 
    DocName_PS:{en:["Sales Receipt", "Sales Receipts"], ua:["Чек продажу", "Чеки продажу"], pl:["Paragon Sprzedaży", "Paragony Sprzedaży"]}, 
    DocName_ZU:{en:["Social Security Tax", "Social Security Taxes"], ua:["Податок ZUS", "Податки ZUS"], pl:["Podatek ZUS", "Podatki ZUS"]}, 
    DocName_VA:{en:["VAT Tax", "VAT Taxes"], ua:["Податок ПДВ", "Податки ПДВ"], pl:["Podatek VAT", "Podatki VAT"]},
    DocName_FI:{en:["Accounting","Accounting"], ua:["Бухгалтерія","Бухгалтерія"], pl:["Księgowość","Księgowość"]},
    InfoPannelCar:{en:"Information about car", ua:"Інформація про автомобіль", pl:"Informacja o samochodzie"},
    InfoPannelLocation:{en:"Information about location", ua: "Інформація про приміщення", pl: "Informacja o pomieszczeniu"},
    InfoPannelClient:{en:"Customer information", ua:"Інформація про клієнта", pl:"Informacja o kliencie"},
    InfoPannelDealer:{en:"Seller", ua:"Продавець", pl:"Sprzedawca"},
    InfoPannelBuyer:{en:"Buyer", ua:"Покупець", pl:"Nabywca"},
    InfoPannelPayer:{en:"Payer", ua:"Платник", pl:"Płatnik"},
    TasksTop:{en: "Description and scope of tasks", ua: "Опис та обсяг завдань", pl: "Opis i zakres zadań"},
    FaultsTop:{en: "Description and scope of tasks", ua: "Опис та обсяг завдань", pl: "Opis i zakres zadań"},
    CommentsTop:{en:"Comment", ua:"Коментар", pl:"Komentarz"},
    FilesTop:{en:"Files", ua:"Файли", pl:"Pliki"},
    SoftTop:{en:"Software", ua:"Програмне забезпечення", pl:"Oprogramowanie"},
    IssuePerson:{en:"Authorized person to issue", ua:"Особа, уповноважена на видачу", pl:"Osoba upoważniona do wystawienia"},
    ReceivePerson:{en:"Authorized person to receive", ua:"Особа, уповноважена на отримання", pl:"Osoba upoważniona do odbioru"},
    AddWeekBtn_MINUS_WEEK:{en:"last week...", ua:"попередній тиждень...", pl:"poprzedni tydzień..."},
    AddWeekBtn_PLUS_WEEK:{en:"next week...", ua:"наступний тиждень...", pl:"następny tydzień..."},
    ShowModeBtn_calendar:{en:"calendar", ua:"календар ", pl:"kalendarż"},
    ShowModeBtn_docs:{en:"documents", ua:"документи", pl:"dokumenty"},
    MinusMonthBtn:{en:"previous month...", ua:"попередній місяць...", pl:"poprzedni miesiąc..."},
    TableNUM:{en:"Nr.", ua:"№", pl:"Lp."},
    TableART:{en:"Product / service name", ua:"Назва товару / послуги", pl:"Nazwa towaru / usługi"},
    TablePRI:{en:"Price", ua:"Ціна", pl:"Cena"},
    TableQUA:{en:"Qty", ua:"К-сть", pl:"Ilość"},
    TableVAT:{en:"VAT", ua:"ПДВ", pl:"VAT"},
    TableNET:{en:"Amount netto", ua:"Сума netto", pl:"Kwota netto"},
    TablePRV:{en:"Amount VAT", ua:"Сума VAT", pl:"Kwota VAT"},
    TableSUM:{en:"Gross amount", ua:"Вартість brutto", pl:"Wartość brutto"},
    TableTOT:{en:"Total", ua:"Разом", pl:"Razem"},
    TableSeller:{en:"Seller", ua:"Продавець", pl:"Sprzedawca"},
    TableBuyer:{en:"Buyer", ua:"Покупець", pl:"Nabywca"},
    TableQuantity:{en:"Available qty", ua:"Доступна к-сть", pl:"Dostępna ilość"},
    NewTranslate:{en:"", ua:"", pl:""},
    AddFileArea:{en:"Add file...", ua:"Додати файл...", pl:"Dodać plik..."},
    AddLinkArea:{en:"Add link...", ua:"Додати посилання...", pl:"Dodać skrót..."},
    MoreBtn:{en:"See details...", ua:"Дивитися деталі...", pl:"Zobacz szczegóły..."},
    SelBtn_NEW:{en:"New document", ua:"Новий документ", pl:"Nowy document"},
    SelBtn_SORT:{en:"Document filter", ua:"Фільтр документів", pl:"Filtr dokumentów"},
    Coockies_Txt1: {
      en: "Our website uses cookies to improve functionality and the quality of the services provided.",
      ua: "Наш веб-сайт використовує файли cookie для покращення функціональності та якості наданих послуг.",
      pl: "Nasza strona internetowa wykorzystuje pliki cookie w celu poprawy funkcjonalności i jakości świadczonych usług."
    },
    Coockies_Txt2: {
      en: "By using the site or closing this panel, you accept our",
      ua: "Використовуючи сайт або закриваючи цю панель, ви приймаєте нашу",
      pl: "Korzystając z witryny lub zamykając ten panel, akceptujesz naszą"
    },
    Coockies_Txt3: {
      en: "Privacy Policy",
      ua: "Політику конфіденційності",
      pl: "Politykę prywatności"
    }
  }

  return translations[txt] ? translations[txt][lang] : <span className="txtRed">-</span>
}