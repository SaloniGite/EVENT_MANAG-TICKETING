const express = require('express');
const router = express.Router(); 
const {registerUser} = require('../controllers/Auth.contollers');
const {validateRegister} = require('../middlewares/Auth.middleware')
const {loginUser} = require('../controllers/Auth.contollers');
const {logoutUser} = require('../controllers/Auth.contollers')
// Register Route 
router.post('/register',validateRegister , registerUser );

router.post('/login',loginUser);

router.get('/logout',logoutUser);







module.exports =  router ; 
