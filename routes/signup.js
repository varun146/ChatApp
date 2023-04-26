const express = require('express');
const createUser = require('../controllers/signup');
const router = express.Router();



router.get('/', createUser);



module.exports = router;