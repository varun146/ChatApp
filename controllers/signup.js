const User = require('../models/user');


const creatUser = (req, res) => {
    User.create(req.body);
}