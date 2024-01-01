import { tr } from "./../../../../AppTranslate"
import { GetUser, PostToApi, sanitizeTxt } from "./../../../../AppFunctions"


const lang = GetUser().lang

export const nipPropses = (nip, setNip, partner, setPartner, editErr, setEditErr)=>({
  classes:"nip",
  legend: tr(`NipLegend`,lang),
  plhol: tr(`NipSearchPlaceHolder`,lang),
  type: `text`,
  val: nip ? sanitizeTxt(nip, `NIP`).sanText : '',
  err: editErr?.NIP ?? '',
  isImg: nip?.length === 13 ? "Erase" : false,
  imgAct: ()=>{
    setNip( (prev)=> false )
    setPartner( (prev)=> false )
    setEditErr( (prev)=> false )
  },
  cbVal: (val)=> setNip( (prev)=> sanitizeTxt(val, `NIP`).sanText ),
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, NIP:sanitizeTxt(val, `NIP`).sanErr} ))
})

export const GET_NIP = (nip, partner, cb)=>{

  PostToApi("/getNIP", { nip, partner }, (data)=> cb(data) )

}