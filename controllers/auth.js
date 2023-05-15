const User = require('../models/user');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const bcrypt = require('bcryptjs');

const saveUser = async (req) => {

    return new Promise(async (resolve, reject) => {

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const plainPwd = req.body.password;
        const hashedpwd = await bcrypt.hash(plainPwd, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpwd
        })
        newUser.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            })
        
    })
}


const registerUser = (req, res) => {
    return new Promise((resolve, reject) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

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
    // const username = req.body.username;
    // const password = req.body.password;

    // User.findOne({username})
    //     .then(response => {
    //         console.log(response.username);
    //         res.send("User already exists with the given username")
    //     })
    //     .catch(err => {
    //         saveUser(req, res);
    //         res.send(`User created successfully`);
    //     })
}




const authenticatedUser = (req, res) => {
    console.log("I ran from the controller");
    const { username } = req.body.username;
    User.findOne( {username})
        .then(user => {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) throw err;
                if(result) {
                    console.log("User is authenticated");
                    return true;
                } else {
                    return false;
                }
            })
        })

        .catch(err => {
            res.status(404).json({error: "Invalid Credentials from catch block"});
        })
        
}

const loginUser = (username, password) => {

    if(authenticatedUser) {
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = {
            accessToken, username
        }
        
        res.status(200).send("User successfully logged in");
    } else {
       res.status(208).json({message: "Invalid username or password"});
    }
}

module.exports =  { 
    registerUser,
    loginUser 
}