import axios from "axios"
import { tr } from "./../../../../AppTranslate"
import { GetUser, PostToApi, TimeToObject, sanitizeTxt } from "./../../../../AppFunctions"


const lang = GetUser().lang

export const nipPropses = (nip, setNip, client, setClient, editErr, setEditErr)=>({
  classes:"nip",
  legend: tr(`NipLegend`,lang),
  plhol: tr(`NipSearchPlaceHolder`,lang),
  type: `text`,
  val: nip ? sanitizeTxt(nip, `NIP`).sanText : '',
  err: editErr?.NIP ?? '',
  isImg: nip?.length === 13 ? "Erase" : false,
  imgAct: ()=>{
    setNip( (prev)=> false )
    setClient( (prev)=> false )
    setEditErr( (prev)=> false )
  },
  cbVal: (val)=> setNip( (prev)=> sanitizeTxt(val, `NIP`).sanText ),
  cbErr: (val)=> setEditErr( (prev)=> ({...prev, NIP:sanitizeTxt(val, `NIP`).sanErr} ))
})

export const GET_NIP = (nip, client, cb)=>{

  let response = []

  PostToApi("/getOffice", { getClient:nip }, (data)=>{

    const clientData = {
      ...client,
      name: data[data?.length - 1]?.client?.name,
      nip: data[data?.length - 1]?.client?.nip,
      account: data[data?.length - 1]?.client?.account,
      addr:{
        zip: data[data?.length - 1]?.client?.addr?.zip,
        town: data[data?.length - 1]?.client?.addr?.town,
        street: data[data?.length - 1]?.client?.addr?.street,
        nr: data[data?.length - 1]?.client?.addr?.nr,
      },
      contacts: {
        tel: data[data?.length - 1]?.client?.contacts?.tel,
        www: data[data?.length - 1]?.client?.contacts?.www,
        email: data[data?.length - 1]?.client?.contacts?.email,
      }
    }

    if( data[0] ){ response.push( {msg:`bzDriveDB`, clientData} ) }

    const NIP = nip.split("-").join("")
    const date = TimeToObject(new Date( Date.now() ))
    
    axios.get(
      `https://wl-api.mf.gov.pl/api/search/nip/${NIP}?date=${date?.year}-${date?.month}-${date?.day}`
    ).then( (res)=>{

      if(res.status === 200){
        
        res = res.data.result.subject
        
        let newAddr = (res.residenceAddress ? res.residenceAddress : res.workingAddress).split(', ')
        let zip = false
        let town = false
        let street = false
        let nr = false

        if( newAddr !== "" ){
          zip = newAddr[1].slice(0, 6)
          town = newAddr[1].slice(7, newAddr[1].length)
          const parts = newAddr[0].split(' ')
          street = parts.slice(0, parts.length - 1).join(' ')
          nr = parts[parts.length - 1]
        }

        const firstToCapital = (str)=>{
          if(!str){return ""}
          if (typeof str !== 'string' || !/\w+/.test(str)) { return '' }
          let strArr = str.split(' ')
          let newStr = ""
          for(let i=0; i<strArr.length; i++){
            newStr += ` ${strArr[i].charAt(0).toUpperCase()}${strArr[i].slice(1).toLowerCase()}`
          }
          return newStr.trim()
        }
        
        const clientData = {
          ...client,
          name: firstToCapital( res.name ),
          nip: nip,
          account: res?.accountNumbers[0] ? res.accountNumbers[0] : "",
          addr:{
            zip,
            town: firstToCapital(town),
            street: street ? `ul. ${firstToCapital(street)}` : "",
            nr
          },
          regon: res?.regon,
          krs: res?.krs,
          pesel: res?.pesel,
          statusVat: res?.statusVat,
          regDate: res?.registrationLegalDate
        }

        response.push( {msg:`CEIDG`, clientData} )

        cb(response)
        return

      }
      
    })

    cb( {msg:`no ClientInfo`, carData:client} )
    return
  })

}