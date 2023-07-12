
export const docNrProps = (tr, lang, nr, setNr, editErr, setEditErr, setSave, sanitizeTxt)=> ({
  legend: tr(`DocNrLegend`,lang),
  type: `text`,
  val: nr?.assignNr ? nr.assignNr : '',
  err: editErr?.assignNr ?? '',
  cbVal: (val)=>{
    setNr( (prev)=> ({...prev, assignNr:sanitizeTxt(val, `all`).sanText}))
    setSave(true)
  },
  cbErr: (val)=> setEditErr( (prev) => ({
    ...prev, assignNr:sanitizeTxt(val, `all`).sanErr
  }))
})

export const placeProps = (tr, lang, nr, setNr, editErr, setEditErr, setSave, sanitizeTxt)=> ({
  legend: tr(`PlaceLegendTop`,lang),
  type: `text`,
  val: nr?.place ? sanitizeTxt(nr.place, `town`).sanText : '',
  err: editErr?.nrPlace ?? '',
  cbVal: (val)=>{
    setNr( (prev)=> ({...prev, place:sanitizeTxt(val, `town`).sanText}))
    setSave(true)
  },
  cbErr: (val)=> setEditErr( (prev) => ({
    ...prev, nrPlace:sanitizeTxt(val, `town`).sanErr
  }))
})

export const fromProps = (tr, lang, nr, setNr, setSave)=> ({
  legend: tr(`FromLegend`,lang),
  type: `date`,
  val: nr?.from ?? '',
  cbVal: (val)=>{
    setNr( (prev)=> ( val <= prev.to ? {...prev, from:val} : {...prev, from:val, to:val} ))
    setSave(true)
  },
  cbErr: ()=>{}
})

export const toProps = (tr, lang, nr, setNr, setSave)=> ({
  legend: tr(`ToLegend`,lang),
  type: `date`,
  val: nr?.to ?? '',
  cbVal: (val)=>{
    setNr( (prev)=> ( val >= prev.from ? {...prev, to:val} : {...prev, from:val, to:val} ))
    setSave(true)
  },
  cbErr: ()=>{}
})