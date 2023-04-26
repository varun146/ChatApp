const mongoose = require('mongoose');


const newUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }, 
}, { timestamps: true});


const User = mongoose.model('User', newUserSchema);


module.exports = User;