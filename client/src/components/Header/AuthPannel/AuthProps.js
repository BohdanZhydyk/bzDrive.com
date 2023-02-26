import { tr } from "../../../AppTranslate"
import { sanitizeTxt } from "../../../AppFunctions"


export const AuthProps = (formData, setFormData, lang, setServErr)=>{
  return {
    login: {
      legend: tr(`LogInLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: formData?.login,
      sanit: (txt)=>sanitizeTxt(txt, `login`),
      cb: (val)=> setFormData( (prev) => ({...prev, login:val}) ),
      setServErr
    },
    email: {
      legend: tr(`EmailLegend`,lang),
      type: `email`,
      plhol: tr(`PlaceHolder`,lang),
      val: formData?.email,
      sanit: (txt)=>sanitizeTxt(txt, `email`),
      cb: (val)=> setFormData( (prev) => ({...prev, email:val}) ),
      setServErr
    },
    pass: {
      legend: tr(`PassLegend`,lang),
      type: `password`,
      plhol: tr(`PlaceHolder`,lang),
      val: formData?.pass,
      sanit: (txt)=>sanitizeTxt(txt, `pass`),
      cb: (val)=> setFormData( (prev) => ({...prev, pass:val}) ),
      setServErr
    },
    verify: {
      legend: tr(`VerifyLegend`,lang),
      type: `password`,
      plhol: tr(`PlaceHolder`,lang),
      val: formData?.verify,
      sanit: (txt)=>sanitizeTxt(txt, `pass`),
      cb: (val)=> setFormData( (prev) => ({...prev, verify:val}) ),
      setServErr
    },
    confirm: {
      legend: tr(`ConfirmLegend`,lang),
      type: `text`,
      plhol: tr(`PlaceHolder`,lang),
      val: formData?.logconfirmin,
      sanit: (txt)=>sanitizeTxt(txt, `pass`),
      cb: (val)=> setFormData( (prev) => ({...prev, confirm:val}) ),
      setServErr
    }
  }
}