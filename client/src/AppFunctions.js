import axios from 'axios'
import cookies from 'js-cookie'


export const RemToken   = ()=> cookies.remove('bzToken')
export const RemUser    = ()=> cookies.remove('bzUser')
export const RemCookie  = ()=> cookies.remove('bzCookie')
export const GetToken   = ()=> cookies.get('bzToken')?.length > 32 ? cookies.get('bzToken') : false
export const GetUser    = ()=> cookies.get('bzUser') ? JSON.parse( cookies.get('bzUser') ) : false
export const GetCookie  = ()=> cookies.get('bzCookie')
export const SetToken   = (bzToken)=> cookies.set('bzToken', bzToken )
export const SetUser    = (user)=> cookies.set( 'bzUser', JSON.stringify(user) )
export const SetCookie  = ()=> cookies.set('bzCookie', true)

export const bzCalc = (operation, a, b) => {
  const x = parseFloat(a)
  const y = parseFloat(b)
  // check if a and b are numbers
  if (isNaN(x) || isNaN(y)) throw new Error("Invalid input. Please enter two numbers!")

  switch (operation) {
    case "+":
      // add a and b and round the result to 2 decimal places
      return (x + y).toFixed(2)
    case "-":
      // subtract b from a and round the result to 2 decimal places
      return (x - y).toFixed(2)
    case "*":
      // multiply a and b and round the result to 2 decimal places
      return (x * y).toFixed(2)
    case "/":
      // check if b is 0 and throw an error if it is
      if(y === 0) throw new Error("Invalid input. Cannot divide by zero!")
      // divide a by b and round the result to 2 decimal places
      return (x / y).toFixed(2)
    default:
      // throw an error if the operation is not one of the expected values
      throw new Error("Invalid input. Please enter a valid arithmetic operation (+, -, *, /)!");
  }
}

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