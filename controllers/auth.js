const bcrypt = require('bcryptjs');
const Login = require('../models/user');

const checkUser = (req, res) => {
    console.log("I ran from the controller");
    const { username, password } = req.body;
    Login.findOne( {username})
        .then(user => {
            bcrypt(password, user.password, (err, result) => {
                if (err) throw err;
                if(result) {
                    console.log("User is authenticated");
                } else {
                    res.status(404).json({error: "Invalid Credentials"});
                }
            })
        })

        .catch(err => {
            res.status(404).json({error: "Invalid Credentials from catch block"});
        })
        
}



module.exports = checkUser;