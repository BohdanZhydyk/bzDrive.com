import { sanitizeTxt } from "../../../../../AppFunctions"


export const inputShort = ({newShort, setNewShort})=>{
  return{
    idPropses:{
      classes:"www",
      legend: "New YouTube Short ID",
      type: `text`,
      val: newShort?.videoId ? sanitizeTxt(newShort.videoId, `default`).sanText : '',
      // err: editErr?.newShortId ?? '',
      err: '',
      cbVal: (val)=>{
        setNewShort( (prev)=> ({...prev, videoId:sanitizeTxt(val, `default`).sanText}) )
        // setSave(true)
      },
      // cbErr: (val)=> setEditErr( (prev)=> ({...prev, newShortId:sanitizeTxt(val, `www`).sanErr}))
      cbErr: ()=>{}
    },
    namePropses:{
      classes:"www",
      legend: "New YouTube Short Name",
      type: `text`,
      val: newShort?.name ? sanitizeTxt(newShort.name, `default`).sanText : '',
      // err: editErr?.newShortId ?? '',
      err: '',
      cbVal: (val)=>{
        setNewShort( (prev)=> ({...prev, name:sanitizeTxt(val, `default`).sanText}) )
        // setSave(true)
      },
      // cbErr: (val)=> setEditErr( (prev)=> ({...prev, newShortId:sanitizeTxt(val, `www`).sanErr}))
      cbErr: ()=>{}
    }
  }
}