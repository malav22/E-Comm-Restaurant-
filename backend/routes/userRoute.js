const express = require('express');
const { createUser,loginUser,logout } = require('../controllers/userController');
const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').post(logout);
module.exports = router;