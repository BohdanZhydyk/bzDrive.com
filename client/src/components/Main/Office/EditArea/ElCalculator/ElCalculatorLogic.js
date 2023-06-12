import { bzCalc } from "../../../../../AppFunctions"

export function SanQuates(val) {
  if(val === ""){val = "0.00"}
  const regex = /[^0-9.-]/g
  const sanitized = val.replace(regex, "")
  return parseFloat(sanitized).toFixed(2)
}

export function SanQuantity(val) {
  if(val === ""){val = "0"}
  const regex = /[^0-9]/g
  const sanitized = val.replace(regex, "")
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