import { sanitizeTxt } from "../../../AppFunctions"


export const SoftPropses = ({
  tr, lang, car, setCar, setSoft, sw, s, setSave, editErr, setEditErr, programmers, swTypes, readMethods, modTypes
})=> ({
  brand:{
    classes:"brand",
    // legend: tr(`BrandLegend`,lang),
    legend: "Brand",
    type: `text`,
    val: car?.brand ? sanitizeTxt(car.brand, `default`).sanText : '',
    err: editErr?.carBrand ?? '',
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, brand:sanitizeTxt(val, `default`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carBrand:sanitizeTxt(val, `default`).sanErr}))
  },
  model:{
    classes:"model",
    // legend: tr(`ModelLegend`,lang),
    legend: "Model",
    type: `text`,
    val: car?.model ? sanitizeTxt(car.model, `default`).sanText : '',
    err: editErr?.carModel ?? '',
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, model:sanitizeTxt(val, `default`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carModel:sanitizeTxt(val, `default`).sanErr}))
  },
  engine:{
    classes:"engine",
    // legend: tr(`EngineLegend`,lang),
    legend: "Engine",
    type: `text`,
    val: car?.engine ? sanitizeTxt(car.engine, `default`).sanText : '',
    err: editErr?.carEngine ?? '',
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, engine:sanitizeTxt(val, `default`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carEngine:sanitizeTxt(val, `default`).sanErr}))
  },
  vin:{
    classes:"vin",
    // legend: tr(`VinLegend`,lang),
    legend: "VIN",
    type: `text`,
    val: car?.vin ? sanitizeTxt(car.vin, `VIN`).sanText : '',
    err: editErr?.carVIN ?? '',
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, vin:sanitizeTxt(val, `VIN`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carVIN:sanitizeTxt(val, `VIN`).sanErr}))
  },
  ECUType:{
    classes:"ECU Type",
    legend: "ECU Type",
    type: `text`,
    val: sw?.ECUType ? sanitizeTxt(sw.ECUType, `default`).sanText : '',
    err: editErr?.ECUType ?? '',
    cbVal: (val)=>{
      setSoft( (prev)=> prev.map( (soft, i)=> i !== s ? soft : {...soft, ECUType:sanitizeTxt(val, `default`).sanText} ) )
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, ECUType:sanitizeTxt(val, `default`).sanErr}))
  },
  swVersion:{
    classes:"swVersion",
    // legend: tr(`EngineLegend`,lang),
    legend: "SW Version",
    type: `text`,
    val: sw?.swVersion ? sanitizeTxt(sw.swVersion, `default`).sanText : '',
    err: editErr?.swVersion ?? '',
    cbVal: (val)=>{
      setSoft( (prev)=> prev.map( (soft, i)=> i !== s ? soft : {...soft, swVersion:sanitizeTxt(val, `default`).sanText} ) )
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, swVersion:sanitizeTxt(val, `default`).sanErr}))
  },
  hwVersion:{
    classes:"hwVersion",
    // legend: tr(`EngineLegend`,lang),
    legend: "HW Version",
    type: `text`,
    val: sw?.hwVersion ? sanitizeTxt(sw.hwVersion, `default`).sanText : '',
    err: editErr?.hwVersion ?? '',
    cbVal: (val)=>{
      setSoft( (prev)=> prev.map( (soft, i)=> i !== s ? soft : {...soft, hwVersion:sanitizeTxt(val, `default`).sanText} ) )
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, hwVersion:sanitizeTxt(val, `default`).sanErr}))
  },
  programmer:{
    legend: "Programmer",
    type: `text`,
    plhol: "Programmer",
    groups: programmers,
    val: sw?.programmer ?? '',
    err: editErr?.programmer ?? '',
    cbVal: (val)=>{
      setSoft( (prev)=> prev.map( (soft, i)=> i !== s ? soft : {...soft, programmer:sanitizeTxt(val, `default`).sanText} ) )
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, programmer:sanitizeTxt(val, `default`).sanErr}))
  },
  swType:{
    legend: "Software Type",
    type: `text`,
    plhol: "Software Type",
    groups: swTypes,
    val: sw?.swType ?? '',
    err: editErr?.swType ?? '',
    cbVal: (val)=>{
      setSoft( (prev)=> prev.map( (soft, i)=> i !== s ? soft : {...soft, swType: val === "" ? "" : `${soft.swType ? `${soft.swType}, ` : ""}${sanitizeTxt(val, `default`).sanText}`} ) )
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, swType:sanitizeTxt(val, `default`).sanErr}))
  },
  readMethod:{
    legend: "Read Method",
    type: `text`,
    plhol: "Read Method",
    groups: readMethods,
    val: sw?.readMethod ?? '',
    err: editErr?.readMethod ?? '',
    cbVal: (val)=>{
      setSoft( (prev)=> prev.map( (soft, i)=> i !== s ? soft : {...soft, readMethod: val === "" ? "" : `${soft.readMethod ? `${soft.readMethod}, ` : ""}${sanitizeTxt(val, `default`).sanText}`} ) )
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, readMethod:sanitizeTxt(val, `default`).sanErr}))
  },
  mod:{
    legend: "Modifications",
    type: `text`,
    plhol: "Modifications",
    groups: modTypes,
    val: sw?.mod ?? '',
    err: editErr?.mod ?? '',
    cbVal: (val)=>{
      setSoft( (prev)=> prev.map( (soft, i)=> i !== s ? soft : {...soft, mod: val === "" ? "" : `${soft.mod ? `${soft.mod}, ` : ""}${sanitizeTxt(val, `default`).sanText}`} ) )
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, mod:sanitizeTxt(val, `default`).sanErr}))
  }
})