import { sanitizeTxt } from "./../../../../AppFunctions"


export const fromProps = (tr, lang, search, setSearch)=> ({
  legend: tr(`FromLegend`,lang),
  type: `date`,
  val: search?.query?.from ?? '',
  cbVal: (val)=>{
    setSearch( (prev)=> ( {...prev, query:{...prev?.query, from:sanitizeTxt(val, `default`).sanText} } ))
  },
  cbErr: ()=>{}
})

export const toProps = (tr, lang, search, setSearch)=> ({
  legend: tr(`ToLegend`,lang),
  type: `date`,
  val: search?.query?.to ?? '',
  cbVal: (val)=>{
    setSearch( (prev)=> ( {...prev, query:{...prev?.query, to:sanitizeTxt(val, `default`).sanText} } ))
  },
  cbErr: ()=>{}
})

export const carProps = (search, setSearch)=>({
  legend: `Marka/Model`,
  type: `text`,
  val: search?.query?.car ? sanitizeTxt(search.query.car, `default`).sanText : '',
  cbVal: (val)=>{
    setSearch( (prev)=> ( {...prev, query:{...prev?.query, car:sanitizeTxt(val, `default`).sanText} } ))
  },
  cbErr: ()=>{}
})

export const clientProps = (search, setSearch)=>({
  legend: `Client`,
  type: `text`,
  val: search?.query?.client ? sanitizeTxt(search.query.client, `default`).sanText : '',
  cbVal: (val)=>{
    setSearch( (prev)=> ( {...prev, query:{...prev?.query, client:sanitizeTxt(val, `default`).sanText} } ))
  },
  cbErr: ()=>{}
})

export const telProps = (search, setSearch)=>({
  legend: `Tel`,
  type: `text`,
  val: search?.query?.tel ? sanitizeTxt(search.query.tel, `tel`).sanText : '',
  cbVal: (val)=>{
    setSearch( (prev)=> ( {...prev, query:{...prev?.query, tel:sanitizeTxt(val, `tel`).sanText} } ))
  },
  cbErr: ()=>{}
})

export const vinProps = (search, setSearch)=>({
  legend: `VIN`,
  type: `text`,
  val: search?.query?.vin ? sanitizeTxt(search.query.vin, `VIN`).sanText : '',
  cbVal: (val)=>{
    setSearch( (prev)=> ( {...prev, query:{...prev?.query, vin:sanitizeTxt(val, `VIN`).sanText} } ))
  },
  cbErr: ()=>{}
})