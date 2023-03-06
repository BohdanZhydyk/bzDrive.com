const { bzDB } = require('./bzDB')


exports.getOffice = (req, res)=>{

  bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{user:false} }, (userData)=>{

    const login = userData?.user?.login
    const object = req.body.object

    // getting information about available companies
    if(object?.getCompany){
      const query = {
        $or: [
          { "director": login },
          { "personnel.accountants": login },
          { "personnel.workers": login }
        ]
      }
      bzDB( { req, res, col:'companies', act:"FIND", query }, (userData)=>{

        const data = userData?.result

        const userDirector = data.filter(d => d.director === login)
        const userNotDirector = data.filter(d => d.director !== login)

        const sortedData = userDirector.sort((a, b) => {
          if (a.director > b.director) return 1
          if (a.director < b.director) return -1
          return 0
        })

        const finalData = sortedData.concat(userNotDirector)

        res.send({
          ...userData,
          result: finalData
        })

      })
    }

    // getting information about orders
    if(object?.getOrders){

      const query = object?.query
      bzDB( { req, res, col:'bzDocuments', act:"FIND", query }, (userData)=>{

        res.send({
          ...userData,
          result: userData?.result
        })

      })
    }

  })

}