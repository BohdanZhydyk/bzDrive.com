import { sanitizeTxt } from "./../../../../AppFunctions"
import { tr } from "../../../../AppTranslate"

export const searchPropses = ({lang, searchQuery, setSearchQuery, searchLen, SEARCH, ERASE})=>({
  legend: tr(`DocLegend`,lang),
  plhol: tr(`DocSearchPlaceHolder`,lang),
  type: `text`,
  val: searchQuery?.val ? sanitizeTxt(searchQuery?.val, `default`).sanText : '',
  err: searchQuery?.err ?? '',
  isImg: searchQuery?.val?.length > 1 ? "Search" : (searchLen > 0 ? "Erase" : false),
  imgAct: ()=>{ searchQuery?.val?.length > 1 ? SEARCH() : ERASE() },
  cbVal: (val)=> setSearchQuery( (prev)=> ({...prev, val:sanitizeTxt(val, `default`).sanText}) ),
  cbErr: (val)=> setSearchQuery( (prev)=> ({...prev, err:sanitizeTxt(val, `default`).sanErr}) ),
})