import { tr } from "../../../AppTranslate"
import { sanitizeTxt } from "../../../AppFunctions"


export const AuthProps = (formData, setFormData, lang)=>{
  return {
    login: {
      legend: tr(`LogInLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: formData?.login,
      sanit: (txt)=>sanitizeTxt(txt, `login`),
      cb: (val)=> setFormData( (prev) => ({...prev, login:val}) )
    },
    email: {
      legend: tr(`EmailLegend`,lang),
      type: `email`,
      plhol: tr(`PlaceHolder`,lang),
      val: formData?.email,
      sanit: (txt)=>sanitizeTxt(txt, `email`),
      cb: (val)=> setFormData( (prev) => ({...prev, email:val}) )
    },
    pass: {
      legend: tr(`PassLegend`,lang),
      type: `password`,
      plhol: tr(`PlaceHolder`,lang),
      val: formData?.pass,
      sanit: (txt)=>sanitizeTxt(txt, `pass`),
      cb: (val)=> setFormData( (prev) => ({...prev, pass:val}) )
    },
    verify: {
      legend: tr(`VerifyLegend`,lang),
      type: `password`,
      plhol: tr(`PlaceHolder`,lang),
      val: formData?.verify,
      sanit: (txt)=>sanitizeTxt(txt, `pass`),
      cb: (val)=> setFormData( (prev) => ({...prev, verify:val}) )
    },
    confirm: {
      legend: tr(`ConfirmLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: formData?.logconfirmin,
      sanit: (txt)=>sanitizeTxt(txt, `pass`),
      cb: (val)=> setFormData( (prev) => ({...prev, confirm:val}) )
    }
  }
}