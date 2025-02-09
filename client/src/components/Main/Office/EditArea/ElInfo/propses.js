import { GET_VIN } from "../../DecoderVIN/DecoderVINLogic"
import { GET_NIP } from "../../DecoderNIP/DecoderNIPLogic"
import { sanitizeTxt } from "../../../../../AppFunctions"


export const CarPropses = (tr, lang, car, setCar, editErr, setEditErr, setSave)=> [
  {
    classes:"brand",
    legend: tr(`BrandLegend`,lang),
    type: `text`,
    val: car?.brand ? sanitizeTxt(car.brand, `default`).sanText : '',
    err: editErr?.carBrand ?? '',
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, brand:sanitizeTxt(val, `default`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carBrand:sanitizeTxt(val, `default`).sanErr}))
  },
  {
    classes:"model",
    legend: tr(`ModelLegend`,lang),
    type: `text`,
    val: car?.model ? sanitizeTxt(car.model, `default`).sanText : '',
    err: editErr?.carModel ?? '',
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, model:sanitizeTxt(val, `default`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carModel:sanitizeTxt(val, `default`).sanErr}))
  },
  {
    classes:"numbers",
    legend: tr(`NumbersLegend`,lang),
    type: `text`,
    val: car?.numbers ? sanitizeTxt(car.numbers, `carNumbers`).sanText : '',
    err: editErr?.carNumbers ?? '',
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, numbers:sanitizeTxt(val, `carNumbers`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carNumbers:sanitizeTxt(val, `carNumbers`).sanErr}))
  },
  {
    classes:"vin",
    legend: tr(`VinLegend`,lang),
    type: `text`,
    val: car?.vin ? sanitizeTxt(car.vin, `VIN`).sanText : '',
    err: editErr?.carVIN ?? '',
    isImg: car?.vin?.length > 16 ? "Search" : false,
    imgAct: ()=> GET_VIN(car?.vin, (data)=>{
      const carData = data?.length > 0 ? data[0].carData : false
      const msg = data?.length > 0 ? data[0].msg : ""
      setEditErr( (prev)=> ({...prev, carVIN:msg}) )
      setCar( (prev)=> ({...prev, ...carData}) )
    }),
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, vin:sanitizeTxt(val, `VIN`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carVIN:sanitizeTxt(val, `VIN`).sanErr}))
  },
  {
    classes:"engine",
    legend: tr(`EngineLegend`,lang),
    type: `text`,
    val: car?.engine ? sanitizeTxt(car.engine, `default`).sanText : '',
    err: editErr?.carEngine ?? '',
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, engine:sanitizeTxt(val, `default`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carEngine:sanitizeTxt(val, `default`).sanErr}))
  },
  {
    classes:"prod",
    legend: tr(`ProdLegend`,lang),
    type: `text`,
    val: car?.prod ? sanitizeTxt(car.prod, `default`).sanText : '',
    err: editErr?.carProd ?? '',
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, prod:sanitizeTxt(val, `default`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carProd:sanitizeTxt(val, `default`).sanErr}))
  },
  {
    classes:"fuel",
    legend: tr(`FuelLegend`,lang),
    type: `text`,
    val: car?.fuel ? sanitizeTxt(car.fuel, `default`).sanText : '',
    err: editErr?.carFuel ?? '',
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, fuel:sanitizeTxt(val, `default`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carFuel:sanitizeTxt(val, `default`).sanErr}))
  },
  {
    classes:"odo",
    legend: tr(`OdoLegend`,lang),
    type: `text`,
    val: car?.odo ? sanitizeTxt(car.odo, `default`).sanText : '',
    err: editErr?.carOdo ?? '',
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, odo:sanitizeTxt(val, `default`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carOdo:sanitizeTxt(val, `default`).sanErr}))
  },
  {
    classes:"agree",
    legend: tr(`AgreeLegend`,lang),
    type: `text`,
    val: car?.agree ? sanitizeTxt(car.agree, `default`).sanText : '',
    err: editErr?.carAgree ?? '',
    cbVal: (val)=>{
      setCar( (prev)=> ({...prev, agree:sanitizeTxt(val, `default`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, carAgree:sanitizeTxt(val, `default`).sanErr}))
  }
]

export const ClientPropses = (tr, lang, client, setClient, editErr, setEditErr, setSave)=> [
  {
    classes:"name",
    legend: tr(`NameLegend`,lang),
    type: `text`,
    val: client?.name ? sanitizeTxt(client.name, `CompanyName`).sanText : '',
    err: editErr?.clientName ?? '',
    cbVal: (val)=>{
      setClient( (prev)=> ({...prev, name:sanitizeTxt(val, `CompanyName`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, clientName:sanitizeTxt(val, `CompanyName`).sanErr}))
  },
  {
    classes:"nip",
    legend: tr(`NipLegend`,lang),
    type: `text`,
    val: client?.nip ? sanitizeTxt(client.nip, `NIP`).sanText : '',
    err: editErr?.clientNIP ?? '',
    isImg: client?.nip?.length > 12 ? "Search" : false,
    imgAct: ()=> GET_NIP(client?.nip, "client", (data)=>{
      setEditErr( (prev)=> ({...prev, clientNIP:data?.msg}) )
      setClient( (prev)=> ({...prev, ...data[0]?.partnerData}) )
    }),
    cbVal: (val)=>{
      setClient( (prev)=> ({...prev, nip:sanitizeTxt(val, `NIP`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, clientNIP:sanitizeTxt(val, `NIP`).sanErr}))
  },
  {
    classes:"account",
    legend: tr(`AccountLegend`,lang),
    type: `text`,
    val: client?.account ? sanitizeTxt(client.account, `ACC`).sanText : '',
    err: editErr?.clientACC ?? '',
    cbVal: (val)=>{
      setClient( (prev)=> ({...prev, account:sanitizeTxt(val, `ACC`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, clientACC:sanitizeTxt(val, `ACC`).sanErr}))
  },
  {
    classes:"zip",
    legend: tr(`ZipLegend`,lang),
    type: `text`,
    val: client?.addr?.zip ? sanitizeTxt(client.addr.zip, `ZIP`).sanText : '',
    err: editErr?.clientAddrZIP ?? '',
    cbVal: (val)=>{
      setClient( (prev)=> ({...prev, addr:{...prev?.addr, zip:sanitizeTxt(val, `ZIP`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, clientAddrZIP:sanitizeTxt(val, `ZIP`).sanErr}))
  },
  {
    classes:"town",
    legend: tr(`TownLegend`,lang),
    type: `text`,
    val: client?.addr?.town ? sanitizeTxt(client.addr.town, `town`).sanText : '',
    err: editErr?.clientAddrTown ?? '',
    cbVal: (val)=>{
      setClient( (prev)=> ({...prev, addr:{...prev?.addr, town:sanitizeTxt(val, `town`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, clientAddrTown:sanitizeTxt(val, `town`).sanErr}))
  },
  {
    classes:"street",
    legend: tr(`StreetLegend`,lang),
    type: `text`,
    val: client?.addr?.street ? sanitizeTxt(client.addr.street, `StreetName`).sanText : '',
    err: editErr?.clientAddrStreet ?? '',
    cbVal: (val)=>{
      setClient( (prev)=> ({...prev, addr:{...prev?.addr, street:sanitizeTxt(val, `StreetName`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, clientAddrStreet:sanitizeTxt(val, `StreetName`).sanErr}))
  },
  {
    classes:"nr",
    legend: tr(`StreetNrLegend`,lang),
    type: `text`,
    val: client?.addr?.nr ? sanitizeTxt(client.addr.nr, `default`).sanText : '',
    err: editErr?.clientAddrNr ?? '',
    cbVal: (val)=>{
      setClient( (prev)=> ({...prev, addr:{...prev?.addr, nr:sanitizeTxt(val, `default`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, clientAddrNr:sanitizeTxt(val, `default`).sanErr}))
  },
  {
    classes:"tel",
    legend: tr(`TelLegend`,lang),
    type: `text`,
    val: client?.contacts?.tel ? sanitizeTxt(client.contacts.tel, `tel`).sanText : '',
    err: editErr?.clientContTel ?? '',
    cbVal: (val)=>{
      setClient( (prev)=> ({...prev, contacts:{...prev?.contacts, tel:sanitizeTxt(val, `tel`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, clientContTel:sanitizeTxt(val, `tel`).sanErr}))
  },
  {
    classes:"www",
    legend: tr(`WwwLegend`,lang),
    type: `text`,
    val: client?.contacts?.www ? sanitizeTxt(client.contacts.www, `www`).sanText : '',
    err: editErr?.clientContWWW ?? '',
    cbVal: (val)=>{
      setClient( (prev)=> ({...prev, contacts:{...prev?.contacts, www:sanitizeTxt(val, `www`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, clientContWWW:sanitizeTxt(val, `www`).sanErr}))
  },
  {
    classes:"email",
    legend: tr(`EmailLegend`,lang),
    type: `text`,
    val: client?.contacts?.email ? sanitizeTxt(client.contacts.email, `email`).sanText : '',
    err: editErr?.clientContEmail ?? '',
    cbVal: (val)=>{
      setClient( (prev)=> ({...prev, contacts:{...prev?.contacts, email:sanitizeTxt(val, `email`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, clientContEmail:sanitizeTxt(val, `email`).sanErr}))
  }
]

export const SellerPropses = (tr, lang, seller, setSeller, editErr, setEditErr, setSave)=> [
  {
    classes:"name",
    legend: tr(`NameLegend`,lang),
    type: `text`,
    val: seller?.name ? sanitizeTxt(seller.name, `CompanyName`).sanText : '',
    err: editErr?.sellerName ?? '',
    cbVal: (val)=>{
      setSeller( (prev)=> ({...prev, name:sanitizeTxt(val, `CompanyName`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, sellerName:sanitizeTxt(val, `CompanyName`).sanErr}))
  },
  {
    classes:"nip",
    legend: tr(`NipLegend`,lang),
    type: `text`,
    val: seller?.nip ? sanitizeTxt(seller.nip, `NIP`).sanText : '',
    err: editErr?.sellerNIP ?? '',
    isImg: seller?.nip?.length > 12 ? "Search" : false,
    imgAct: ()=> GET_NIP(seller?.nip, "seller", (data)=>{
      setEditErr( (prev)=> ({...prev, sellerNIP:data?.msg}) )
      setSeller( (prev)=> ({...prev, ...data[0]?.partnerData}) )
    }),
    cbVal: (val)=>{
      setSeller( (prev)=> ({...prev, nip:sanitizeTxt(val, `NIP`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, sellerNIP:sanitizeTxt(val, `NIP`).sanErr}))
  },
  {
    classes:"account",
    legend: tr(`AccountLegend`,lang),
    type: `text`,
    val: seller?.account ? sanitizeTxt(seller.account, `ACC`).sanText : '',
    err: editErr?.sellerACC ?? '',
    cbVal: (val)=>{
      setSeller( (prev)=> ({...prev, account:sanitizeTxt(val, `ACC`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, sellerACC:sanitizeTxt(val, `ACC`).sanErr}))
  },
  {
    classes:"zip",
    legend: tr(`ZipLegend`,lang),
    type: `text`,
    val: seller?.addr?.zip ? sanitizeTxt(seller.addr.zip, `ZIP`).sanText : '',
    err: editErr?.sellerAddrZIP ?? '',
    cbVal: (val)=>{
      setSeller( (prev)=> ({...prev, addr:{...prev?.addr, zip:sanitizeTxt(val, `ZIP`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, sellerAddrZIP:sanitizeTxt(val, `ZIP`).sanErr}))
  },
  {
    classes:"town",
    legend: tr(`TownLegend`,lang),
    type: `text`,
    val: seller?.addr?.town ? sanitizeTxt(seller.addr.town, `town`).sanText : '',
    err: editErr?.sellerAddrTown ?? '',
    cbVal: (val)=>{
      setSeller( (prev)=> ({...prev, addr:{...prev?.addr, town:sanitizeTxt(val, `town`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, sellerAddrTown:sanitizeTxt(val, `town`).sanErr}))
  },
  {
    classes:"street",
    legend: tr(`StreetLegend`,lang),
    type: `text`,
    val: seller?.addr?.street ? sanitizeTxt(seller.addr.street, `StreetName`).sanText : '',
    err: editErr?.sellerAddrStreet ?? '',
    cbVal: (val)=>{
      setSeller( (prev)=> ({...prev, addr:{...prev?.addr, street:sanitizeTxt(val, `StreetName`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, sellerAddrStreet:sanitizeTxt(val, `StreetName`).sanErr}))
  },
  {
    classes:"nr",
    legend: tr(`StreetNrLegend`,lang),
    type: `text`,
    val: seller?.addr?.nr ? sanitizeTxt(seller.addr.nr, `default`).sanText : '',
    err: editErr?.sellerAddrNr ?? '',
    cbVal: (val)=>{
      setSeller( (prev)=> ({...prev, addr:{...prev?.addr, nr:sanitizeTxt(val, `default`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, sellerAddrNr:sanitizeTxt(val, `default`).sanErr}))
  },
  {
    classes:"tel",
    legend: tr(`TelLegend`,lang),
    type: `text`,
    val: seller?.contacts?.tel ? sanitizeTxt(seller.contacts.tel, `tel`).sanText : '',
    err: editErr?.sellerContTel ?? '',
    cbVal: (val)=>{
      setSeller( (prev)=> ({...prev, contacts:{...prev?.contacts, tel:sanitizeTxt(val, `tel`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, sellerContTel:sanitizeTxt(val, `tel`).sanErr}))
  },
  {
    classes:"www",
    legend: tr(`WwwLegend`,lang),
    type: `text`,
    val: seller?.contacts?.www ? sanitizeTxt(seller.contacts.www, `www`).sanText : '',
    err: editErr?.sellerContWWW ?? '',
    cbVal: (val)=>{
      setSeller( (prev)=> ({...prev, contacts:{...prev?.contacts, www:sanitizeTxt(val, `www`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, sellerContWWW:sanitizeTxt(val, `www`).sanErr}))
  },
  {
    classes:"email",
    legend: tr(`EmailLegend`,lang),
    type: `text`,
    val: seller?.contacts?.email ? sanitizeTxt(seller.contacts.email, `email`).sanText : '',
    err: editErr?.sellerContEmail ?? '',
    cbVal: (val)=>{
      setSeller( (prev)=> ({...prev, contacts:{...prev?.contacts, email:sanitizeTxt(val, `email`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, sellerContEmail:sanitizeTxt(val, `email`).sanErr}))
  }
]

export const BuyerPropses = (tr, lang, buyer, setBuyer, editErr, setEditErr, setSave)=> [
  {
    classes:"name",
    legend: tr(`NameLegend`,lang),
    type: `text`,
    val: buyer?.name ? sanitizeTxt(buyer.name, `CompanyName`).sanText : '',
    err: editErr?.buyerName ?? '',
    cbVal: (val)=>{
      setBuyer( (prev)=> ({...prev, name:sanitizeTxt(val, `CompanyName`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, buyerName:sanitizeTxt(val, `CompanyName`).sanErr}))
  },
  {
    classes:"nip",
    legend: tr(`NipLegend`,lang),
    type: `text`,
    val: buyer?.nip ? sanitizeTxt(buyer.nip, `NIP`).sanText : '',
    err: editErr?.buyerNIP ?? '',
    cbVal: (val)=>{
      setBuyer( (prev)=> ({...prev, nip:sanitizeTxt(val, `NIP`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, buyerNIP:sanitizeTxt(val, `NIP`).sanErr}))
  },
  {
    classes:"account",
    legend: tr(`AccountLegend`,lang),
    type: `text`,
    val: buyer?.account ? sanitizeTxt(buyer.account, `ACC`).sanText : '',
    err: editErr?.buyerACC ?? '',
    cbVal: (val)=>{
      setBuyer( (prev)=> ({...prev, account:sanitizeTxt(val, `ACC`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, buyerACC:sanitizeTxt(val, `ACC`).sanErr}))
  },
  {
    classes:"zip",
    legend: tr(`ZipLegend`,lang),
    type: `text`,
    val: buyer?.addr?.zip ? sanitizeTxt(buyer.addr.zip, `ZIP`).sanText : '',
    err: editErr?.buyerAddrZIP ?? '',
    cbVal: (val)=>{
      setBuyer( (prev)=> ({...prev, addr:{...prev?.addr, zip:sanitizeTxt(val, `ZIP`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, buyerAddrZIP:sanitizeTxt(val, `ZIP`).sanErr}))
  },
  {
    classes:"town",
    legend: tr(`TownLegend`,lang),
    type: `text`,
    val: buyer?.addr?.town ? sanitizeTxt(buyer.addr.town, `town`).sanText : '',
    err: editErr?.buyerAddrTown ?? '',
    cbVal: (val)=>{
      setBuyer( (prev)=> ({...prev, addr:{...prev?.addr, town:sanitizeTxt(val, `town`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, buyerAddrTown:sanitizeTxt(val, `town`).sanErr}))
  },
  {
    classes:"street",
    legend: tr(`StreetLegend`,lang),
    type: `text`,
    val: buyer?.addr?.street ? sanitizeTxt(buyer.addr.street, `StreetName`).sanText : '',
    err: editErr?.buyerAddrStreet ?? '',
    cbVal: (val)=>{
      setBuyer( (prev)=> ({...prev, addr:{...prev?.addr, street:sanitizeTxt(val, `StreetName`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, buyerAddrStreet:sanitizeTxt(val, `StreetName`).sanErr}))
  },
  {
    classes:"nr",
    legend: tr(`StreetNrLegend`,lang),
    type: `text`,
    val: buyer?.addr?.nr ? sanitizeTxt(buyer.addr.nr, `default`).sanText : '',
    err: editErr?.buyerAddrNr ?? '',
    cbVal: (val)=>{
      setBuyer( (prev)=> ({...prev, addr:{...prev?.addr, nr:sanitizeTxt(val, `default`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, buyerAddrNr:sanitizeTxt(val, `default`).sanErr}))
  },
  {
    classes:"tel",
    legend: tr(`TelLegend`,lang),
    type: `text`,
    val: buyer?.contacts?.tel ? sanitizeTxt(buyer.contacts.tel, `tel`).sanText : '',
    err: editErr?.buyerContTel ?? '',
    cbVal: (val)=>{
      setBuyer( (prev)=> ({...prev, contacts:{...prev?.contacts, tel:sanitizeTxt(val, `tel`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, buyerContTel:sanitizeTxt(val, `tel`).sanErr}))
  },
  {
    classes:"www",
    legend: tr(`WwwLegend`,lang),
    type: `text`,
    val: buyer?.contacts?.www ? sanitizeTxt(buyer.contacts.www, `www`).sanText : '',
    err: editErr?.buyerContWWW ?? '',
    cbVal: (val)=>{
      setBuyer( (prev)=> ({...prev, contacts:{...prev?.contacts, www:sanitizeTxt(val, `www`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, buyerContWWW:sanitizeTxt(val, `www`).sanErr}))
  },
  {
    classes:"email",
    legend: tr(`EmailLegend`,lang),
    type: `text`,
    val: buyer?.contacts?.email ? sanitizeTxt(buyer.contacts.email, `email`).sanText : '',
    err: editErr?.buyerContEmail ?? '',
    cbVal: (val)=>{
      setBuyer( (prev)=> ({...prev, contacts:{...prev?.contacts, email:sanitizeTxt(val, `email`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, buyerContEmail:sanitizeTxt(val, `email`).sanErr}))
  }
]

export const DealerPropses = (tr, lang, dealer, setDealer, editErr, setEditErr, setSave)=> [
  {
    classes:"name",
    legend: tr(`NameLegend`,lang),
    type: `text`,
    val: dealer?.name ? sanitizeTxt(dealer.name, `CompanyName`).sanText : '',
    err: editErr?.dealerName ?? '',
    cbVal: (val)=>{
      setDealer( (prev)=> ({...prev, name:sanitizeTxt(val, `CompanyName`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, dealerName:sanitizeTxt(val, `CompanyName`).sanErr}))
  },
  {
    classes:"nip",
    legend: tr(`NipLegend`,lang),
    type: `text`,
    val: dealer?.nip ? sanitizeTxt(dealer.nip, `NIP`).sanText : '',
    err: editErr?.dealerNIP ?? '',
    cbVal: (val)=>{
      setDealer( (prev)=> ({...prev, nip:sanitizeTxt(val, `NIP`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, dealerNIP:sanitizeTxt(val, `NIP`).sanErr}))
  },
  {
    classes:"account",
    legend: tr(`AccountLegend`,lang),
    type: `text`,
    val: dealer?.account ? sanitizeTxt(dealer.account, `ACC`).sanText : '',
    err: editErr?.dealerACC ?? '',
    cbVal: (val)=>{
      setDealer( (prev)=> ({...prev, account:sanitizeTxt(val, `ACC`).sanText}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, dealerACC:sanitizeTxt(val, `ACC`).sanErr}))
  },
  {
    classes:"zip",
    legend: tr(`ZipLegend`,lang),
    type: `text`,
    val: dealer?.addr?.zip ? sanitizeTxt(dealer.addr.zip, `ZIP`).sanText : '',
    err: editErr?.dealerAddrZIP ?? '',
    cbVal: (val)=>{
      setDealer( (prev)=> ({...prev, addr:{...prev?.addr, zip:sanitizeTxt(val, `ZIP`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, dealerAddrZIP:sanitizeTxt(val, `ZIP`).sanErr}))
  },
  {
    classes:"town",
    legend: tr(`TownLegend`,lang),
    type: `text`,
    val: dealer?.addr?.town ? sanitizeTxt(dealer.addr.town, `town`).sanText : '',
    err: editErr?.dealerAddrTown ?? '',
    cbVal: (val)=>{
      setDealer( (prev)=> ({...prev, addr:{...prev?.addr, town:sanitizeTxt(val, `town`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, dealerAddrTown:sanitizeTxt(val, `town`).sanErr}))
  },
  {
    classes:"street",
    legend: tr(`StreetLegend`,lang),
    type: `text`,
    val: dealer?.addr?.street ? sanitizeTxt(dealer.addr.street, `StreetName`).sanText : '',
    err: editErr?.dealerAddrStreet ?? '',
    cbVal: (val)=>{
      setDealer( (prev)=> ({...prev, addr:{...prev?.addr, street:sanitizeTxt(val, `StreetName`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, dealerAddrStreet:sanitizeTxt(val, `StreetName`).sanErr}))
  },
  {
    classes:"nr",
    legend: tr(`StreetNrLegend`,lang),
    type: `text`,
    val: dealer?.addr?.nr ? sanitizeTxt(dealer.addr.nr, `default`).sanText : '',
    err: editErr?.dealerAddrNr ?? '',
    cbVal: (val)=>{
      setDealer( (prev)=> ({...prev, addr:{...prev?.addr, nr:sanitizeTxt(val, `default`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, dealerAddrNr:sanitizeTxt(val, `default`).sanErr}))
  },
  {
    classes:"tel",
    legend: tr(`TelLegend`,lang),
    type: `text`,
    val: dealer?.contacts?.tel ? sanitizeTxt(dealer.contacts.tel, `tel`).sanText : '',
    err: editErr?.dealerContTel ?? '',
    cbVal: (val)=>{
      setDealer( (prev)=> ({...prev, contacts:{...prev?.contacts, tel:sanitizeTxt(val, `tel`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, dealerContTel:sanitizeTxt(val, `tel`).sanErr}))
  },
  {
    classes:"www",
    legend: tr(`WwwLegend`,lang),
    type: `text`,
    val: dealer?.contacts?.www ? sanitizeTxt(dealer.contacts.www, `www`).sanText : '',
    err: editErr?.dealerContWWW ?? '',
    cbVal: (val)=>{
      setDealer( (prev)=> ({...prev, contacts:{...prev?.contacts, www:sanitizeTxt(val, `www`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, dealerContWWW:sanitizeTxt(val, `www`).sanErr}))
  },
  {
    classes:"email",
    legend: tr(`EmailLegend`,lang),
    type: `text`,
    val: dealer?.contacts?.email ? sanitizeTxt(dealer.contacts.email, `email`).sanText : '',
    err: editErr?.dealerContEmail ?? '',
    cbVal: (val)=>{
      setDealer( (prev)=> ({...prev, contacts:{...prev?.contacts, email:sanitizeTxt(val, `email`).sanText}}))
      setSave(true)
    },
    cbErr: (val)=> setEditErr( (prev)=> ({...prev, dealerContEmail:sanitizeTxt(val, `email`).sanErr}))
  }
]