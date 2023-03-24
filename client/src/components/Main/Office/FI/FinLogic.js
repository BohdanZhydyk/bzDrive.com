import { bzCalc, TimeTo_YYYYMM } from "../../../../AppFunctions"


export function prepareFinances(data){

  const emptyFinMonths = { "col_9":"0.00", "col_10":"0.00", "col_14":"0.00", "ZUS":"0.00" }

  const nowDate = parseInt( TimeTo_YYYYMM(Date.now()) )

  const taxYear = parseInt( data?.taxYearArr[0]?.date.toString().slice(0,4) )
  const isNowYear = taxYear === parseInt( TimeTo_YYYYMM(Date.now()).toString().slice(0,4) )
  const isNowMonth = nowDate === data?.taxYearArr[0]?.date

  const newFin = data?.taxYearArr?.length > 0
    ? isNowYear
      ? isNowMonth
        ? data?.taxYearArr
        : [{"indepMode":true, "date":nowDate, ...emptyFinMonths}, ...data?.taxYearArr]
      : data?.taxYearArr
    : [{"indepMode":true, "date":nowDate, ...emptyFinMonths}]

  let prevMonthVAT = "0.00"
  let prevMonthZUS = "0.00"
  let newFinances = []
  let prevMonthVATarr = []
  let prevMonthZUSarr = []

  for (let i = newFin.length - 1; i >= 0; i--) { newFinances.push(newFin[i]) }

  newFinances.forEach( (el, i)=>{

    const VAT = bzCalc("*", bzCalc("-", el?.col_9, bzCalc("+", el?.col_10, el?.col_14)), "0.23")

    if(el?.pVAT){ prevMonthVAT = el?.pVAT }
    if(el?.pZUS){ prevMonthZUS = el?.pZUS }

    if(parseFloat(prevMonthVAT) <= 0){
      prevMonthVAT = bzCalc("+", prevMonthVAT, VAT)
      prevMonthVATarr.unshift(prevMonthVAT)
    }
    else{
      prevMonthVAT = "0.00"
      prevMonthVATarr.unshift(prevMonthVAT)
    }
    
    prevMonthZUSarr.unshift(el?.ZUS)
    
  })

  return newFin?.map( (el, i)=> ({
    ...el,
    pVAT:prevMonthVATarr[i+1] ?? (el?.pVAT ?? "0.00"),
    pZUS:prevMonthZUSarr[i+1] ?? (el?.pZUS ?? "0.00")
  }) )
}

export function calcTaxProfit(
  netRevenue, netCosts,
  incomeTaxRate1, incomeTaxRate2, taxVatRate,
  incomeTaxThreshold, taxReductionAmount,
  taxZUS
) {

  if(netRevenue === "0.00" && netCosts === "0.00" && taxZUS === "0.00"){
    return { tax:"0.00", vat:"0.00", profit:"0.00" }
  }

  const taxRate1 = bzCalc("/", incomeTaxRate1, 100)
  const taxRate2 = bzCalc("/", incomeTaxRate2, 100)
  const taxVat = bzCalc("/", taxVatRate, 100)

  const netRev = parseFloat(netRevenue)
  const netCos = parseFloat(netCosts)
  const inTaxThr = parseFloat(incomeTaxThreshold)
  const taxRed = parseFloat(taxReductionAmount)

  let tax

  if ( netRev <= inTaxThr ) {
    tax = bzCalc("*", taxRate1, bzCalc("-", bzCalc("-", bzCalc("-", netRev, netCos), taxRed), taxZUS))
  } else {
    const tax1 = bzCalc("-", bzCalc("-", bzCalc("-", inTaxThr, netCos), taxRed), taxZUS)
    const tax2 = bzCalc("-", bzCalc("-", bzCalc("-", bzCalc("-", netRev, inTaxThr), netCos), taxRed), taxZUS)
    tax = bzCalc("+", bzCalc("*", taxRate1, tax1), bzCalc("*", taxRate2, tax2))
  }

  const vat = bzCalc("*", bzCalc("-", netRev, netCos), taxVat)
  const profit = bzCalc("-", bzCalc("-", bzCalc("-", netRev, netCos), tax), taxZUS)

  return { tax, vat, profit }
}