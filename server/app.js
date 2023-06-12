const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')
const bodyParser = require('body-parser')
const Router = require('./routes/Routes')
const { unixToDateTimeConverter } = require('./functions')


const app = express()
app.use( cors() )
app.use( express.json() )
app.use( fileupload() )

app.use( bodyParser.urlencoded({ extended: true }) )
app.use( express.static('public') )
app.use( '/files', express.static('files') )

app.get( '/*', (req, res) => res.sendFile( __dirname + "/public/index.html" ) )

app.use( '/API', Router )


const PORT = 2000;
app.listen(PORT, () => {
  let DT = unixToDateTimeConverter()
  let txt = `API started on PORT ${PORT} - ${DT.hour}:${DT.min}:${DT.sec}-${DT.day}/${DT.month}/${DT.year}`
  console.log(txt)
})