const {Schema, model} = require('mongoose')
// const bcrypt = require('bcrypt')
// const saltRounds = 10;

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
        trim: true,
        minlength: 6
    },
    



})

// user.pre('save', function(next){
//     if(this.isNew || this.Modified('password')){
//         const document = this;

//         bcrypt.hash(document.password, saltRounds, (error, hashedPassword)=>{
//             if(error){
//                 next(error)
//             }
//             else{
//                 document.password = hashedPassword;
//                 next()
//             }
//         });
//     }
//     else{
//         next()
//     }
// })

// user.methods.isCorrectPassword = function(password, callback){
//     bcrypt.compare(password, this.password, function(error, same){
//         if(error){
//             callback(error)
//         }
//         else{
//             callback(error, same)
//         }
//     })
// }



module.exports = User = model('User', user)