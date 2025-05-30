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

// app.get('/sitemap.xml', (req, res) => { res.sendFile(resolve(__dirname, 'public', 'sitemap.xml')) })

app.use( '/API', Router )


const PORT = 2000;
app.listen(PORT, () => {
  const DT = unixToDateTimeConverter()
  const txt1 = `API started on PORT ${PORT}`
  const txt2 = `${DT?.year}/${DT?.month}/${DT?.day}-${DT?.hour}:${DT?.min}:${DT?.sec}`
  console.log(`${txt1} - ${txt2}`)
})

// TODO 1 moderate severity vulnerability
// TODO (node:9528) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.