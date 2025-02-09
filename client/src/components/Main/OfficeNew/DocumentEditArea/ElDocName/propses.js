import { DocNameNormalize, sanitizeTxt } from "../../../../../AppFunctions"


export const docNrProps = ({tr, lang, nr, setNr, setSave})=> ({
  legend: tr(`DocNrLegend`,lang),
  type: `text`,
  val: (nr?.assignNr?.length > 0) ? nr.assignNr : (nr ? DocNameNormalize(nr) : ''),
  cbVal: (val)=>{
    setNr( (prev)=> ({...prev, assignNr:sanitizeTxt(val, `all`).sanText}))
    setSave(true)
  }
})

export const placeProps = ({tr, lang, nr, setNr, setSave})=> ({
  legend: tr(`PlaceLegendTop`,lang),
  type: `text`,
  val: nr?.place ? sanitizeTxt(nr.place, `town`).sanText : '',
  cbVal: (val)=>{
    setNr( (prev)=> ({...prev, place:sanitizeTxt(val, `town`).sanText}))
    setSave(true)
  }
})

export const fromProps = ({tr, lang, nr, setNr, setSave})=> ({
  legend: tr(`FromLegend`,lang),
  type: `date`,
  val: nr?.from ?? '',
  cbVal: (val)=>{
    setNr( (prev)=> ( val <= prev.to ? {...prev, from:val} : {...prev, from:val, to:val} ))
    setSave(true)
  }
})

export const toProps = ({tr, lang, nr, setNr, setSave})=> ({
  legend: tr(`ToLegend`,lang),
  type: `date`,
  val: nr?.to ?? '',
  cbVal: (val)=>{
    setNr( (prev)=> ( val >= prev.from ? {...prev, to:val} : {...prev, from:val, to:val} ))
    setSave(true)
  }
})