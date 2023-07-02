import { sanitizeTxt } from "./../../../../../AppFunctions"


export const fromProps = (tr, lang, search, setSearch)=> ({
  legend: tr(`FromLegend`,lang),
  type: `date`,
  val: search?.from ?? '',
  cbVal: (val)=>{
    setSearch( (prev)=> ({...prev, from:sanitizeTxt(val, `default`).sanText}))
  },
  cbErr: ()=>{}
})

export const toProps = (tr, lang, search, setSearch)=> ({
  legend: tr(`ToLegend`,lang),
  type: `date`,
  val: search?.to ?? '',
  cbVal: (val)=>{
    setSearch( (prev)=> ({...prev, to:sanitizeTxt(val, `default`).sanText}))
  },
  cbErr: ()=>{}
})

export const carProps = (search, setSearch)=>({
  legend: `car`,
  type: `text`,
  val: search?.car ? sanitizeTxt(search.car, `default`).sanText : '',
  cbVal: (val)=>{
    setSearch( (prev)=> ({...prev, car:sanitizeTxt(val, `default`).sanText}))
  },
  cbErr: ()=>{}
})

export const clientProps = (search, setSearch)=>({
  legend: `client`,
  type: `text`,
  val: search?.client ? sanitizeTxt(search.client, `default`).sanText : '',
  cbVal: (val)=>{
    setSearch( (prev)=> ({...prev, client:sanitizeTxt(val, `default`).sanText}))
  },
  cbErr: ()=>{}
})

export const telProps = (search, setSearch)=>({
  legend: `tel`,
  type: `text`,
  val: search?.tel ? sanitizeTxt(search.tel, `tel`).sanText : '',
  cbVal: (val)=>{
    setSearch( (prev)=> ({...prev, tel:sanitizeTxt(val, `tel`).sanText}))
  },
  cbErr: ()=>{}
})

export const vintProps = (search, setSearch)=>({
  legend: `vin`,
  type: `text`,
  val: search?.vin ? sanitizeTxt(search.vin, `VIN`).sanText : '',
  cbVal: (val)=>{
    setSearch( (prev)=> ({...prev, vin:sanitizeTxt(val, `VIN`).sanText}))
  },
  cbErr: ()=>{}
})