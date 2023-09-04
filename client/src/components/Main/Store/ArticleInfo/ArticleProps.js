import { sanitizeTxt } from "../../../../AppFunctions"


export const namePropses = (art, setArt, editErr, setEditErr, setSave)=> ({
  legend: "article name",
  type: `text`,
  val: art?.ART ? sanitizeTxt(art.ART, `default`).sanText : '',
  err: editErr?.ART ?? '',
  cbVal: (val)=>{
    setArt( (prev)=> ({...prev, ART:sanitizeTxt(val, `default`).sanText}))
    setSave(true)
  },
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, ART:sanitizeTxt(val, `default`).sanErr}))
})

export const quantityPropses = (art, setArt, editErr, setEditErr, setSave)=> ({
  legend: "quantity",
  type: `text`,
  val: art?.QUA ? sanitizeTxt(art.QUA, `default`).sanText : '',
  err: editErr?.QUA ?? '',
  cbVal: (val)=>{
    setArt( (prev)=> ({...prev, QUA:sanitizeTxt(val, `default`).sanText}))
    setSave(true)
  },
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, QUA:sanitizeTxt(val, `default`).sanErr}))
})

export const pricePropses = (art, setArt, editErr, setEditErr, setSave)=> ({
  legend: "price",
  type: `text`,
  val: art?.PRI ? sanitizeTxt(art.PRI, `default`).sanText : '',
  err: editErr?.PRI ?? '',
  cbVal: (val)=>{
    setArt( (prev)=> ({...prev, PRI:sanitizeTxt(val, `default`).sanText}))
    setSave(true)
  },
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, PRI:sanitizeTxt(val, `default`).sanErr}))
})

export const decriptionPropses = (art, setArt, editErr, setEditErr, setSave)=>({
  plhol: "tipe description here...",
  val: art?.DSC ?? '',
  cbVal: (val)=>{
    setArt( (prev)=> ({...prev, DSC:sanitizeTxt(val, `default`).sanText}))
    setSave(true)
  },
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, DSC:sanitizeTxt(val, `default`).sanErr}))
})