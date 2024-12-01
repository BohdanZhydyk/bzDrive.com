
export const Page404Tr = (txt, lang) => {

  const translations = {
    warning: {
      en: "404 - Page Not Found",
      ua: "404 - Сторінка не знайдена",
      pl: "404 - Strona nie znaleziona",
    },
    paragrarh1: {
      en: "Sorry, the page you're looking for does not exist. It might have been removed, changed its address, or never existed.",
      ua: "На жаль, сторінка, яку ви шукаєте, не існує. Можливо, вона була видалена, її адресу було змінено, або вона ніколи не існувала.",
      pl: "Przepraszamy, ale strona, której szukasz, nie istnieje. Możliwe, że została usunięta, zmieniono jej adres, lub nigdy nie istniała.",
    },
    paragrarh2: {
      en: "Use the navigation menu to find the content you're looking for, or click the button below to return to the home page.",
      ua: "Скористайтеся меню навігації, щоб знайти потрібний вміст, або натисніть кнопку нижче, щоб повернутися на головну сторінку.",
      pl: "Skorzystaj z menu nawigacji, aby znaleźć interesujące Cię treści, lub kliknij poniższy przycisk, aby wrócić na stronę główną.",
    },
    btnTxt: {
      en: "Return to Home Page",
      ua: "Повернутися на головну",
      pl: "Powrót na stronę główną",
    }
  }

  return translations[txt] ? translations[txt][lang] : <span className="txtRed">-</span>

}
