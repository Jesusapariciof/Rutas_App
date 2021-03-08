const {Schema, model} = require('mongoose')

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },

})

module.exports = User = model('User', user)