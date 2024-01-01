const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const axios = require('axios')
const { AutoDevApiKey } = require('./../safe/safe')


exports.getVIN = async (req, res)=>{

  const object = req?.body?.object
  const vin = object?.vin

  let cars = []

  const query = {"car.vin":vin}
    bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (carData)=>{

      if(carData?.result?.length > 0){
        cars.push({
          msg:`bzDriveDB`,
          carData: {
            brand:    carData?.result[0]?.car?.brand,
            model:    carData?.result[0]?.car?.model,
            prod:     carData?.result[0]?.car?.prod,
            engine:   carData?.result[0]?.car?.engine,
            numbers:  carData?.result[0]?.car?.numbers,
            color:    carData?.result[0]?.car?.color
          }
        })
      }

      // let link = `https://www.decodethis.com/webservices/decodes/${vin}/xB6xzN1vUA-dXdL41EZf/1.json`
      // let link = `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${vin}?format=json` //Nhtsa
      // let link = `https://api.vindecoder.eu/3.2`

      const AutoDevLink = `https://auto.dev/api/vin/${vin}?apikey=${AutoDevApiKey}`

      axios.get( AutoDevLink ).then((AutoDevRes)=>{ // FREE = 5,000 API calls/mo
        
        const RES = AutoDevRes?.data

        if(!RES?.status && RES?.status !== "NOT FOUND"){

          const brand = RES?.make?.name
          const model = RES?.model?.name
          const prod = RES?.years ? RES?.years[0]?.year : false
          const size = RES?.engine?.size ? `${RES.engine.size}L` : ``
          const code = RES?.engine?.manufacturerEngineCode ? `_${RES.engine.manufacturerEngineCode}` : ``
          const hp = RES?.engine?.horsepower ? `_${parseInt((RES.engine.horsepower * 0.74).toFixed(2))}kW` : ``
          const drive = ()=>{
            switch(RES?.drivenWheels){
              case "four wheel drive": return "4WD"
              case "all wheel drive": return "AWD"
              case "front wheel drive": return "FWD"
              case "rear wheel drive": return "RWD"
              default: return RES?.drivenWheels
            }
          }
          const engine = `${size}${code}${hp}${drive() ? `_${drive()}` : ``}`
          const carData = { brand, model, prod, engine }
          
          cars.push( {msg:`auto.dev`, carData} )
          
        }

        res.send({ ...carData, result: cars })

      })

    })

  return

}