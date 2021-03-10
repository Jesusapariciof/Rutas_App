const { Router } = require('express')
const User = require('../models/user')
// const bcrypt = require('bcrypt')



const router = new Router()

// New user
router.post('/user', (req, res)=>{
    const {body: {username, email, password}} = req
    
    const newUser = new User({
        username: username,
        email: email,
        password: password
    })
    
    return newUser.save()
    .then(user => res.send(user))
    .catch(console.error)

    })

// router.post('/user', (req, res)=>{
//     const {body: {username, password}} = req

//     const user = new User ({
//         username: username,
//         password: password
//     })
//     user.save(error =>{
//         if (error){

//             res.status(500).send('ERROR AL REGISTRAR AL USUARIO')
//         }
//         else{
//             res.status(200).send('USUARIO REGISTRADO')
//         }
//     })
// })

// router.post('/authenticate', (req, res)=>{
//     const {body: {username, password}}= req
//     User.findOne({username}, (error, user)=>{
//         if(error){
//             res.status(500).send('ERROR AL AUTENTICAR AL USUARIO')
//         }
//         if(!user){
//             res.status(500).send ('EL USUARIO NO EXISTE')
//         }
//         else{
//             user.isCorrectPassword(password, (error, result)=>{
//                 if(error){
//                     res.status(500).send('ERROR AL AUTENTICAR')
//                 }
//                 if(result){
//                     res.status(200).send('USUARIO AUTENTICADO CORRECTAMENTE')
//                 }
//                 else{
//                     res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA')
//                 }
//             })  
//         }

//     })
// })






    
module.exports = router