const router = require('express').Router();
const { registerUser } = require('../controllers/auth');


router.post('/', (req, res) => {

    const {username, email, password} = req.body;

    return new Promise((resolve, reject) => {
        try {
            if(!username || !password || !email) {
                return reject(new Error('PLease provide a valid username, password and email'));
            }
        }

        User.findOne({username, email, password})
            .then(response => {
                console.log(response);
                res.send("User already exits in the database");
            })
            .catch(err => {
                saveUser(req);
                res.send("User registered successfully");

            })
    })
});
router.get('/where', (req, res) => {
    res.send("I am at general.js route for user registeration")
})





module.exports = router;