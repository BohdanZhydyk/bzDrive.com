import axios from 'axios'
import cookies from 'js-cookie'

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

// sanitization function
export const sanitizeTxt = (txt, name)=>{
  switch(name){
    case "login": return sanitizeLogin(txt)
    case "email": return sanitizeEmail(txt)
    case "pass": return sanitizePassword(txt)
    default: return txt
  }
  function sanitizeLogin(txt) {
    const min = 4
    const max = 8
    let sanErr = false
    let sanText = txt ? txt.replace(/[^a-zA-Z0-9]/g, '').trim().slice(0, max) : ''
    if(sanText.length < min) sanErr = `must contain from ${min} to ${max} characters!`
    if(sanText.length < 1) sanErr = `this field cannot be empty!`
    return {sanText, sanErr}
  }
  function sanitizeEmail(txt) {
    const max = 64
    let sanErr = false
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let sanText = txt ? txt.trim().toLowerCase().slice(0, max) : ''
    if(!re.test(sanText)) sanErr = `wrong e-mail is entered!`
    if(sanText.length < 1) sanErr = `this field cannot be empty!`
    return {sanText, sanErr}
  }
  function sanitizePassword(txt) {
    const min = 8
    const max = 20
    let sanErr = false
    const regExDigit = /\d/
    const regExLowercase = /[a-z]/
    const regExUppercase = /[A-Z]/
    const regExSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]/
    let sanText = txt ? txt.trim().slice(0, max) : ''
    // if(!regExSpecialChar.test(sanText)) sanErr = "must contain at least one special character!"
    if(!regExLowercase.test(sanText)) sanErr = "must contain at least one lowercase letter!"
    if(!regExDigit.test(sanText)) sanErr = "must contain at least one digit!"
    if(!regExUppercase.test(sanText)) sanErr = "must contain at least one uppercase letter!"
    if(sanText.length < min) sanErr = `must contain from ${min} to ${max} characters!`
    if(sanText.length < 1) sanErr = "this field cannot be empty!"
    return {sanText, sanErr}
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

  const reqData = { bzToken:GetToken(), object, IP }

  // Send the request to the server with the required data and get response
  axios.post( API + link, reqData ).then( (resData)=>{

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

    // Set the new token and user data in local storage
    SetToken(Data?.bzToken)
    SetUser({ ...Data?.user, lang: lang() })

    // Run the callback function with the response data (if provided)
    if(typeof callback === "function") callback(Data?.object?.result)

    // Log the response data if running locally
    if(localHost) console.log("resData", Data)

    // Log any errors from the server response
    const errorsData = Data?.object?.errors || []
    errorsData.forEach( (err) => console.error("errors", err) )

  })
  .catch( (err)=> console.error("PostToApi Error:", err) )
  
}