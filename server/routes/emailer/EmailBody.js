
exports.EmailBody = ({mode, email, login, lang, code})=>{

  let logo = "https://files.bzdrive.com/img/Drive/logo/logoDrive.gif"

  let st = {
    wht: "color:#fff;",
    org: "color:#f60;",
    yel: "color:#fd0;",
    a: "margin:0 0 0 1vw; text-decoration:none;",
    p: "margin:1vw 0; text-align:justify; text-indent:3vw;",
    body: "font-size:1vw; color:#000;",
    header: "display:flex; text-align:left; width:100%; color:#fff; background-color:#222; border-top:2px solid #f60; border-bottom:2px solid #999;",
    imgLogo: "width:3vw; height:3vw; margin:0.5vw 2vw;",
    headTxt: "margin:0.25vw 0; font-size:250%; font-weight:bold;",
    main: "width:90%; text-align:center;",
    formData: "border:1px dashed #999; border-radius:0.5vw; padding:0.25vw 0; margin:0.5vw 3vw;",
    code: "margin:1vw 2vw; font-size:200%; color:#f60; border:1px dashed #191; border-radius:0.5vw;",
    footer: "text-align:right; width:90%; padding:0 5%; color:#fff; background-color:#222; border-top:2px solid #999; border-bottom:2px solid #f60;"
  }

  let bzLink = `<span style="${st.org}">bz</span><span style="${st.wht}">Drive</span><span style="${st.org}">.com</span>`

  let main = ""

  let tr = [
    {
      en: "Your e-mail address was entered when you tried to",
      ua: "Твій e-mail було вказано при спробі",
      pl: "Twój e-mail został wprowadzony podczas próby"
    },
    {
      en: "register",
      ua: "реєстрації",
      pl: "rejestracji"
    },
    {
      en: "reset your password",
      ua: "відновлення паролю",
      pl: "zresetowania hasła"
    },
    {
      en: "The procedure of",
      ua: "Процедуру",
      pl: "Procedurę"
    },
    {
      en: "can be continued only from the device from which it was started!",
      ua: "можна продовжити тільки з пристрою, з якого було її розпочато!",
      pl: "można kontynuować tylko z urządzenia, z którego ona została uruchomiona!"
    },
    {
      en: "Copy the code below",
      ua: "Скопіюй поданий нижче код",
      pl: "Skopiuj poniższy kod"
    },
    {
      en: "into the appropriate form on the page",
      ua: "у відповідну форму на сторінці",
      pl: "do odpowiedniego formularza na stronie"
    }
  ]

  const body = (mode)=>{
    switch(mode){
      case "signin": return `
        <center>

          <p style="${st.p}">
            <div>${tr[0][lang]} ${tr[1][lang]}.</div>
            <div style="${st.formData}">
              <div>
                <span>login:</span>
                <span style="${st.org}">${login}</span>
              </div>
              <div>
                <span>e-mail:</span>
                <span style="${st.org}">${email}</span>
              </div>
            </div>
            <div>${tr[3][lang]} ${tr[1][lang]} ${tr[4][lang]}</div>
            <div>
              <span style="${st.yel}">${tr[5][lang]}</span>
              <span>${tr[6][lang]}...</span>
            </div>
          </p>

          <div style="${st.code}">
            ${code}
          </div>

        </center>
      `

      case "forgot": return `
        <center>

          <p style="${st.p}">
            <div>${tr[0][lang]} ${tr[2][lang]}.</div>
            <div style="${st.formData}">
              <div>
                <span>login:</span>
                <span style="${st.org}">${login}</span>
              </div>
              <div>
                <span>e-mail:</span>
                <span style="${st.org}">${email}</span>
              </div>
            </div>
            <div>${tr[3][lang]} ${tr[2][lang]} ${tr[4][lang]}</div>
            <div>
              <span style="${st.yel}">${tr[5][lang]}</span>
              <span>${tr[6][lang]}...</span>
            </div>
          </p>

          <div style="${st.code}">
            ${code}
          </div>

        </center>
      `

      case "newUser": return `
        <center>

          <p style="${st.p}">

            <div>A new user has registered on the website.</div>

            <div style="${st.formData}">
              <div>
                <span>login:</span>
                <span style="${st.org}">${login}</span>
              </div>
              <div>
                <span>e-mail:</span>
                <span style="${st.org}">${email}</span>
              </div>
            </div>

          </p>

        </center>
      `
    
      default: return( `<center>empty email...</center>` )
    }
  }

  return `
  <html>
  <head>
    <title>bzDrive.com - ${mode}</title>
  </head>

  <body style="${st.body}">

    <header style="${st.header}">
      <img style="${st.imgLogo}" src="${logo}" alt="logo">
      <span style="${st.headTxt}">
        <span style="${st.org}">bz</span><span>Drive</span><span style="${st.org}">.com</span>
      </span>
    </header>

    <main style="${st.main}"> ${ body(mode) } </main>

    <footer style="${st.footer}">
      <span>&copy;</span>
      <span style="${st.org}">B</span><span>ohdan</span>
      <span style="${st.org}">Z</span><span>hydyk</span>
      <a style="${st.a}" href="https://bzdrive.com/" target="_blank">
        ${bzLink}
      </a>
    </footer>

  </body>

  </html>
  `

}