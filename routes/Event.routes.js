const express = require('express')
const router = express.Router();
const {createEvent} = require('../controllers/Event.controller')
const upload = require('../helpers/multer.helper')
const {verifyToken , isOrganizer} = require('../middlewares/Auth.middleware')

router.post('/create',verifyToken,isOrganizer,upload.single('image'),createEvent);









module.exports = router ; 
