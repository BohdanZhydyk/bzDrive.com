import { bzCalc } from "../../../../AppFunctions"


export function calcTaxProfit({
  netRevenue, netCosts, incomeTaxRate1, incomeTaxRate2, taxVatRate,
  incomeTaxThreshold, taxReductionAmount, taxZUS
}) {

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

  const profit = bzCalc("-", netRev, netCos)
  const vat = bzCalc("*", profit, taxVat)
  const clearProfit = bzCalc("-", bzCalc("-", profit, tax), taxZUS)

  return { tax, vat, profit, clearProfit }
}