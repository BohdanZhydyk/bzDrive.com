const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const { generateArticleNr } = require('../safe/safe')


exports.getStore = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object
  const login = object?.login
  const ID = object?.articleID

  const findBy = login ?? bzToken

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

  bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{bzToken} }, (userData)=>{

    const user = userData?.result?.user
    const isAdmin = user?.role === "admin"

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
    
  })

}