const { MongoClient, ObjectId } = require('mongodb')
const { bzDB } = require('./bzDB')
const { enCrypt, deCrypt } = require('../safe/safe')


exports.getPass = (req, res)=>{

  const bzToken = req?.body?.bzToken
  const object = req?.body?.object

  bzDB( { req, res, col:'bzTokens', act:"FIND_ONE", query:{bzToken} }, (userData)=>{

    const login = userData?.result?.user?.login

    // get passwords
    if(object?.getPass){

      bzDB( { req, res, col:'bzPass', act:"FIND", query:{user:login} }, (getPassData)=>{
        res.send({
          ...getPassData,
          result: getPassData?.result?.map(el=> ({
            ...el,
            siteData: el?.siteData?.map( pass=>({
              userName: pass?.userName,
              login: pass?.login,
            }))
          }))
        })
        return
      })

    }

    // show password
    if(object?.showPass){

      const _id = ObjectId(object?.query?._id)
      const l = object?.query?.l

      bzDB( { req, res, col:'bzPass', act:"FIND_ONE", query:_id }, (getPassData)=>{

        const pass = getPassData?.result?.siteData[l]?.pass
        const decryptedPass = pass?.length > 0 ? deCrypt(pass) : ""

        res.send({...getPassData, result: decryptedPass})
        return
      })

    }

    // save password
    if(object?.savePass){

      const _id = ObjectId(object?.query?._id)

      bzDB( { req, res, col:'bzPass', act:"FIND_ONE", query:_id }, (passData)=>{

        const pass = {
          user: object?.query?.user ?? login,
          group: object?.query?.group,
          siteName: object?.query?.siteName,
          link: object?.query?.link,
          info: object?.query?.info,
          siteData: object?.query?.siteData?.map( (el, n)=>({
            userName: el?.userName,
            login: el?.login,
            pass: (el?.pass && el?.encrypted) ? enCrypt(el?.pass) : passData?.result?.siteData[n]?.pass
          }))
        }

        const _id = ObjectId(passData?.result?._id)
        const act = passData?.result ? "UPDATE_ONE" : "INSERT_ONE"
        const query = passData?.result ? {...pass, _id} : pass

        bzDB( { req, res, col:'bzPass', act, query}, (updatedPassData)=>{

          bzDB( { req, res, col:'bzPass', act:"FIND", query:{user:login} }, (getPassData)=>{
            res.send({...getPassData, result: getPassData?.result})
            return
          })

        })

      })

    }

  })

}