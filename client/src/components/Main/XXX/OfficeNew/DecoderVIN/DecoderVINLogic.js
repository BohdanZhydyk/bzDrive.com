import { tr } from "./../../../../AppTranslate"
import { PostToApi, sanitizeTxt } from "./../../../../AppFunctions"


export const vinPropses = ({vin, setVin, setLines, editErr, setEditErr, lang})=>({
  classes:"vin",
  legend: tr(`VinLegend`,lang),
  plhol: tr(`VinSearchPlaceHolder`,lang),
  type: `text`,
  val: vin ? sanitizeTxt(vin, `VIN`).sanText : '',
  err: editErr?.carVIN ?? '',
  isImg: vin?.length === 17 ? "Erase" : false,
  imgAct: ()=>{
    setVin( (prev)=> false )
    setLines( (prev)=> false )
    setEditErr( (prev)=> false )
  },
  cbVal: (val)=> setVin( (prev)=> sanitizeTxt(val, `VIN`).sanText ),
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, carVIN:sanitizeTxt(val, `VIN`).sanErr} ))
})

export const brandPropses = (car, setCar, editErr, setEditErr, lang)=>({
  classes:"brand",
  legend: tr(`BrandLegend`,lang),
  type: `text`,
  val: car?.brand ? sanitizeTxt(car.brand, `default`).sanText : '',
  err: editErr?.carBrand ?? '',
  cbVal: (val)=> setCar( (prev)=> ({...prev, brand:sanitizeTxt(val, `default`).sanText})),
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, carBrand:sanitizeTxt(val, `default`).sanErr}))
})

export const modelPropses = (car, setCar, editErr, setEditErr, lang)=>({
  classes:"model",
  legend: tr(`ModelLegend`,lang),
  type: `text`,
  val: car?.model ? sanitizeTxt(car.model, `default`).sanText : '',
  err: editErr?.carModel ?? '',
  cbVal: (val)=> setCar( (prev)=> ({...prev, model:sanitizeTxt(val, `default`).sanText})),
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, carModel:sanitizeTxt(val, `default`).sanErr}))
})

export const enginePropses = (car, setCar, editErr, setEditErr, lang)=>({
  classes:"engine",
  legend: tr(`EngineLegend`,lang),
  type: `text`,
  val: car?.engine ? sanitizeTxt(car.engine, `default`).sanText : '',
  err: editErr?.carEngine ?? '',
  cbVal: (val)=> setCar( (prev)=> ({...prev, engine:sanitizeTxt(val, `default`).sanText})),
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, carEngine:sanitizeTxt(val, `default`).sanErr}))
})

export const prodPropses = (car, setCar, editErr, setEditErr, lang)=>({
  classes:"prod",
  legend: tr(`ProdLegend`,lang),
  type: `text`,
  val: car?.prod ? sanitizeTxt(car.prod, `default`).sanText : '',
  err: editErr?.carProd ?? '',
  cbVal: (val)=> setCar( (prev)=> ({...prev, prod:sanitizeTxt(val, `default`).sanText})),
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, carProd:sanitizeTxt(val, `default`).sanErr}))
})

export const GET_VIN = (vin, cb)=>{

  PostToApi("/getVIN", { vin }, (data)=> cb(data) )

}