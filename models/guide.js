const {Schema, model} = require('mongoose')

const guide = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    image:{
        type: String,
        required: true,
    },

    description:{
        type: String,
        required: true,
    },
    places:{
        type: String,
        required: true,
    },

    //Duración, mapa, creador, fecha creación

})

module.exports = Guide = model('Guide', guide)