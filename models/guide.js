const {Schema, model} = require('mongoose')

const guide = new Schema({
    name:{
        type: String,
        required: true,
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
        type: [Schema.Types.ObjectId],
        ref: "Place"     
    },

    //Duración, mapa, creador, fecha creación

})

module.exports = Guide = model('Guide', guide)