const {Schema, model}= require('mongoose')

const place = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    image:{
        type: String,
        required: true,
    },
    town:{
        type: String,
        required: true,
    },

    description:{
        type: String,
        required: true,
    }

    // Dificultad de acceso, dificultad de aparcamiento, tiempo de duración.
}) 



module.exports = Place = model('Place', place)