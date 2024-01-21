
let clients = []

// console.log("cli", clients?.length)

exports.subscribe = (req, res, msgsData)=>{

  clients.push(res)

}

exports.publish = (req, res, msgsData)=>{

  clients.forEach( (res)=>{
    res.send({ ...msgsData, result:msgsData?.result.sort((a, b) => a.id - b.id) })
  })

  clients = []
}