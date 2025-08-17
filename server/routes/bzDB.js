const { MongoClient, ObjectId } = require('mongodb')

const { url, dbName, tokenLifetime, generateToken } = require('./../safe/safe')
const { unixToDateTimeConverter } = require('./../functions')


exports.bzDB = ( { req, res, col, act, query, sort = {_id:-1}, lim = 0, pipeline }, callback )=>{
  // req,       request
  // res,       response
  // col,       name of db collection
  // act,       action FIND, FIND_ONE, ...
  // query,     query of search
  // sort       sort of search
  // lim        limit of results
  // pipeline
  // callback   callback function

  let bzToken = req?.body?.bzToken ? req.body.bzToken : generateToken()
  let IP =      req?.body?.IP      ? req.body.IP      : false
  let user =    req?.body?.user    ? req.body.user    : false

  const client = new MongoClient(url)
  
  const ERR = (bzToken, IP, user, errors)=> callback({bzToken, IP, user, errors}) // client.close()
  const OK = (bzToken, IP, user, result)=> callback({bzToken, IP, user, result}) // client.close()

  client.connect( (errors) => {

    errors && ERR(bzToken, IP, user, errors)

    CheckToken(bzToken, (ChekTokenData)=>{

      const Done = (bzToken, IP, user)=>{
        Queries(bzToken, IP, user)
        Statistic(bzToken, IP, user)
      }
  
      if(!ChekTokenData){
        Done(bzToken, IP, user)
        return
      }

      // if the token is older than "tokenLifetime", generate a new one
      const isOlder = (Date.now() - ChekTokenData?.time) > tokenLifetime
      if(isOlder){
        Done( generateToken(), IP, "RELOAD_APP" )
        return
      }

      Done(bzToken, IP, ChekTokenData?.user)

    })

    function Queries(bzToken, IP, user){

      const CB = (errors, result)=>{
        errors
        ? ERR(bzToken, IP, user, errors)
        : OK(bzToken, IP, user, result)
      }
      
      switch(act){
        case "FIND":          FIND();         break
        case "FIND_ONE":      FIND_ONE();     break
        case "INSERT_ONE":    INSERT_ONE();   break
        case "INSERT_MANY":   INSERT_MANY();  break
        case "UPDATE_ONE":    UPDATE_ONE();   break
        case "DELETE_ONE":    DELETE_ONE();   break
        case "DELETE_MANY":   DELETE_MANY();  break
        case "AGGREGATE":     AGGREGATE();    break
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
      function INSERT_MANY() {
        client.db(dbName).collection(col).insertMany( query, (e, r) => CB(e, r) );
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
      function AGGREGATE() {
        client.db(dbName).collection(col).aggregate(pipeline).toArray((e, r) => CB(e, r))
      }

    }

    function CheckToken(bzToken, CheckTokenCallback){
      client.db(dbName)
        .collection('bzTokens')
        .findOne( {bzToken}, (errors, result)=>{
          errors && ERR(bzToken, IP, user, errors)
          CheckTokenCallback(result)
      })
    }

    function Statistic(bzToken, IP, user){

      if(IP?.host === "localhost") return
    
      const unix = Date.now()
      const db = client.db(dbName)
      const path = IP?.from || ''
      const login = user?.login || '__anonymous__'
      const ip = IP?.ip || '__unknown_ip__'

      
      // 1. Zapis do starej kolekcji
      let date = { unix: Date.now(), dateTime: unixToDateTimeConverter() }
      db.collection('bzStatisticOld').insertOne({ user: login, IP, date, bzToken }, (errors) => {
        if (errors) ERR(bzToken, IP, user, errors)
      })

      db.collection('bzStatistic').findOne({ 'IP.ip':ip }, (err, existing)=>{
        if(err) return ERR(bzToken, IP, user, err)
    
        if(!existing) {
          db.collection('bzStatistic').insertOne({
            IP, logins:[{ user:login, lastUnix:unix, links:[{ path, count:1 }] }]
          }, (e)=> e && ERR(bzToken, IP, user, e) )
        }
        else {
          const loginIndex = existing.logins.findIndex(l => l.user === login)
          if(loginIndex === -1){
            db.collection('bzStatistic').updateOne(
              { 'IP.ip':ip },
              { $push:{ logins:{ user:login, lastUnix:unix, links:[{ path, count:1 }] } } },
              (e) => e && ERR(bzToken, IP, user, e)
            )
          }
          else{
            const linkIndex = existing.logins[loginIndex].links.findIndex(l => l.path === path)
    
            if(linkIndex === -1){
              db.collection('bzStatistic').updateOne(
                { 'IP.ip':ip, [`logins.${loginIndex}.user`]: login },
                {
                  $set: { [`logins.${loginIndex}.lastUnix`]: unix },
                  $push: { [`logins.${loginIndex}.links`]: { path, count:1 } }
                },
                (e) => e && ERR(bzToken, IP, user, e)
              )
            }
            else{
              db.collection('bzStatistic').updateOne(
                {
                  'IP.ip':ip,
                  [`logins.${loginIndex}.user`]:login,
                  [`logins.${loginIndex}.links.${linkIndex}.path`]:path
                },
                {
                  $set: { [`logins.${loginIndex}.lastUnix`]:unix },
                  $inc: { [`logins.${loginIndex}.links.${linkIndex}.count`]:1 }
                },
                (e) => e && ERR(bzToken, IP, user, e)
              )
            }
          }
        }
      })
    }

  })
  
}