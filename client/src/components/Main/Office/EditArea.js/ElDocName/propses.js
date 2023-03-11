
export const propses = (tr, lang, nr, setNr, editErr, setEditErr, setSave, sanitizeTxt)=> [
  {
    legend: tr(`PlaceLegend`,lang),
    type: `text`,
    plhol: tr(`PlaceHolder`,lang),
    val: nr?.place ?? '',
    err: editErr?.nrPlace ?? '',
    cbVal: (val)=>{
      setNr( (prev)=> ({...prev, place:sanitizeTxt(val, `town`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev) => ({
      ...prev, nrPlace:sanitizeTxt(val, `town`).sanErr
    }))
  },
  {
    legend: tr(`FromLegend`,lang),
    type: `date`,
    plhol: tr(`PlaceHolder`,lang),
    val: nr?.from ?? '',
    cbVal: (val)=>{
      setNr( (prev)=> ( val <= prev.to ? {...prev, from:val} : {...prev, from:val, to:val} ))
      setSave(true)
    },
    cbErr: ()=>{}
  },
  {
    legend: tr(`ToLegend`,lang),
    type: `date`,
    plhol: tr(`PlaceHolder`,lang),
    val: nr?.to ?? '',
    cbVal: (val)=>{
      setNr( (prev)=> ( val >= prev.from ? {...prev, to:val} : {...prev, from:val, to:val} ))
      setSave(true)
    },
    cbErr: ()=>{}
  }
]