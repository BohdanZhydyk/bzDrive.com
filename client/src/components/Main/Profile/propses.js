import { tr } from "../../../AppTranslate"
import { GetUser, sanitizeTxt } from "../../../AppFunctions"


const lang = GetUser()?.lang

const langImgs = [
  "https://bzdrive.com/files/ico/lng/lngen.png",
  "https://bzdrive.com/files/ico/lng/lngua.png",
  "https://bzdrive.com/files/ico/lng/lngpl.png"
]

const genderImgs = [
  "https://bzdrive.com/files/users/male.png",
  "https://bzdrive.com/files/users/female.png"
]

export const emailProps = (email, setEmail)=>({
  legend: tr(`EmailLegend`,lang),
  type: `text`,
  plhol: tr(`PlaceHolder`,lang),
  val: email?.val ? sanitizeTxt(email.val, `email`).sanText : '',
  err: email?.err ?? '',
  cbVal: (val)=> setEmail( (prev)=> ({...prev, val:sanitizeTxt(val, `email`).sanText, edit:true}) ),
  cbErr: (val)=> setEmail( (prev)=> ({...prev, err:sanitizeTxt(val, `email`).sanErr}))
})

export const passProps = (pass, setPass)=>({
  legend: tr(`PassLegend`,lang),
  type: `password`,
  plhol: tr(`PlaceHolder`,lang),
  val: pass?.val ? sanitizeTxt(pass.val, `pass`).sanText : '',
  err: pass?.err ?? '',
  cbVal: (val)=> setPass( (prev)=> ({...prev, val:sanitizeTxt(val, `pass`).sanText, edit:true}) ),
  cbErr: (val)=> setPass( (prev)=> ({...prev, err:sanitizeTxt(val, `pass`).sanErr}))
})

export const verifyProps = (verify, setVerify)=>({
  legend: tr(`VerifyLegend`,lang),
  type: `password`,
  plhol: tr(`PlaceHolder`,lang),
  val: verify?.val ? sanitizeTxt(verify.val, `verify`).sanText : '',
  err: verify?.err ?? '',
  cbVal: (val)=> setVerify( (prev)=> ({...prev, val:sanitizeTxt(val, `verify`).sanText, edit:true}) ),
  cbErr: (val)=> setVerify( (prev)=> ({...prev, err:sanitizeTxt(val, `verify`).sanErr}))
})

export const confirmProps = (confirm, setConfirm)=>({
  legend: tr(`ConfirmLegend`,lang),
  type: `text`,
  plhol: tr(`PlaceHolder`,lang),
  val: confirm?.val ? sanitizeTxt(confirm.val, `confirm`).sanText : '',
  err: confirm?.err ?? '',
  cbVal: (val)=> setConfirm( (prev)=> ({...prev, val:sanitizeTxt(val, `confirm`).sanText, edit:true}) ),
  cbErr: (val)=> setConfirm( (prev)=> ({...prev, err:sanitizeTxt(val, `confirm`).sanErr}))
})

export const langProps = (userLang, setUserLang)=>({
  radios: userLang?.values,
  images: langImgs,
  act: userLang?.values.indexOf(userLang?.val),
  cb: (nr)=> setUserLang( prev=> ({...prev, val:userLang?.values[nr], edit:true}) )
})

export const genderProps = (gender, setGender)=>({
  radios: gender?.values,
  images: genderImgs,
  act: gender?.values.indexOf(gender?.val),
  cb: (nr)=> setGender( prev=> ({...prev, val:gender?.values[nr], edit:true}) )
})