const express = require('express');
const router = express.Router(); 
const {registerUser} = require('../controllers/Auth.contollers');
const {validateRegister} = require('../middlewares/Auth.middleware')
// Register Route 
router.post('/register',validateRegister , registerUser );












module.exports =  router ; 
