import axios from "axios"
import { tr } from "../../../../../AppTranslate"
import { GetUser, PostToApi, bzCalc, sanitizeTxt } from "../../../../../AppFunctions"


const lang = GetUser().lang

export const vinPropses = (vin, setVin, editErr, setEditErr)=>({
  classes:"vin",
  legend: tr(`VinLegend`,lang),
  type: `text`,
  val: vin ? sanitizeTxt(vin, `VIN`).sanText : '',
  err: editErr?.carVIN ?? '',
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

export const GET_VIN = (vin, car, setCar, editErr, setEditErr)=>{

  setEditErr( (prev)=> ({...prev, carVIN:""} ))

  PostToApi("/getOffice", { getCar:vin }, (data)=>{

    const carData = data[data?.length - 1]?.car

    if( carData ){
      setEditErr( (prev)=> ({...prev, carVIN:"carInfo by database"} ))
      setCar({
        ...car,
        brand:carData?.brand,
        model:carData?.model,
        prod:carData?.prod,
        engine:carData?.engine
      })
      return
    }
    
    // ZrQEPSkKYnp1YTgzQGdtYWlsLmNvbQ==
    // FREE = 5,000 API calls/mo
    let link = `https://auto.dev/api/vin/${vin}?apikey=ZrQEPSkKYnp1YTgzQGdtYWlsLmNvbQ==`
    // let link = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${vin}?format=json` //Nhtsa
      
    axios.get( link ).then( (res)=>{

      if(res?.status === 200){
        
        res = res?.data

        let size = `${res?.engine?.size}L_${res?.engine?.configuration}${res?.engine?.cylinder}`// zrobic po przecinku
        let drive = ()=>{
          switch(res?.drivenWheels){
            case "four wheel drive": return "4WD"
            case "all wheel drive": return "AWD"
            default: return res?.drivenWheels
          }
        }
        let code = `${res?.engine?.manufacturerEngineCode}`
        let hp = `${parseInt(bzCalc("*", res?.engine?.horsepower ?? "0.00", 0.74))}kW`

        let engine = `${size}_${code}_${hp}_${drive()}`

        setEditErr( (prev)=> ({...prev, carVIN:`carInfo by "https://auto.dev/api"`} ))
        setCar(
          {
            ...car,
            brand:res?.make?.name ? res.make.name : (data?.brand ? data.brand : ""),
            model:res?.model?.name ? res.model.name : (data?.model ? data.model : ""),
            prod:res?.years[0]?.year ? res.years[0].year : (data?.prod ? data.prod : ""),
            engine: data?.engine ? data.engine : engine
          }
        )
        
      }
      return
    })
    
    setEditErr( (prev)=> ({...prev, carVIN:"no carInfo"} ))
    setCar(false)
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