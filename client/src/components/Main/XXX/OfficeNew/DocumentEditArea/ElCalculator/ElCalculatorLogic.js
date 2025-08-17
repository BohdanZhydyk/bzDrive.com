import { SumArray, bzCalc } from "../../../../../AppFunctions"
import { tr } from "../../../../../AppTranslate"
import ActionBtn from "../../../../All/ActionBtn"


export const emptyArticle = ()=> ({ART:"",PRI:"0.00",QUA:"1",VAT:"23",NET:"0.00",PRV:"0.00",SUM:"0.00"})

export const PLUS_ART_FIRST = (setSave, setArticles)=>{
  setSave(true)
  setArticles( prev=> ([emptyArticle(), ...prev]) )
}
export const PLUS_ART_LAST = (setSave, setArticles)=>{
  setSave(true)
  setArticles( prev=> ([...prev, emptyArticle()]) )
}
export const DEL_ART = (setSave, setArticles, a)=>{
  setSave(true)
  setArticles( prev=> prev.filter( (art, n)=> (n !== a) && art ) )
}
export const CHG_ART = (setSave, setArticles, name, val, a)=>{
  setSave(true)
  setArticles( prev=> prev.map( (art, i)=> i === a ? ArticleCalc(name, art, val) : art ) )
}

export const topLine = (setSave, setArticles, printMode, lang)=> [{
  CLA: `TableCellTop`,
  NUM: tr(`TableNUM`,lang),
  ART: tr(`TableART`,lang),
  PRI: `${tr(`TablePRI`,lang)}, zł`,
  QUA: tr(`TableQUA`,lang),
  VAT: `${tr(`TableVAT`,lang)}, %`,
  NET: `${tr(`TableNET`,lang)}, zł`,
  PRV: `${tr(`TablePRV`,lang)}, zł`,
  SUM: `${tr(`TableSUM`,lang)}, zł`,
  BTN: <ActionBtn props={{ name:`plus`, click:()=>PLUS_ART_FIRST(setSave, setArticles) }} />,
  printMode,
  top:true
}]

export const artLine = (setSave, setArticles, printMode, art, a)=> ({
  CLA: `TableCell`,
  NUM: `${a + 1}.`,
  ART: art.ART,
  PRI: art.PRI,
  QUA: art.QUA,
  VAT: art.VAT,
  NET: art.NET,
  PRV: art.PRV,
  SUM: art.SUM,
  FN: (name, val)=>CHG_ART(setSave, setArticles, name, val, a),
  BTN: <ActionBtn props={{ name:`delete`, click:()=>DEL_ART(setSave, setArticles, a) }} />,
  printMode
})

export const bottomLine = (articles, setSave, setArticles, printMode, lang)=> [{
  CLA: `TableCellBottom`,
  NUM: ``,
  ART: ``,
  TOT: `${tr(`TableTOT`,lang)} :`,
  NET: SumArray(articles.map(el=> el.NET)),
  PRV: SumArray(articles.map(el=> el.PRV)),
  SUM: SumArray(articles.map(el=> el.SUM)),
  BTN: <ActionBtn props={{ name:`plus`, click:()=>PLUS_ART_LAST(setSave, setArticles) }} />,
  printMode
}]

export function SanQuates(val) {
  if (val === "") { val = "0.00"}
  val = val.replace(/,/g, ".")
  const regex = /[^0-9.-]/g
  const sanitized = val.replace(regex, "")
  return parseFloat(sanitized).toFixed(2)
}

export function SanQuantity(val) {
  if(val === ""){val = "0"}
  // const regex = /[^0-9]/g
  const regex = /[^0-9ZWNPM]/gi
  // const sanitized = val.replace(regex, "")
  const sanitized = val.replace(regex, "").toUpperCase()
  return sanitized
}

export function ArticleCalc(name, art, val){

  let PRI,QUA,VAT,NET,PRV,SUM = true

  switch (name) {
    case "ART": return {...art, ART:val}
    case "PRI":
      PRI = SanQuates(val)
      QUA = art.QUA
      VAT = art.VAT
      NET = bzCalc("*",PRI,QUA)
      PRV = bzCalc("*",NET,bzCalc("/",VAT,100))
      SUM = bzCalc("+",NET,PRV)
      return {...art,PRI,QUA,VAT,NET,PRV,SUM}
    case "QUA":
      QUA = SanQuantity(val)
      PRI = art.PRI 
      VAT = art.VAT
      NET = bzCalc("*",PRI,QUA)
      PRV = bzCalc("*",NET,bzCalc("/",VAT,100))
      SUM = bzCalc("+",NET,PRV)
      return {...art,PRI,QUA,VAT,NET,PRV,SUM}
    case "VAT":
      VAT = SanQuantity(val)
      PRI = art.PRI 
      QUA = art.QUA
      NET = bzCalc("*",PRI,QUA)
      PRV = bzCalc("*",NET,bzCalc("/",VAT,100))
      SUM = bzCalc("+",NET,PRV)
      return {...art,PRI,QUA,VAT,NET,PRV,SUM}
    case "NET":
      NET = SanQuates(val)
      QUA = art.QUA
      VAT = art.VAT
      PRI = bzCalc("/",NET,QUA)
      PRV = bzCalc("*",NET,bzCalc("/",VAT,100))
      SUM = bzCalc("+",NET,PRV)
      return {...art,PRI,QUA,VAT,NET,PRV,SUM}
    case "PRV":
      PRV = SanQuates(val)
      VAT = art.VAT
      QUA = art.QUA
      NET = bzCalc("/",PRV,bzCalc("/",VAT,100))
      PRI = bzCalc("/",NET,QUA)
      SUM = bzCalc("+",NET,PRV)
      return {...art,PRI,QUA,VAT,NET,PRV,SUM}
    case "SUM":
      SUM = SanQuates(val)
      VAT = art.VAT
      QUA = art.QUA
      NET = bzCalc("/",SUM,bzCalc("+",1,bzCalc("/",VAT,100)))
      PRV = bzCalc("-",SUM,NET)
      PRI = bzCalc("/",NET,QUA)
      return {...art,PRI,QUA,VAT,NET,PRV,SUM}
    default: return art
  }
}