const { MongoClient, ObjectId } = require('mongodb')

const { url, dbName, generateToken } = require('./../safe/safe')
const { unixToDateTimeConverter } = require('./../functions')


exports.bzDB = ( { req, res, col, act, query, sort = {_id:-1}, lim = 0 }, callback )=>{
  // req,       request
  // res,       response
  // col,       name of db collection
  // act,       action FIND, FIND_ONE, ...
  // query,     query of search
  // sort       sort of search
  // lim        limit of results
  // callback   callback function

  let bzToken =   req?.body?.bzToken  ? req.body.bzToken  : generateToken()
  let IP =        req?.body?.IP       ? req.body.IP       : false
  let user =      req?.body?.user     ? req.body.user     : false

  const client = new MongoClient(url, { useUnifiedTopology: true })
  
  const ERR = (bzToken, IP, user, error)=> {
    callback({bzToken, IP, user, object:{result:false, errors:error}})
    // client.close()
  }
  const OK = (bzToken, IP, user, result)=> {
    callback({bzToken, IP, user, object:{result:result, errors:false}})
    // client.close()
  }

  client.connect( (error) => {

    error && ERR(bzToken, IP, user, error)

    CheckToken(bzToken, (ChekTokenData)=>{

      const Done = (bzToken, IP, user)=>{
        Queries(bzToken, IP, user)
        Statistic(bzToken, IP, user)
      }
  
      if(!ChekTokenData){ Done(generateToken(), IP, false); return; }
      
      CheckRole(user?.login, (CheckRoleData)=>{
        if(!CheckRoleData){ Done(bzToken, IP, user); return; }
        Done(bzToken, IP, CheckRoleData)
      })

    })

    function Queries(bzToken, IP, user){

      const CB = (error, result)=> error ? ERR(bzToken, IP, user, error) : OK(bzToken, IP, user, result)
      
      switch(act){
        case "FIND":          FIND();         break
        case "FIND_ONE":      FIND_ONE();     break
        case "INSERT_ONE":    INSERT_ONE();   break
        case "UPDATE_ONE":    UPDATE_ONE();   break
        case "DELETE_ONE":    DELETE_ONE();   break
        case "DELETE_MANY":   DELETE_MANY();  break
        default: break
      }
      
      function FIND(){
        client.db(dbName).collection(col).find(query).sort(sort).limit(lim).toArray( (e,r)=> CB(e,r) )
      }
      function FIND_ONE(){
        client.db(dbName).collection(col).findOne( query, (e,r)=> CB(e,r) )
      }
      function INSERT_ONE(){
        client.db(dbName).collection(col).insertOne( query, (e,r)=> CB(e,r) )
      }
      function UPDATE_ONE(){
        let _id = query._id; let $set = query; let upsert = true
        client.db(dbName).collection(col).updateOne({_id},{$set},{upsert},(e,r)=> CB(e,r) )
      }
      function DELETE_ONE(){
        client.db(dbName).collection(col).deleteOne( query, (e,r)=> CB(e,r) )
      }
      function DELETE_MANY(){
        client.db(dbName).collection(col).deleteMany( query, (e,r)=> CB(e,r) )
      }

    }

    function CheckToken(bzToken, CheckTokenCallback){
      client.db(dbName)
        .collection('bzStatistic')
        .findOne( {bzToken}, (error, result)=>{
          error && ERR(bzToken, IP, user, error)
          CheckTokenCallback(result)
      })
    }

    function CheckRole(login, CheckRoleCallback){
      client.db(dbName)
        .collection('bzUsers')
        .findOne( {login}, (error, result)=>{
          let userResult = {
            login:  result?.login,
            role:   result?.role,
            email:  result?.email,
            lang:   result?.lang,
            sex:    result?.sex,
            ava:    result?.ava
          }
          error && ERR(bzToken, IP, userResult, error)
          CheckRoleCallback(userResult)
      })
    }

    function Statistic(bzToken, IP, user){
      let date = { unix: Date.now(), dateTime: unixToDateTimeConverter() }
      client.db(dbName)
        .collection('bzStatistic')
        .insertOne( {user:user.login, IP, date, bzToken}, (error, result)=>{
          error && ERR(bzToken, IP, user, error)
      })
    }

  })
  
}