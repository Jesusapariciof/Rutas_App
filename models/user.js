const {Schema, model} = require('mongoose')
 const bcrypt = require('bcrypt')
 const saltRounds = 10;

const user = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        unique: true
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
        trim: true,
        minlength: 6
    },
    lugaresCreados:[{
        type: Schema.Types.ObjectId,
        ref: 'Place'
    }],
    favoritos: [{
        type: Schema.Types.ObjectId,
        ref: 'Place'
    }],

    



})

//Guardar contraseña encriptada en el registro de usuario
user.pre('save', function(next){
    if(this.isNew || this.isModified('password')){
        const document = this;

        bcrypt.hash(document.password, saltRounds, (error, hashedPassword)=>{
            if(error){
                next(error)
            }
            else{
                document.password = hashedPassword;
                next()
            }
        });
    }
    else{
        next()
    }
})




module.exports = User = model('User', user)