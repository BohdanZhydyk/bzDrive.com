const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const { generateArticleNr } = require('../safe/safe')


exports.getStore = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object
  const id = object?.articleID

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
    bzDB( { req, res, col:'bzStoreArt', act:"FIND_ONE", query:{id} }, (articlesData)=>{

      const newArticle = {
        "id": generateArticleNr(),
        "lastModify": Date.now()
      }

      id !== "new"
      ? res.send({ ...articlesData, result: articlesData?.result })
      : res.send({ ...articlesData, result:newArticle })

      return
    })
  }

  bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{bzToken} }, (userData)=>{

    const login = userData?.result?.user?.login

    // add articles to cart
    if(object?.addToCart){
  
      const ID = object?.ID
      const qua = object?.qua
      
      bzDB( { req, res, col:'bzStoreArt', act:"FIND_ONE", query:{ID} }, (articlesData)=>{

        const result = articlesData?.result
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

                  bzDB( { req, res, col:'bzStoreArt', act:"FIND", query:{} }, (articlesData)=>{

                    const articles = articlesData?.result
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

    // add articles to cart
    if(object?.getQuantities){

      function fetchQuantity(art, callback) {
        bzDB({ req, res, col:'bzStoreArt', act:'FIND_ONE', query:{ID:art?.ID} }, (articlesData)=>{
          callback({...art, QUA:articlesData?.result?.QUA})
        })
      }

      let remaining = object.cart.length
      const updatedCart = []

      object.cart.forEach((art)=>{
        fetchQuantity(art, (updatedArt)=>{
          updatedCart.push(updatedArt)
          remaining--

          if(remaining === 0){
            res.send({ ...userData, result:updatedCart })
            return
          }
        })
      })
    }
    
  })

}