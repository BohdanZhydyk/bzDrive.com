import { bzCalc } from "../../../../AppFunctions"


// export function prepareFinances1(data){

//   const emptyFinMonths = { "col_9":"0.00", "col_10":"0.00", "col_14":"0.00", "ZUS":"0.00" }

//   const firstElDate = parseInt( data?.taxYearArr[data?.taxYearArr?.length - 1]?.date )

//   const nowDate = parseInt( TimeTo_YYYYMM(Date.now()) )
//   const nowYear = nowDate.toString().slice(0,4)
//   const finYear = firstElDate.toString().slice(0,4)

//   const lastElDate = (finYear === nowYear) ? nowDate : parseInt( data?.taxYearArr[0]?.date )

//   let prevMonthVAT = "0.00"
//   let prevMonthZUS = "0.00"
//   let newFinances = []
//   let prevMonthVATarr = []
//   let prevMonthZUSarr = []

//   for (let i = firstElDate; i <= lastElDate; i++){
//     data?.taxYearArr?.find(o => o.date === i)
//     ? newFinances.push(data?.taxYearArr?.find(o => o.date === i))
//     : newFinances.push({"newMonth":true, "date":i, ...emptyFinMonths})
//   }

//   newFinances.forEach( (el, i)=>{
    
//     const VAT = bzCalc("*", bzCalc("-", el?.col_9, bzCalc("+", el?.col_10, el?.col_14)), "0.23")
    
//     if(el?.pVAT){ prevMonthVAT = el?.pVAT }
//     if(el?.pZUS){ prevMonthZUS = el?.pZUS }

//     if(parseFloat(prevMonthVAT) <= 0){
//       prevMonthVAT = bzCalc("+", prevMonthVAT, VAT)
//       prevMonthVATarr.push(prevMonthVAT)
//     }
//     else{
//       prevMonthVAT = "0.00"
//       prevMonthVATarr.push(prevMonthVAT)
//     }
    
//     prevMonthZUSarr.push(el?.ZUS)
    
//   })

//   return newFinances?.map( (month, i)=> ({
//     ...month,
//     pVAT:prevMonthVATarr[i-1] ?? (month?.pVAT ?? "0.00"),
//     pZUS:prevMonthZUSarr[i-1] ?? (month?.pZUS ?? "0.00")
//   }) ).reverse()
// }

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