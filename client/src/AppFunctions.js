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

// time functions
export function TimeToObject(time){
  const year = new Date(time).getFullYear().toString().padStart(4, '0')
  const month = (new Date(time).getMonth() + 1).toString().padStart(2, '0')
  const day = new Date(time).getDate().toString().padStart(2, '0')
  return {year, month, day}
}
export function TimeTo_YYYYMMDD(time){
  const year = new Date(time).getFullYear().toString().padStart(4, '0')
  const month = (new Date(time).getMonth() + 1).toString().padStart(2, '0')
  const day = new Date(time).getDate().toString().padStart(2, '0')
  return parseInt(`${year}${month}${day}`)
}
export function TimeTo_YYYYMM(time){
  const year = new Date(time).getFullYear().toString().padStart(4, '0')
  const month = (new Date(time).getMonth() + 1).toString().padStart(2, '0')
  return parseInt(`${year}${month}`)
}
export function YYYYMMDD_ToWeekDay(date){
  const str = date.toString()
  const dateStr = new Date(`${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`)
  return dateStr.getDay() !== 0 ? dateStr.getDay() : 7
}
export function TimeToWeekDay(time){
  return new Date(time).getDay() !== 0 ? new Date(time).getDay() : 7
}
export function YYYYMMDD_ToFirstDayOfMonth(date) {
  const year = date.toString().slice(0, 4)
  const month = date.toString().slice(4, 6)
  const day = '01'
  return parseInt(`${year}${month}${day}`, 10)
}
export function YYYYMMDD_ToLastDayOfMonth(date) {
  const year = date.toString().slice(0, 4)
  const month = date.toString().slice(4, 6)
  const lastDay = new Date(year, month, 0).getDate().toString().padStart(2, '0')
  return parseInt(`${year}${month}${lastDay}`, 10)
}
export function DocNameNormalize(nr){
  const mode = nr?.mode
  const year = nr?.from.toString().slice(0, 4)
  const month = nr?.from.toString().slice(4, 6)
  const sign = nr?.sign.toString().padStart(4, '0')
  return `${mode}/${year}/${month}/${sign}`
}

// my filesize calculator function
export const bzBytesCalc = (Bytes)=>{
  if(Bytes > 1073741824) return {num:(parseFloat(Bytes) / parseFloat(1073741824)).toFixed(1), unit:"GB"}
  if(Bytes > 1048576) return {num:(parseFloat(Bytes) / parseFloat(1048576)).toFixed(1), unit:"MB"}
  if(Bytes > 1024) return {num:(parseFloat(Bytes) / parseFloat(1024)).toFixed(1), unit:"kB"}
  else return {num:Bytes, unit:"B"}
}

// my calculator function
export const bzCalc = (operation, a, b)=>{
  const errors = {
    a:"bzCalc Error: Please enter two numbers!",
    b:"bzCalc Error: Cannot divide by zero!",
    c:"bzCalc Error: Please enter a valid arithmetic operation (+, -, *, /)!"
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

export const SumArray = (arr, sum = "0.00") => {
  return arr ? arr?.reduce((acc, value) => bzCalc("+", acc, value), sum) : sum
}

export const getRandomColor = () => {
  const hex = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]
  let color = "#"
  for(let i = 0; i < 6; i++){ color += hex[Math.floor(Math.random() * 16)] }
  return color
}

// sanitization functions
export const sanitizeTxt = (txt, name = "default")=>{
  const lang = GetUser().lang

  const regExDigit = /\d/
  const regExLowercase = /[a-z]/
  const regExUppercase = /[A-Z]/
  const regExAlphanumeric = /[^a-zA-Z0-9]/g
  const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // const regExSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/
  const regExSpecialCharacters = /[^a-zA-Z0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/g
  const regExExtendedSpecialCharacters = /[^a-zA-Z0-9\s&()+\-_.,żźćńółęąśŻŹĆĄŚĘŁÓŃЀ-ӿ]/g
  const regExWeb = /^(http(s)?:\/\/|ftp(s):\/\/)?([a-zA-Zа-яА-Я0-9-]+\.)+[a-zA-Zа-яА-Я0-9-\/]+(\/[\w- ;,./?%&=]*)?$/

  switch(name){
    case "login":             return sanitizeLogin(txt)
    case "email":             return sanitizeEmail(txt)
    case "pass":              return sanitizePassword(txt)
    case "verify":            return sanitizePassword(txt)
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
    case "hostname":          return sanitizeHostName(txt)
    default: return {sanText:txt, sanErr:false}
  }
  function sanitizeLogin(txt) {
    const min = 4
    const max = 8
    let sanErr = false
    let sanText = txt ? txt.replace(regExAlphanumeric, '').trim().slice(0, max) : ''
    if(sanText.length < min) sanErr = tr(`Err_2`,lang)
    if(sanText.length < 1) sanErr = tr(`Err_1`,lang)
    return {sanText, sanErr}
  }
  function sanitizeEmail(txt) {
    const max = 64
    let sanErr = false
    let sanText = txt ? txt.trim().toLowerCase().slice(0, max) : ''
    if(!regExEmail.test(sanText)) sanErr = tr(`Err_3`,lang)
    if(sanText.length < 1) sanErr = tr(`Err_1`,lang)
    return {sanText, sanErr}
  }
  function sanitizePassword(txt) {
    const min = 8
    const max = 20
    let sanErr = false
    let sanText = txt ? txt.replace(regExSpecialCharacters, '').trim().slice(0, max) : ''
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
    const max = 24
    let sanErr = false
    let sanText = txt ? txt.replace(regExExtendedSpecialCharacters, '').slice(0, max) : ''
    if(sanText.length < min) sanErr = tr('Err_1', lang)
    return { sanText, sanErr }
  }
  function sanitizeCompanyName(txt) {
    const min = 1
    const max = 64
    let sanErr = false
    let sanText = txt ? txt.replace(regExExtendedSpecialCharacters, '').slice(0, max) : ''
    if(sanText.length < min) sanErr = tr('Err_1', lang)
    return { sanText, sanErr }
  }
  function sanitizeVIN(txt) {
    const max = 17
    let sanErr = false
    let sanText = txt ? txt.replace(regExAlphanumeric, '').trim().toUpperCase().slice(0, max) : ''
    if(sanText.length < max) sanErr = tr('Err_11', lang)
    return { sanText, sanErr }
  }
  function sanitizeNIP(txt) {
    const max = 13
    let sanErr = false
    function formatNIP(nip) {
      const formattedNIP = nip.replace(/-/g, '').slice(0, 10)
      return [
        formattedNIP.slice(0, 3),
        formattedNIP.slice(3, 6),
        formattedNIP.slice(6, 8),
        formattedNIP.slice(8),
      ].filter(s => s).join('-')
    }
    let sanText = txt ? txt.replace(/[^0-9-]/g, '').trim().slice(0, max) : ''
    if(sanText.length < max) sanErr = tr('Err_11', lang)
    sanText = formatNIP(sanText)
    return { sanText, sanErr }
  }
  function sanitizeZIP(txt) {
    const max = 6
    let sanErr = false
    function formatZIP(zip) {
      const formattedZIP = zip.replace(/-/g, '').slice(0, 5)
      return [
        formattedZIP.slice(0, 2),
        formattedZIP.slice(2)
      ].filter(s => s).join('-')
    }
    let sanText = txt ? txt.replace(/[^0-9-]/g, '').trim().slice(0, max) : ''
    if (sanText.length < max) sanErr = tr('Err_11', lang)
    sanText = formatZIP(sanText);
    return { sanText, sanErr }
  }
  function sanitizeTown(txt) {
    const min = 1
    const max = 24
    let sanErr = false
    let sanText = txt ? txt.replace(regExExtendedSpecialCharacters, '').slice(0, max) : ''
    if(sanText.length < min) sanErr = tr('Err_1', lang)
    return {sanText, sanErr}
  }
  function sanitizeStreetName(txt) {
    const min = 1
    const max = 64
    let sanErr = false
    let sanText = txt ? txt.replace(regExExtendedSpecialCharacters, '').slice(0, max) : ''
    function formatStreetName(name) {
      if(lang === "ua"){
        if(
          !name.startsWith("вул. ") &&
          !name.startsWith("пл. ") &&
          !name.startsWith("пр. ") &&
          name?.length > 4
        ){ return "вул. " + name }
      }
      if(lang === "pl"){
        if(
          !name.startsWith("ul. ") &&
          !name.startsWith("al. ") &&
          name?.length > 3
        ){ return "ul. " + name }
      }
      return name
    }
    if(sanText.length < min) sanErr = tr('Err_1', lang)
    sanText = formatStreetName(sanText)
    return {sanText, sanErr}
  }
  function sanitizeBankAccount(txt) {
    const len = 32
    let sanErr = false
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
    let sanText = txt ? txt.replace(/[^0-9\s]/g, '').trim().slice(0, len) : ''
    if(sanText.length < len) sanErr = tr('Err_11', lang)
    sanText = formatBankAccount(sanText)
    return { sanText, sanErr }
  }
  function sanitizePhone(txt) {
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
    let sanText = txt ? txt.replace(/[^0-9\s]/g, '').trim().slice(0, max) : ''
    if(sanText.length < max) sanErr = tr('Err_11', lang)
    sanText = formatPhone(sanText)
    return { sanText, sanErr }
  }
  function sanitizeWebsite(txt) {
    const max = 128
    let sanErr = false
    function formatWebsite(url) {
      if(!url.startsWith("https") && url?.length > 5) return "https://" + url
      return url
    }
    let sanText = txt ? txt.trim().slice(0, max) : ''    
    if (!sanText) sanErr = tr('Err_1', lang)
    if (!regExWeb.test(sanText)) sanErr = tr('Err_9', lang)
    sanText = formatWebsite(sanText)
    return { sanText, sanErr }
  }
  function sanitizeCarNumbers(txt) {
    const min = 4
    const max = 10
    let sanErr = false
    let sanText = txt ? txt.toUpperCase().replace(/[^A-Z0-9\s]/g, '').trim().toUpperCase().slice(0, max) : ''
    if(sanText.length < min) sanErr = tr('Err_10', lang)
    return { sanText, sanErr }
  }
  function sanitizeHostName(txt) {
    const max = 128
    let sanText = txt ? txt.trim().slice(0, max) : ''
    let sanErr = false
    if (!sanText) sanErr = tr('Err_1', lang)
    if (!regExWeb.test(sanText)) sanErr = tr('Err_9', lang)
    return { sanText, sanErr }
  }
}

export const bzUploadFile = (file, fileAddr, fileName, cb)=>{

  const formData = new FormData()

  formData.append('file', file)
  formData.append('fileName', fileName)
  formData.append('fileAddr', fileAddr)

  const config = { headers: {'content-type': 'multipart/form-data'} }

  let link = 'https://bzdrive.com/API/uploadFile'
  // let link = 'http://localhost:2000/API/uploadFile'
  
  axios.post( link, formData, config ).then( (res)=> cb(res) )

}

export const bzDeleteFile = (fileAddr, fileName, cb)=>{
  
  let query = { fileAddr, fileName }

  let link = 'https://bzdrive.com/API/deleteFile'
  // let link = 'http://localhost:2000/API/deleteFile'

  axios.post( link, query).then( (res)=> cb(res) )

}

export const bzPriceToWord = (price, lang) => {

  if (!price) price = "0.00"

  const zero = {en:"zero",pl:"zero",ua:"нуль"}
  const minus = {en:"minus",pl:"minus",ua:"мінус"}
  const ones = {
    en:["","one","two","three","four","five","six","seven","eight","nine"],
    pl:["","jeden","dwa","trzy","cztery","pięć","sześć","siedem","osiem","dziewięć"],
    ua:["","один","два","три","чотири","п'ять","шість","сім","вісім","дев'ять"]
  }
  const teens = {
    en:["","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],
    pl:["","jedenaście","dwanaście","trzynaście","czternaście","piętnaście","szesnaście","siedemnaście","osiemnaście","dziewietnaście"],
    ua:["","одинадцять","дванадцять","тринадцять","чотирнадцять","п'ятнадцять","шістнадцять","сімнадцять","вісімнадцять","дев'ятнадцять"]
  }
  const tens = {
    en:["","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],
    pl:["","dziesięć","dwadzieścia","trzydzieści","czterdzieści","pięćdziesiąt","sześćdziesiąt","siedemdziesiąt","osiemdziesiąt","dziewięćdziesiąt"],
    ua:["","десять","двадцять","тридцять","сорок","п'ятдесят","шістдесят","сімдесят","вісімдесят","дев'яносто"]
  }
  const hundreds = {
    en:["","one hundred","two hundred","three hundred","four hundred","five hundred","six hundred","seven hundred","eight hundred","nine hundred"],
    pl:["","sto","dwieście","trzysta","czterysta","pięćset","sześćset","siedemset","osiemset","dziewięćset"],
    ua:["","сто","двісті","триста","чотириста","п'ятсот","шістсот","сімсот","вісімсот","дев'ятсот"]
  }
  const groups = {
    en:[
      ["","",""],
      ["thousand","thousands","thousand"],
      ["million","millions","million"],
      ["billion","billions","billion"],
      ["trillion","trillions","trillion"],
      ["quadrillion","quadrillions","quadrillion"],
      ["quintillion","quintillions","quintillion"]
    ],
    pl:[
      ["","",""],
      ["tysiąc","tysiące","tysięcy"],
      ["milion","miliony","milionów"],
      ["miliard","miliardy","miliardów"],
      ["bilion","biliony","bilionów"],
      ["biliard","biliardy","biliardów"],
      ["trylion","tryliony","trylionów"]
    ],
    ua:[
      ["","",""],
      ["тисяча","тисячі","тисяч"],
      ["мільйон","мільйони","мільйонів"],
      ["мільярд","мільярди","мільярдів"],
      ["більйон","більйони","більйонів"],
      ["білліон","білліони","білліонів"],
      ["трильйон","трильйони","трильйонів"]
      ]
  }

  let number = parseInt(price.split('.')[0])
  let cents = price.split('.')[1]

  let result = '', sign = ''

  if (number === 0) { result = zero[lang] }
  if (number < 0) { sign = minus[lang]; number = -number; }

  let groupIndex = 0
  while (number > 0) {
    let hundredsDigit = Math.floor((number % 1000) / 100)
    let onesDigit = 0
    let tensDigit = Math.floor((number % 100) / 10)
    let unitDigit = Math.floor(number % 10)

    if (tensDigit === 1 && unitDigit > 0) {
      onesDigit = unitDigit
      tensDigit = 0
      unitDigit = 0
    }

    let groupKey = 2
    if (unitDigit === 1 && hundredsDigit + tensDigit + onesDigit === 0) {
      groupKey = 0
    } else if (unitDigit === 2 || unitDigit === 3 || unitDigit === 4) {
      groupKey = 1
    }

    if (hundredsDigit + tensDigit + onesDigit + unitDigit > 0) {
      result = `
        ${hundreds[lang][hundredsDigit]}
        ${tens[lang][tensDigit]}
        ${teens[lang][onesDigit]}
        ${ones[lang][unitDigit]}
        ${groups[lang][groupIndex][groupKey]}
        ${result}
      `
    }

    groupIndex++
    number = Math.floor(number / 1000)
  }

  return(`${sign} ${result} zł ${cents}/100 gr`);
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
    const setLanguage = ()=>{

      if(GetUser().lang) return GetUser().lang?.toLowerCase()

      const language = Data?.IP?.country_code?.toLowerCase()
      return(
        Data?.user?.lang
        ? Data.user.lang
        : ["en", "ua", "pl"].includes(language) ? language : "en"
      )

    }
    
    // Set the token and user data in local storage
    SetToken(Data?.bzToken)
    SetUser(
      Data?.user === "RELOAD_APP"
      ? { ...Data?.user, lang: setLanguage(), reload:true }
      : { ...Data?.user, lang: setLanguage() }
    )

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