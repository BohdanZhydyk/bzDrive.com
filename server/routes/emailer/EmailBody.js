const { logo, st, bzLink, emailBody } = require('./emailerLogic')


exports.EmailBody = ({mode, email, login, lang, code})=>{

  const header = `
    <header style="${st.header}">
      <img style="${st.imgLogo}" src="${logo}" alt="logo">
      <span style="${st.headTxt}">
        <span style="${st.org}">bz</span><span>Drive</span><span style="${st.org}">.com</span>
      </span>
    </header>
  `

  const main = `<main style="${st.main}"> ${ emailBody(mode, email, login, lang, code) } </main>`

  const footer = `
    <footer style="${st.footer}">
      <span>&copy;</span>
      <span style="${st.org}">B</span><span>ohdan</span>
      <span style="${st.org}">Z</span><span>hydyk</span>
      <a style="${st.a}" href="https://bzdrive.com/" target="_blank">
        ${bzLink}
      </a>
    </footer>
  `

  return `
  <html>
  <head>
    <title>bzDrive.com - ${mode}</title>
  </head>

  <body style="${st.body}">

    ${header}

    ${main}

    ${footer}

  </body>

  </html>
  `

}