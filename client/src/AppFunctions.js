import axios from 'axios'
import cookies from 'js-cookie'
import { tr } from './AppTranslate'

// functions that work with cookies
export const RemToken   = ()=> cookies.remove('bzToken')
export const RemUser    = ()=> cookies.remove('bzUser')
export const RemCookie  = ()=> cookies.remove('bzCookie')
export const GetToken   = ()=> cookies.get('bzToken')?.length > 32 ? cookies.get('bzToken') : false
export const GetUser    = ()=> cookies.get('bzUser') ? JSON.parse( cookies.get('bzUser') ) : false
export const GetCookie  = ()=> cookies.get('bzCookie')
export const SetToken   = (bzToken)=> cookies.set('bzToken', bzToken )
export const SetUser    = (user)=> cookies.set( 'bzUser', JSON.stringify(user) )
export const SetCookie  = ()=> cookies.set('bzCookie', true)

// my calculator function
export const bzCalc = (operation, a, b)=>{
  const errors = {
    a:"Invalid input. Please enter two numbers!",
    b:"Invalid input. Cannot divide by zero!",
    c:"Invalid input. Please enter a valid arithmetic operation (+, -, *, /)!"
  }
  const x = parseFloat(a)
  const y = parseFloat(b)
  if (isNaN(x) || isNaN(y)) throw new Error(errors.a) // check if a and b are numbers
  switch (operation) {
    case "+": return (x + y).toFixed(2) // add a and b and round the result to 2 decimal places
    case "-": return (x - y).toFixed(2) // subtract b from a and round the result to 2 decimal places
    case "*": return (x * y).toFixed(2) // multiply a and b and round the result to 2 decimal places
    case "/":
      if(y === 0) throw new Error(errors.b) // check if b is 0 and throw an error if it is
      return (x / y).toFixed(2) // divide a by b and round the result to 2 decimal places
    default:
      throw new Error(errors.c) // throw an error if the operation is not one of the expected values
  }
}

export const getRandomColor = () => {
  const hex = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
  let color = "#"
  for(let i = 0; i < 6; i++){ color += hex[Math.floor(Math.random() * 16)] }
  return color
}

// sanitization function
export const sanitizeTxt = (txt, name = "default")=>{
  const lang = GetUser().lang
  switch(name){
    case "login":             return sanitizeLogin(txt)
    case "email":             return sanitizeEmail(txt)
    case "pass":              return sanitizePassword(txt)
    case "CompanyNameShort":  return sanitizeCompanyNameShort(txt)
    case "CompanyName":       return sanitizeCompanyName(txt)
    case "VIN":               return sanitizeVIN(txt)
    case "NIP":               return sanitizeNIP(txt)
    case "ZIP":               return sanitizeZIP(txt)
    case "town":              return sanitizeTown(txt)
    case "StreetName":        return sanitizeStreetName(txt)
    case "ACC":               return sanitizeBankAccount(txt)
    case "tel":               return sanitizePhone(txt)
    case "www":               return sanitizeWebsite(txt)
    case "carNumbers":        return sanitizeCarNumbers(txt)
    
    default: return {sanText:txt, sanErr:false}
  }
  function sanitizeLogin(txt) {
    const min = 4
    const max = 8
    let sanErr = false
    let sanText = txt ? txt.replace(/[^a-zA-Z0-9]/g, '').trim().slice(0, max) : ''
    if(sanText.length < min) sanErr = tr(`Err_2`,lang)
    if(sanText.length < 1) sanErr = tr(`Err_1`,lang)
    return {sanText, sanErr}
  }
  function sanitizeEmail(txt) {
    const max = 64
    let sanErr = false
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let sanText = txt ? txt.trim().toLowerCase().slice(0, max) : ''
    if(!re.test(sanText)) sanErr = tr(`Err_3`,lang)
    if(sanText.length < 1) sanErr = tr(`Err_1`,lang)
    return {sanText, sanErr}
  }
  function sanitizePassword(txt) {
    const min = 8
    const max = 20
    let sanErr = false
    const regExDigit = /\d/
    const regExLowercase = /[a-z]/
    const regExUppercase = /[A-Z]/
    // const regExSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/
    let sanText = txt ? txt.replace(/[^a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/g, '').trim().slice(0, max) : ''
    // if(!regExSpecialChar.test(sanText)) sanErr = tr(`Err_4`,lang)
    if(!regExLowercase.test(sanText)) sanErr = tr(`Err_5`,lang)
    if(!regExDigit.test(sanText)) sanErr = tr(`Err_6`,lang)
    if(!regExUppercase.test(sanText)) sanErr = tr(`Err_7`,lang)
    if(sanText.length < min) sanErr = tr(`Err_8`,lang)
    if(sanText.length < 1) sanErr = tr(`Err_1`,lang)
    return {sanText, sanErr}
  }
  function sanitizeCompanyNameShort(txt) {
    const min = 1
    const max = 32
    let sanErr = false
    const regEx = /^[a-zA-Z0-9\s\-\_\.\,]*$/
    let sanText = txt ? txt.trim().slice(0, max) : ''
    if(sanText.length < min) sanErr = tr('Err_10', lang)
    if(!regEx.test(sanText)) sanErr = tr('Err_11', lang)
    if(!sanErr && !/[a-zA-Z]/.test(sanText)) sanErr = tr('Err_12', lang)
    if(!sanErr && !/\d/.test(sanText)) sanErr = tr('Err_13', lang)
    if(!sanErr && sanText.trim().length === 0) sanErr = tr('Err_14', lang)
    return { sanText, sanErr }
  }
  function sanitizeCompanyName(txt) {
    const min = 1
    const max = 64
    let sanErr = false
    let sanText = txt ? txt.replace(/[^a-zA-Z0-9\\&()+-_.,]/g, '').trim().slice(0, max) : ''
    if(sanText.length < min) sanErr = tr('Err_0', lang)
    return { sanText, sanErr }
  }
  function sanitizeVIN(txt) {
    const min = 17
    const max = 17
    let sanErr = false
    let sanText = txt ? txt.replace(/[^a-zA-Z0-9]/g, '').trim().toUpperCase().slice(0, max) : ''
    if(sanText.length !== max) sanErr = 'VIN musi składać się z 17 znaków'
    return { sanText, sanErr }
  }
  function sanitizeNIP(txt) {
    const min = 10
    const max = 10
    let sanErr = false
    const regEx = /^[0-9]+$/
    function formatNIP(nip) {
      const formattedNIP = nip.replace(/-/g, '').slice(0, 10)
      return [
        formattedNIP.slice(0, 3),
        formattedNIP.slice(3, 6),
        formattedNIP.slice(6, 8),
        formattedNIP.slice(8),
      ].filter(s => s).join('-')
    }
    let sanText = txt ? txt.replace(/[^0-9]/g, '').trim().slice(0, max) : ''
    if(!regEx.test(sanText)) sanErr = tr('Err_0', lang)
    if(sanText.length < min) sanErr = tr('Err_0', lang)
    sanText = formatNIP(sanText)
    return { sanText, sanErr }
  }
  function sanitizeZIP(txt) {
    const min = 5
    const max = 6
    let sanErr = false
    const regEx = /^[0-9-]+$/
    function formatZIP(zip) {
      const formattedZIP = zip.replace(/-/g, '').slice(0, 5)
      return [
        formattedZIP.slice(0, 2),
        formattedZIP.slice(2)
      ].filter(s => s).join('-')
    }
    let sanText = txt ? txt.replace(/[^0-9-]/g, '').trim().slice(0, max) : ''
    if (!regEx.test(sanText)) sanErr = tr('Err_8', lang)
    if (sanText.length < min) sanErr = tr('Err_9', lang)
    sanText = formatZIP(sanText);
    return { sanText, sanErr }
  }
  function sanitizeTown(txt) {
    const max = 32
    let sanErr = false
    const sanText = txt ? txt.slice(0, max) : ''
    return {sanText, sanErr}
  }
  function sanitizeStreetName(txt) {
    const max = 64
    let sanErr = false
    function formatStreetName(name) {
      if(!name.startsWith("ul. ")) return "ul. " + name
      return name
    }
    let sanText = txt ? txt.slice(0, max) : ''
    sanText = formatStreetName(sanText)
    return {sanText, sanErr}
  }
  function sanitizeBankAccount(txt) {
    const len = 32
    let sanErr = false
    let sanText = txt ? txt.replace(/[^0-9\s]/g, '').trim().slice(0, len) : ''
    if(sanText.length < len) sanErr = tr('Err_0', lang)
    function formatBankAccount(acc) {
      const formattedAcc = acc.replace(/ /g, '').slice(0, 26)
      return [
        formattedAcc.slice(0, 2),
        formattedAcc.slice(2, 6),
        formattedAcc.slice(6, 10),
        formattedAcc.slice(10, 14),
        formattedAcc.slice(14, 18),
        formattedAcc.slice(18, 22),
        formattedAcc.slice(22),
      ].filter(s => s).join(' ')
    }
    sanText = formatBankAccount(sanText)
    return { sanText, sanErr }
  }
  function sanitizePhone(txt) {
    const regEx = /^[0-9]+$/
    const max = 13
    let sanErr = false
    function formatPhone(phone) {
      const formattedPhone = phone.replace(/ /g, '').slice(0, 9)
      return [
        formattedPhone.slice(0, 3),
        formattedPhone.slice(3, 6),
        formattedPhone.slice(6)
      ].filter(s => s).join(' ')
    }
    let sanText = txt ? txt.replace(/[^0-9]/g, '').trim().slice(0, max) : ''
    if (!regEx.test(sanText)) sanErr = tr('Err_10', lang)
    sanText = formatPhone(sanText)
    return { sanText, sanErr }
  }
  function sanitizeWebsite(txt) {
    const max = 128
    let sanErr = false
    const regEx = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ;,./?%&=]*)?$/
    function formatWebsite(url) {
      if(!url.startsWith("https")) return "https://" + url
      return url
    }
    let sanText = txt ? txt.trim().slice(0, max) : ''
    if(sanText && !regEx.test(sanText)) sanErr = tr('Err_11', lang)
    if(sanText.length > 50) sanErr = tr('Err_10', lang)
    sanText = formatWebsite(sanText)
    return { sanText, sanErr }
  }
  function sanitizeCarNumbers(txt) {
    const min = 2
    const max = 10
    let sanErr = false
    let sanText = txt ? txt.replace(/[^a-zA-Z0-9]/g, '').trim().toUpperCase().slice(0, max) : ''
    if(sanText.length < min) sanErr = '*'
    return { sanText, sanErr }
  }
}

// function for sending a POST request to the server and receiving a response from it
export const PostToApi = async (link, object, callback)=>{
  // Set up the API link to use based on the environment (local or remote)
  const localLink = 'http://localhost:2000/API'
  const domainLink = 'https://bzdrive.com/API'
  const hostname = window.location.hostname
  const localHost = hostname === 'localhost'
  const API = localHost ? localLink : domainLink

  // Get the IP data for the current user and add it to the request
  const IP = await axios.get('https://json.geoiplookup.io')
  .then( (res)=> ({
      host:         hostname,
      from:         link,
      ip:           res.data.ip,
      postal_code:  res.data.postal_code,
      country_code: res.data.country_code,
      country_name: res.data.country_name,
      region:       res.data.region,
      city:         res.data.city,
      asn_org:      res.data.asn_org
      //isp:org:hostname:latitude:longitude:continent_code:continent_name:district:timezone_name:
      //connection_type:asn_number:asn:currency_code:currency_name:success:premium: 
  }))
  .catch( (err)=>{
    console.error("IP Error:", err)
    return false
  })

  // Send the request to the server with the required data and get response
  axios.post( API + link, { bzToken:GetToken(), IP, object } ).then( (resData)=>{

    const Data = resData.data

    // Set the user language based on the IP country code if not already set
    const lang = () => {
      const language = Data?.IP?.country_code?.toLowerCase()
      return(
        Data?.user?.lang
        ? Data.user.lang
        : ["en", "ua", "pl"].includes(language) ? language : "en"
      )
    }
    
    // Set the token and user data in local storage
    SetToken(Data?.bzToken)
    SetUser({...Data?.user, lang: lang()})

    // Run the callback function with the response data (if provided)
    if(typeof callback === "function") callback(Data?.result)

    // Log the response data if running locally
    if(localHost) console.log(`resData_${link}`, Data?.result)

    // Log any errors from the server response
    const errorsData = Data?.errors || []
    errorsData.forEach( (err) => console.error("errors", err) )

  })
  .catch( (err)=> console.error("PostToApi Error:", err) )
  
}