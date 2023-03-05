const express = require('express')
const Router = express.Router()


const { getState }	    = require('./getState')
const { getAuth }		    = require('./getAuth')
const { getWorkshop }		= require('./getWorkshop')
const { getOffice }			= require('./getOffice')
// const { getTraffic }		= require('./getTraffic')
// const { getCV }					= require('./getCV')
// const { getCookies }		= require('./getCookies')
// const { getPass }				= require('./getPass')
// const { getFiles }			= require('./getFiles')
// const { getFin }				= require('./getFin')
// const { getProfile }		= require('./getProfile')
// const { uploadFile }		= require('./uploadFile')
// const { deleteFile }		= require('./deleteFile')

Router.post('/getState', 		(req, res)=> getState(req, res)     )
Router.post('/getAuth',     (req, res)=> getAuth(req, res)      )
Router.post('/getWorkshop', (req, res)=> getWorkshop(req, res) 	)
Router.post('/getOffice', 	(req, res)=> getOffice(req, res) 		)
// Router.post('/getTraffic', 	(req, res)=> getTraffic(req, res) 	)
// Router.post('/getCV', 			(req, res)=> getCV(req, res) 				)
// Router.post('/getPass', 		(req, res)=> getPass(req, res) 			)
// Router.post('/getFiles', 		(req, res)=> getFiles(req, res) 		)
// Router.post('/getFin', 			(req, res)=> getFin(req, res) 			)
// Router.post('/getProfile', 	(req, res)=> getProfile(req, res) 	)
// Router.post('/getCookies', 	(req, res)=> getCookies(req, res) 	)
// Router.post('/uploadFile', 	(req, res)=> uploadFile(req, res) 	)
// Router.post('/deleteFile', 	(req, res)=> deleteFile(req, res) 	)


module.exports = Router