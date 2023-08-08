const fs = require('fs')

exports.deleteFile = (req, res)=>{
  
  const fileAddr = __dirname + "/../public/" + req?.body?.fileAddr
  const fileName = req?.body?.fileName
  const linkToFile = `${fileAddr}/${fileName}`

  fs.stat(linkToFile, (err, stats)=>{

    // console.log(stats) //here we got all information of file in stats variable

    if(err){
      res.send({ message:`Error deleting file: ${err}`, stats })
      return
    }

    fs.unlink(linkToFile, (err)=>{

      if(err){
        res.send({ message:`Error deleting file: ${err}`, stats })
        return
      }

      let message = `File ${linkToFile} deleted successfully!`

      res.status(200).send({ message, stats })
      return

    })

  })

}