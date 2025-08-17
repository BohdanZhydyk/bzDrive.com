
export const SoftTr = (txt, lang)=>{

  const translations = {
    SoftwareParagraph1: {
      en: "Below you will find a list of original and modified software for car control units that I have completed for my clients. I work with engine control units, dashboards, ABS, and others. The list provides an overview of the vehicles I have modified and the range of services I offer.",
      ua: "Нижче ви знайдете список оригінального та модифікованого програмного забезпечення для автомобільних блоків управління, які я виконав для своїх клієнтів. Я працюю з блоками управління двигуном, панелями приладів, ABS та іншими. Список дає змогу ознайомитися з транспортними засобами, які я модифікував, та спектром послуг, які я пропоную.",
      pl: "Poniżej znajdziesz listę orginalnego i modyfikowanego oprogramowania sterowników samochodowych, które wykonałem dla swoich klientów. Pracuję ze sterownikami silnika, licznikami, ABS i innymi. Lista pozwala zapoznać się z pojazdami, które modyfikowałem, oraz zakresem oferowanych usług."
    },
    SoftwareParagraph2: {
      en: "Do you have questions or need software modifications? Contact me – I will gladly advise and find the best solution for your car.",
      ua: "Маєте запитання або потребуєте модифікації програмного забезпечення? Зв’яжіться зі мною – я із задоволенням пораджу та знайду найкраще рішення для вашого авто.",
      pl: "Masz pytania lub potrzebujesz modyfikacji oprogramowania? Skontaktuj się – chętnie doradzę i znajdę najlepsze rozwiązanie dla Twojego auta."
    },
    ServiceTuneCPU: {
      en: {
        txt: "Control Unit Cloning",
        desc: "Safe and precise cloning of ECU, TCU, IC, BCM, BSI, ABS, SRS and other modules.",
        more: [
          "Cloning involves fully transferring the contents of the control unit from a damaged module to a working donor.",
          "I perform cloning of ECU, TCU, IC, BCM, BSI, ABS, SRS and other controllers using programmers and methods such as bench, bootmode, BDM, OBD.",
          "This service is useful after flooding, module damage, replacement or communication problems.",
          "Each cloned unit is tested – ready to install and operate without additional configuration."
        ]
      },
      ua: {
        txt: "Клонування блоків управління",
        desc: "Безпечне та точне клонування ECU, TCU, IC, BCM, BSI, ABS, SRS та інших модулів.",
        more: [
          "Клонування передбачає повне перенесення вмісту блоку управління з пошкодженого модуля до справного донора.",
          "Виконую клонування ECU, TCU, IC, BCM, BSI, ABS, SRS та інших блоків за допомогою програматорів і методів bench, bootmode, BDM, OBD.",
          "Послуга актуальна після затоплення, пошкодження модуля, заміни або проблем з комунікацією.",
          "Кожне клонування тестується – блок готовий до встановлення та роботи без додаткової конфігурації."
        ]
      },
      pl: {
        txt: "Klonowanie sterowników",
        desc: "Bezpieczne i precyzyjne klonowanie ECU, TCU, IC, BCM, BSI, ABS, SRS i innych modułów.",
        more: [
          "Klonowanie polega na pełnym przeniesieniu zawartości sterownika z uszkodzonego modułu do sprawnego dawcy.",
          "Wykonuję klonowanie ECU, TCU, IC, BCM, BSI, ABS, SRS oraz innych sterowników za pomocą programatorów i metod takich jak bench, bootmode, BDM, OBD.",
          "Usługa przydatna po zalaniu, uszkodzeniu modułu, wymianie lub problemach z komunikacją.",
          "Każde klonowanie jest testowane – sterownik gotowy do montażu i pracy bez dodatkowej konfiguracji."
        ]
      },
    },
    ServiceTuneFireTire: {
      en: {
        txt: "Performance Tuning",
        desc: "Stage1, ECO tuning – more power or better fuel efficiency.",
        more: [
          "I offer Stage1 modifications – safe increase of power and torque.",
          "Also available: ECO tuning – optimization of combustion parameters to reduce fuel consumption.",
          "Modifications are made using original files and can maintain emission standards if required.",
          "Each map is tailored to the specific vehicle and engine capabilities."
        ]
      },
      ua: {
        txt: "Тюнінг продуктивності",
        desc: "Stage1, ECO тюнінг – більше потужності або менше витрати пального.",
        more: [
          "Пропоную Stage1 – збільшення потужності та крутного моменту без шкоди для двигуна.",
          "Також доступний ECO тюнінг – оптимізація параметрів згоряння для зменшення витрати пального.",
          "Модифікації виконуються на базі оригінальних файлів із можливістю дотримання норм викидів.",
          "Кожна карта адаптується до конкретного авто та можливостей двигуна."
        ]
      },
      pl: {
        txt: "Tuning wydajności",
        desc: "Stage1, ECO tuning – więcej mocy lub mniejsze zużycie paliwa.",
        more: [
          "Oferuję modyfikacje typu Stage1 – zwiększenie mocy i momentu obrotowego bezpieczne dla jednostki napędowej.",
          "Dostępny także ECOtuning – zoptymalizowanie parametrów spalania w celu zmniejszenia zużycia paliwa.",
          "Modyfikacje wykonywane na podstawie oryginalnych plików, z zachowaniem norm emisji (jeśli klient tego oczekuje).",
          "Każda mapa jest dostosowana do konkretnego pojazdu i możliwości silnika."
        ]
      },
    },
    ServiceTuneDPF: {
      en: {
        txt: "System Off Solutions",
        desc: "EGR, DPF, SCR, NOx, IMMO, AdBlue, Lambda, Flaps, Start-Stop, Limiter off.",
        more: [
          "I electronically disable problematic systems: EGR, DPF, SCR, NOx, IMMO, AdBlue, Lambda, Flaps, Start-Stop, Limiter.",
          "Disabling is done by editing the software – without errors or limp mode.",
          "This helps you avoid expensive repairs and extends vehicle lifespan.",
          "Service can be tailored – including combinations like EGR + DPF off."
        ]
      },
      ua: {
        txt: "Відключення систем",
        desc: "EGR, DPF, SCR, NOx, IMMO, AdBlue, Lambda, Flaps, Start-Stop, Limiter off.",
        more: [
          "Електронно вимикаю проблемні системи: EGR, DPF, SCR, NOx, IMMO, AdBlue, Lambda, Flaps, Start-Stop, Limiter.",
          "Вимкнення відбувається через редагування ПЗ – без помилок і аварійного режиму.",
          "Це дозволяє уникнути дорогого ремонту та збільшує ресурс авто.",
          "Можливі комбінації послуг, наприклад EGR + DPF off."
        ]
      },
      pl: {
        txt: "Wyłączenia systemów",
        desc: "EGR, DPF, SCR, NOx, IMMO, AdBlue, Lambda, Flaps, Start-Stop, Limiter off.",
        more: [
          "Usuwam elektronicznie problematyczne systemy: EGR, DPF, SCR, NOx, IMMO, AdBlue, Lambda, Flaps, Start-Stop, Limiter.",
          "Wyłączenie systemów odbywa się poprzez edycję oprogramowania – bez błędów i trybu awaryjnego.",
          "Dzięki temu unikniesz kosztownych napraw i przedłużysz żywotność pojazdu.",
          "Usługa zgodna z wymaganiami klienta – możliwe również kombinacje (np. EGR + DPF off)."
        ]
      },
    },
    ServiceTuneDTC: {
      en: {
        txt: "Software Restoration",
        desc: "Reverting to original software, enabling/disabling DTCs.",
        more: [
          "I restore original software in control units – after failed modifications or errors.",
          "Possible to enable or disable selected DTCs (Diagnostic Trouble Codes).",
          "Useful for diagnostic issues, inspections or when selling the vehicle.",
          "A full backup is always made before changes – allowing rollback if needed."
        ]
      },
      ua: {
        txt: "Відновлення програмного забезпечення",
        desc: "Повернення до оригінального ПЗ, активація/деактивація DTC.",
        more: [
          "Відновлюю оригінальне ПЗ в блоках управління – після невдалих змін або помилок.",
          "Можливе увімкнення або вимкнення вибраних помилок DTC (діагностичних кодів).",
          "Корисно при діагностиці, техогляді або продажу авто.",
          "Завжди створюю резервну копію перед змінами – можливість повернення до попереднього стану."
        ]
      },
      pl: {
        txt: "Przywracanie oprogramowania",
        desc: "Przywracanie oryginalnego oprogramowania, włączanie/wyłączanie błędów DTC.",
        more: [
          "Przywracam oryginalne oprogramowanie do sterowników – w przypadku nieudanych modyfikacji lub błędów.",
          "Możliwość aktywacji lub dezaktywacji wybranych błędów DTC (Diagnostic Trouble Codes).",
          "Pomocne przy problemach diagnostycznych, przeglądach lub sprzedaży auta.",
          "Zawsze wykonuję kopię zapasową przed zmianami, by klient mógł wrócić do poprzedniego stanu."
        ]
      },
    },       
    LastSoftware: {
      en: "Recent Services Performed",
      ua: "Останні виконані послуги",
      pl: "Ostatnie zrealizowane usługi",
    },
    brand: {
      en: "Brand",
      ua: "Бренд",
      pl: "Marka",
    },
    model: {
      en: "Model",
      ua: "Модель",
      pl: "Model",
    },
    ECUType: {
      en: "ECU Type",
      ua: "Тип ECU",
      pl: "Typ ECU",
    },
    swVersion: {
      en: "SW Version",
      ua: "Версія SW",
      pl: "Wersja SW",
    },
    hwVersion: {
      en: "HW Version",
      ua: "Версія HW",
      pl: "Wersja HW",
    },
    programmer: {
      en: "Programmer",
      ua: "Програматор",
      pl: "Programator",
    },
    mod: {
      en: "Modification",
      ua: "Модифікація",
      pl: "Modyfikacja",
    },
    readMethod: {
      en: "Reading Method",
      ua: "Метод зчитування",
      pl: "Metoda odczytu",
    },
    swType: {
      en: "SW Type",
      ua: "Тип SW",
      pl: "Typ SW",
    },
    loadMore: {
      en: "Load more",
      ua: "Показати більше",
      pl: "Pokaż więcej",
    },
    SearchText:{en:"Documents found:", ua:"Знайдено документів:", pl:"Znaleziono dokumentów:"},
    SearchLegend:{en:"SW", ua:"SW", pl:"SW"},
    SwSearchPlaceHolder:{en:"SW Search", ua:"Пошук SW", pl:"Wyszukiwarka SW"}
  }

  return translations[txt] ? translations[txt][lang] : <span className="txtRed">-</span>
  
}