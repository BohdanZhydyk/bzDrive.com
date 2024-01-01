const express = require('express')
const Router = express.Router()


const { getState }	    = require('./getState')
const { getAuth }		    = require('./getAuth')
const { getWorkshop }		= require('./getWorkshop')
const { getOffice }			= require('./getOffice')
const { getPass }				= require('./getPass')
const { getStore }			= require('./getStore')
const { getNIP }			  = require('./getNIP')
const { getVIN }			  = require('./getVIN')
const { uploadFile }		= require('./uploadFile')
const { deleteFile }		= require('./deleteFile')

Router.post('/getState', 		(req, res)=> getState(req, res)     )
Router.post('/getAuth',     (req, res)=> getAuth(req, res)      )
Router.post('/getWorkshop', (req, res)=> getWorkshop(req, res) 	)
Router.post('/getOffice', 	(req, res)=> getOffice(req, res) 		)
Router.post('/getPass', 		(req, res)=> getPass(req, res) 			)
Router.post('/getStore', 	  (req, res)=> getStore(req, res) 	  )
Router.post('/getNIP',      (req, res)=> getNIP(req, res)       )
Router.post('/getVIN',      (req, res)=> getVIN(req, res)       )
Router.post('/uploadFile', 	(req, res)=> uploadFile(req, res) 	)
Router.post('/deleteFile', 	(req, res)=> deleteFile(req, res) 	)

module.exports = Router