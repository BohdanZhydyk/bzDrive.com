const fs = require('fs')

exports.deleteFolder = (req, res) => {

  const folderAddr = __dirname + "/../public/" + req?.body?.folderAddr

  fs.rm(folderAddr, { recursive: true, force: true }, (err) => {
    if (err) {
      res.send({ message: `Error deleting folder: ${err}` })
      return
    }

    let message = `Folder ${folderAddr} deleted successfully!`
    res.status(200).send({ message })
  })
}