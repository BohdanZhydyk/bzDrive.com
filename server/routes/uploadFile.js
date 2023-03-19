const fs = require('fs')

exports.uploadFile = (req, res)=>{
  
  const file = req?.files?.file
  
  const fileAddr = __dirname + "/../public/" + req?.body?.fileAddr
  let fileName = req?.body?.fileName ?? file?.name

  fs.mkdir( fileAddr, { recursive: true }, (err)=>{

    const message = "File upload failed!"

    if(err){
      res.send({message})
      return
    }
    
    file.mv(`${fileAddr}/${fileName}`, (err)=>{

      if(err){
        res.send({message})
        return
      }

      res.status(200).send({
        name:fileName,
        size:file.size,
        mimetype:file.mimetype
      })

    })

  })

}