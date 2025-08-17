import { sanitizeTxt } from "../../../AppFunctions"
import { SoftTr } from "./SoftwareTranslate"

export const searchPropses = ({lang, searchQuery, setSearchQuery, isImg, imgAct})=>({
  legend: SoftTr(`SearchLegend`,lang),
  plhol: SoftTr(`SwSearchPlaceHolder`,lang),
  type: `text`,
  val: searchQuery?.val ? sanitizeTxt(searchQuery?.val, `default`).sanText : '',
  err: searchQuery?.err ?? '',
  isImg,
  imgAct,
  cbVal: (val)=> setSearchQuery( (prev)=> ({...prev, val:sanitizeTxt(val, `default`).sanText}) ),
  cbErr: (val)=> setSearchQuery( (prev)=> ({...prev, err:sanitizeTxt(val, `default`).sanErr}) ),
})