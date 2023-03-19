const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')
const bodyParser = require('body-parser')
const Router = require('./routes/Routes')


const app = express()
app.use( cors() )
app.use( express.json() )
app.use( fileupload() )

app.get( '/*', (req, res) => res.sendFile( __dirname + "/public/index.html" ) )

app.use( '/API', Router )


const PORT = 2000;
app.listen(PORT, () => {
  console.log(`API started on PORT ${PORT}`);
})