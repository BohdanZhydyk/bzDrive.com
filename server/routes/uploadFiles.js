const fs = require('fs')
const path = require('path')
const { generateID } = require('../safe/safe')

exports.uploadFiles = (req, res) => {

  const message = "File upload failed!"

  const filesArr = [].concat(req.files?.files || [])
  const namesArr = [].concat(req.body.filesName || [])
  
  const relAddr = req.body.fileAddr || ""
  const fileAddr = path.join(__dirname, "../public", relAddr)

  if (!filesArr.length) return res.send({ message })

  fs.mkdir(fileAddr, { recursive: true }, (err) => {
    if (err) return res.send({ message })

    Promise.all(filesArr.map((file, i) => {
      const fileName = namesArr[i] || file.name
      return new Promise((resolve, reject) => {
        file.mv(path.join(fileAddr, fileName), (err) => {
          if (err) reject(err)
          else resolve({
            fileID: generateID(),
            name: fileName,
            size: file.size,
            mimetype: file.mimetype,
            link: `/${relAddr ? relAddr + '/' : ''}${encodeURIComponent(fileName)}`
          })
        })
      })
    }))
      .then(results => res.status(200).send(results))
      .catch(() => res.send({ message }))
  })

}
