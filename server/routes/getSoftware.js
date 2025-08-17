const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const { generateArticleNr, PayU } = require('../safe/safe')

const axios = require('axios')


exports.getSoftware = async (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object
  const login = object?.login
  const ID = object?.articleID

  const findBy = login ?? bzToken

  // getting CarCards
  if(object?.getCarCards){

    const { id } = object

    if(!id){
      bzDB( { req, res, col:'bzDocuments', act:"FIND", query:{ "soft": { $exists: true, $ne: null } } }, (swData)=>{

        const result = swData?.result.map( el=>{
          const car = {
            docID: el?._id,
            brand: el?.car?.brand,
            model: el?.car?.model,
            engine: el?.car?.engine,
            vin: el?.car?.vin
          }
          return el?.soft.map(sw => ({
            ...car,
            ...{
              id: sw?.id,
              ECUType: sw?.ECUType,
              swVersion: sw?.swVersion,
              hwVersion: sw?.hwVersion,
              programmer: sw?.programmer,
              mod: sw?.mod,
              readMethod: sw?.readMethod,
              swType: sw?.swType
            }
          }))
        })

        res.send({ ...swData, result: result.flat() })
        return

      })
    }
    else{

      bzDB( { req, res, col:'bzDocuments', act:"FIND_ONE", query:{ "soft": { $elemMatch: { id } } } }, (swData)=>{

        res.send({
          ...swData,
          result: {
            doc: {
              _id: swData?.result?._id,
              from: swData?.result?.nr?.from,
              sign: swData?.result?.nr?.sign,
              mode: swData?.result?.nr?.mode
            },
            car: {
              brand: swData?.result?.car?.brand,
              model: swData?.result?.car?.model,
              engine: swData?.result?.car?.engine,
              vin: swData?.result?.car?.vin
            },
            soft: swData?.result?.soft.filter( el=> el?.id === id)
          }
        })
        return
      })
    }

  }

  // getting articles
  if(object?.getArticles){
    bzDB( { req, res, col:'bzStoreArt', act:"FIND", query:{} }, (articlesData)=>{

      bzDB( { req, res, col:'bzStoreCart', act:"FIND_ONE", query:{bzToken} }, (cartData)=>{

        const articles = articlesData?.result
        const cart = cartData?.result?.articles

        res.send({ ...cartData, result:{articles, cart} })
        return
      })

    })
  }

  // getting article by articleID
  if(object?.getArticle){
    bzDB( { req, res, col:'bzStoreArt', act:"FIND_ONE", query:{ID} }, (articleData)=>{

      articleData?.result
      ? res.send({ ...articleData, result: articleData?.result })
      : res.send({ ...articleData, result:{ID: generateArticleNr(), LMO: Date.now()} })

      return
    })
  }

  // search software
  if(object?.searchSoftware){
    
    const search = object?.search

    let query = {
      $and: [
        { "soft": { $exists: true, $ne: null } },
        {
          $or: search.split(/[,\s]+/).map(term => term.trim()).map(term => {
            const normalizeTerm = t => t.normalize("NFD").replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l').replace(/Ł/g, 'L')
            term = normalizeTerm(term.trim())
            const regex = { $regex: term, $options: 'i' }
            const numberRegex = { $regex: term.replace(/[-\s]/g, '').split('').join('[-\\s]?'), $options: 'i' }
            return {
              $or: [
                { "car.brand": regex },
                { "car.model": regex },
                { "car.engine": regex },
                { "files": { $elemMatch: { "fileName": regex } } },
                { "soft": { $elemMatch: { "id": regex } } },
                { "soft": { $elemMatch: { "ECUType": regex } } },
                { "soft": { $elemMatch: { "hwVersion": regex } } },
                { "soft": { $elemMatch: { "swVersion": regex } } },
                { "soft": { $elemMatch: { "programmer": regex } } },
                { "soft": { $elemMatch: { "ECUType": regex } } }
              ]
            }
          })
        }
      ]
    }
    
    bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (swData)=>{

      const result = swData?.result.map( el=>{
        const car = {
          docID: el?._id,
          brand: el?.car?.brand,
          model: el?.car?.model,
          engine: el?.car?.engine,
          vin: el?.car?.vin
        }
        return el?.soft.map(sw => ({
          ...car,
          ...{
            id: sw?.id,
            ECUType: sw?.ECUType,
            swVersion: sw?.swVersion,
            hwVersion: sw?.hwVersion,
            programmer: sw?.programmer,
            mod: sw?.mod,
            readMethod: sw?.readMethod,
            swType: sw?.swType
          }
        }))
      })

      res.send({
        ...swData,
        result: result.flat()
          .sort((a, b) => String(a.docID).localeCompare(String(b.docID)))
      })
    
      return
    
    })

  }

  bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{bzToken} }, (userData)=>{

    const user = userData?.result?.user
    const isAdmin = user?.role === "admin"
    
    // saving CarCard
    if(isAdmin && object?.saveCarCard){
      
      const newCarData = object?.car
      const _id = ObjectId(newCarData?._id)
  
      bzDB( { req, res, col:'bzSoftware', act:"FIND_ONE", query:{_id} }, (swData)=>{

        if(swData?.result){
          bzDB( { req, res, col:'bzSoftware', act:"UPDATE_ONE", query:{...newCarData, _id} }, (updatedData)=>{
            bzDB( { req, res, col:'bzSoftware', act:"FIND_ONE", query:{_id} }, (swNewData)=>{
              res.send({ ...swNewData, result: swNewData?.result })
              return
            })
          })
        }
        else{
          bzDB( { req, res, col:'bzSoftware', act:"INSERT_ONE", query:{...newCarData} }, (insertedData)=>{
            res.send({ ...insertedData, result: insertedData?.result?.insertedId })
            return
          })
        }

      })
  
    }

    // add articles to cart
    if(object?.addToCart){
  
      const ID = object?.ID
      const qua = object?.qua
      
      bzDB( { req, res, col:'bzStoreArt', act:"FIND_ONE", query:{ID} }, (articleData)=>{

        const result = articleData?.result
        const QUA = result?.QUA
        const ART = result?.ART
        const PRI = result?.PRI
        
        if(QUA >= qua){

          const _id = ObjectId(result?._id)
          const newQUA = QUA - qua
          const query = {QUA:newQUA, _id}

          bzDB( { req, res, col:'bzStoreArt', act:"UPDATE_ONE", query }, (updatedCartData)=>{

            const query = {bzToken}

            bzDB( { req, res, col:'bzStoreCart', act:"FIND_ONE", query }, (cartData)=>{

              const result = cartData?.result
              const _id = ObjectId(result?._id)

              function groupedCart(newCart){
                return newCart
                ?
                newCart.reduce((result, item) => {
                  const existingItem = result.find(i => i.ID === item.ID)
                  existingItem ? existingItem.qua += item.qua : result.push({ ...item })
                  return result
                }, [])
                : []
              }

              const act = result ? "UPDATE_ONE" : "INSERT_ONE"
              const query = result
                ? {...result, LMO:Date.now(), articles:groupedCart([...result?.articles, {ID, ART, PRI, qua}]), _id}
                : { bzToken, LMO:Date.now(), articles:[{ID, ART, PRI, qua}] }

              bzDB( { req, res, col:'bzStoreCart', act, query }, (updatedCartData)=>{

                bzDB( { req, res, col:'bzStoreCart', act:"FIND_ONE", query:{bzToken} }, (newCartData)=>{

                  bzDB( { req, res, col:'bzStoreArt', act:"FIND", query:{} }, (articleData)=>{

                    const articles = articleData?.result
                    const cart = newCartData?.result?.articles

                    res.send({ ...cartData, result:{articles, cart} })
                    return

                  })

                })

              })

            })
          })
        }
        else{
          return "niema towaru! ktos wczesniej zabral!"
        }
        
      })
    }

    // get quantities of articles in cart
    if (object?.getQuantities) {

      async function fetchQuantities(cart){
        const promises = cart.map((art)=>{
          return new Promise((resolve)=>{
            bzDB({ req, res, col:'bzStoreArt', act:'FIND_ONE', query:{ID:art?.ID} }, (articlesData)=>{
              resolve({ ...art, QUA:articlesData?.result?.QUA })
            })
          })
        })
    
        const updatedCart = await Promise.all(promises)

        res.send({ ...userData, result:updatedCart })

      }
    
      object?.cart
      ? fetchQuantities(object?.cart)
      : res.send({ ...userData, result:[] })

      return
    }

    // save article in db
    if(isAdmin && object?.saveArticle){

      const art = object?.art
      const {ID, LMO, CAT, ART, PRI, QUA, IMG, DSC} = art
      
      bzDB({ req, res, col:'bzStoreArt', act:'FIND_ONE', query:{ID:art?.ID} }, (articleData)=>{
        const result = articleData?.result
        const _id = ObjectId(result?._id)

        const act = result ? "UPDATE_ONE" : "INSERT_ONE"
        const query = result
          ? { ID, LMO:Date.now(), CAT, ART, PRI, QUA, IMG, DSC, _id }
          : { ID:generateArticleNr(), LMO:Date.now(), CAT, ART, PRI, QUA, IMG, DSC }

        bzDB( { req, res, col:'bzStoreArt', act, query }, (updatedArtData)=>{

          bzDB( { req, res, col:'bzStoreArt', act:"FIND", query:{} }, (articlesData)=>{

            bzDB( { req, res, col:'bzStoreCart', act:"FIND_ONE", query:{bzToken} }, (cartData)=>{
      
              const articles = articlesData?.result
              const cart = cartData?.result?.articles
      
              res.send({ ...cartData, result:{articles, cart} })
              return
            })
      
          })

        })
      })
    }

    // buy Software
    if (object?.buySoftware) {

      const { id, lang, price } = object

      const OAUTH_CLIENT_ID = PayU?.OAUTH_CLIENT_ID
      const OAUTH_CLIENT_SECRET = PayU?.OAUTH_CLIENT_SECRET
      const PAYU_URL = PayU?.PAYU_URL

      // 1. Uzyskaj token dostępu OAuth
      axios.post(`${PAYU_URL}/pl/standard/user/oauth/authorize`, 
        `grant_type=client_credentials&client_id=${OAUTH_CLIENT_ID}&client_secret=${OAUTH_CLIENT_SECRET}`, 
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      )
      .then(authResponse => {
          const accessToken = authResponse.data.access_token
          const IP = req?.body?.IP?.ip
          const sum = price * 100

          const url = `${req?.body?.IP?.host === "localhost" ? `http://localhost:3000` : `https://bzdrive.com`}/softpage/${id}`

          // 2. Stwórz zamówienie w PayU
          return axios.post(`${PAYU_URL}/api/v2_1/orders`, {
            continueUrl: url, // URL po zakończeniu płatności
            customerIp: IP,
            merchantPosId: OAUTH_CLIENT_ID,
            description: `Software ID: ${id}`,
            currencyCode: 'PLN',
            totalAmount: sum, // Kwota w groszach
            buyer: { email: 'klient@example.com', language: lang },
            products: [{ name: 'Oprogramowanie', unitPrice: sum, quantity: 1 }]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`
            }
          })
      })
      .then(paymentResponse => {

        const redirectUrl = paymentResponse?.request?.res?.responseUrl
        const urlParams = new URLSearchParams(redirectUrl.split('?')[1])
        const orderId = urlParams.get('orderId')

        // Zwróć URL do przekierowania do PayU
        bzDB( { req, res, col:'bzPayU', act:"INSERT_ONE", query:{bzToken, orderId, softwareId:id} }, (insertedData)=>{
          res.send({ ...userData, result:redirectUrl })
          return
        })

      })
      .catch(error => {
          console.error("Error in buying software:", error)
          res.status(500).json({ error: "Wystąpił błąd podczas zakupu oprogramowania." })
      })
    }
    
  })

}