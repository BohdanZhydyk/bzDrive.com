
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
    }
    ,
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
    }   
  }

  return translations[txt] ? translations[txt][lang] : <span className="txtRed">-</span>
  
}