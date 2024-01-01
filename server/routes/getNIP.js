const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const axios = require('axios')
const { CEIDG_JWT_Token } = require('./../safe/safe')


exports.getNIP = async (req, res)=>{
  
  const object = req?.body?.object
  const nip = object?.nip
  const partner = object?.partner

  let partners = []
  
  const NIP = nip.split("-").join("")

  const query = (partner)=>{
    switch(partner){
      case "client": return {"client.nip":nip}
      case "seller": return {"seller.nip":nip}
      default: return {"dealer.nip":nip}
    }
  }

  bzDB( { req, res, col:'bzDocuments', act:"FIND", query:query(partner) }, (partnerData)=>{

    if(partnerData?.result?.length > 0){
      partners.push( {msg:`bzDriveDB`, partnerData: partnerData?.result[0][partner]} )
    }

    const CEIDGlink = `https://dane.biznes.gov.pl/api/ceidg/v2/firma?nip=${NIP}`
    const headers = { headers: { Authorization: `Bearer ${CEIDG_JWT_Token}` } }

    axios.get( CEIDGlink, headers ).then((response)=>{

      if(response?.data?.firma?.length > 0){

        const firm = response?.data?.firma[0]
        const name = firm?.nazwa
        const nip = firm?.wlasciciel?.nip
        const regon = firm?.wlasciciel?.regon

        const addr = firm?.adresKorespondencyjny
        const zip = addr?.kod
        const town = addr?.miasto
        const street = addr?.ulica
        const nr = `${addr?.budynek}${addr?.lokal ? `/${addr?.lokal}` : ``}`

        const partnerCEIDG = { name, nip, regon, addr:{zip, town, street, nr} }

        partners.push( {msg:`CEIDG`, partnerData: partnerCEIDG} )
      }

      res.send({ ...partnerData, result: partners })
    })

  })

  return

}