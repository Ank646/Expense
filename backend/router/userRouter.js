const express = require('express');
const { loginController, getAllUsers,logoutController, signupContorller } = require('../controller/userController');
const router = express.Router();

router.post('/login' ,loginController);
router.get('/logout', logoutController);
router.post('/signup', signupContorller);

router.get('/users', getAllUsers); 

module.exports = router;