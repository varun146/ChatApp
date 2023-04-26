const express = require('express');
const checkUser = require('../controllers/auth');
const router = express.Router();


router.post('/', checkUser);


module.exports = router;