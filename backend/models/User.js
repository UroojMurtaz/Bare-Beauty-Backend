const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    userId: {
        type: String,
        require: true,

    },
    Role: {
        type: String,
        require: true,

    },
    userEmail: {
        type: String,
        require: true
    },
    userPassword: {
        type: String,
        require: true
    },
    userPhoneNumber: {
        type: String,
        require: true
    },


})

module.exports = mongoose.model('User', userSchema)