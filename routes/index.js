const router = require('express').Router();
const general_route = require('./general');
const authUsers_route = require('./authUsers');
 

// router.get('/', (req, res) => {
//     res.send("I am and index.js in routes");
// })


router.use('/register', general_route);
router.use('/login', authUsers_route);





module.exports = router;