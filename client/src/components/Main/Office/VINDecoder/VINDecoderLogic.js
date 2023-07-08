import axios from "axios"
import { tr } from "./../../../../AppTranslate"
import { GetUser, PostToApi, bzCalc, sanitizeTxt } from "./../../../../AppFunctions"


const lang = GetUser().lang

export const vinPropses = (vin, setVin, car, setCar, editErr, setEditErr)=>({
  classes:"vin",
  legend: tr(`VinLegend`,lang),
  plhol:"VIN decoder",
  type: `text`,
  val: vin ? sanitizeTxt(vin, `VIN`).sanText : '',
  err: editErr?.carVIN ?? '',
  isImg: vin?.length === 17 ? "Erase" : false,
  imgAct: ()=>{
    setVin( (prev)=> false )
    setCar( (prev)=> false )
    setEditErr( (prev)=> ({...prev, carVIN:false}) )
  },
  cbVal: (val)=> setVin( (prev)=> sanitizeTxt(val, `VIN`).sanText ),
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, carVIN:sanitizeTxt(val, `VIN`).sanErr} ))
})

export const brandPropses = (car, setCar, editErr, setEditErr)=>({
  classes:"brand",
  legend: tr(`BrandLegend`,lang),
  type: `text`,
  val: car?.brand ? sanitizeTxt(car.brand, `default`).sanText : '',
  err: editErr?.carBrand ?? '',
  cbVal: (val)=> setCar( (prev)=> ({...prev, brand:sanitizeTxt(val, `default`).sanText})),
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, carBrand:sanitizeTxt(val, `default`).sanErr}))
})

export const modelPropses = (car, setCar, editErr, setEditErr)=>({
  classes:"model",
  legend: tr(`ModelLegend`,lang),
  type: `text`,
  val: car?.model ? sanitizeTxt(car.model, `default`).sanText : '',
  err: editErr?.carModel ?? '',
  cbVal: (val)=> setCar( (prev)=> ({...prev, model:sanitizeTxt(val, `default`).sanText})),
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, carModel:sanitizeTxt(val, `default`).sanErr}))
})

export const enginePropses = (car, setCar, editErr, setEditErr)=>({
  classes:"engine",
  legend: tr(`EngineLegend`,lang),
  type: `text`,
  val: car?.engine ? sanitizeTxt(car.engine, `default`).sanText : '',
  err: editErr?.carEngine ?? '',
  cbVal: (val)=> setCar( (prev)=> ({...prev, engine:sanitizeTxt(val, `default`).sanText})),
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, carEngine:sanitizeTxt(val, `default`).sanErr}))
})

export const prodPropses = (car, setCar, editErr, setEditErr)=>({
  classes:"prod",
  legend: tr(`ProdLegend`,lang),
  type: `text`,
  val: car?.prod ? sanitizeTxt(car.prod, `default`).sanText : '',
  err: editErr?.carProd ?? '',
  cbVal: (val)=> setCar( (prev)=> ({...prev, prod:sanitizeTxt(val, `default`).sanText})),
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, carProd:sanitizeTxt(val, `default`).sanErr}))
})

export const GET_VIN = (vin, car, cb)=>{

  PostToApi("/getOffice", { getCar:vin }, (data)=>{

    const carData = {
      brand:    data[data?.length - 1]?.car?.brand,
      model:    data[data?.length - 1]?.car?.model,
      prod:     data[data?.length - 1]?.car?.prod,
      engine:   data[data?.length - 1]?.car?.engine,
      // vin:      data[data?.length - 1]?.car?.vin,
      numbers:  data[data?.length - 1]?.car?.numbers,
      color:    data[data?.length - 1]?.car?.color
    }

    if( carData ){
      cb( {msg:`by bzDrive db`, carData} )
      return
    }

    // lt link = `https://www.decodethis.com/webservices/decodes/${vin}/xB6xzN1vUA-dXdL41EZf/1.json`
    // let link = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${vin}?format=json` //Nhtsa
    
    axios.get(
      `https://auto.dev/api/vin/${vin}?apikey=ZrQEPSkKYnp1YTgzQGdtYWlsLmNvbQ==`
    ).then( (res)=>{
      
      // ZrQEPSkKYnp1YTgzQGdtYWlsLmNvbQ==
      // FREE = 5,000 API calls/mo

      if(res?.status === 200){
        
        res = res?.data

        const brand = res?.make?.name
        const model = res?.model?.name
        const prod = res?.years[0]?.year
        const size = res?.engine?.size ? `${res.engine.size}L` : ``// zrobic po przecinku
        const code = res?.engine?.manufacturerEngineCode ? `_${res.engine.manufacturerEngineCode}` : ``
        const hp = res?.engine?.horsepower ? `_${parseInt(bzCalc("*", res.engine.horsepower, 0.74))}kW` : ``
        const drive = ()=>{
          switch(res?.drivenWheels){
            case "four wheel drive": return "4WD"
            case "all wheel drive": return "AWD"
            case "front wheel drive": return "FWD"
            case "rear wheel drive": return "RWD"
            default: return res?.drivenWheels
          }
        }
        const engine = `${size}${code}${hp}${drive() ? `_${drive()}` : ``}`
        const carData = {...car, brand, model, prod, engine}
        
        cb( {msg:`by "auto.dev"`, carData} )
        return
      }
    })

    cb( {msg:`no CarInfo`, carData:car} )
    return
  })

  // const apiPrefix = "https://api.vindecoder.eu/3.2";
  // const apiKey = "YOUR_API_KEY";   // Your API key
  // const secretKey = "YOUR_SECRET_KEY";  // Your secret key
  // const id = "decode";
  // const vin = "XXXDEF1GH23456789".toUpperCase();
  // const controlSum = sha1(vin + "|" + id + "|" + apiKey + "|" + secretKey).substr(0, 10);

  // fetch(`${apiPrefix}/${apiKey}/${controlSum}/decode/${vin}.json`)
  //   .then(response => response.json())
  //   .then(data => {
  //     const result = data;
  //     // Use the result data here
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });

}