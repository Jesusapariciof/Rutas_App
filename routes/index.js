require('dotenv').config()
const { Router } = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { validatePassword, validateEmail } = require('../validations/validators')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

const { env: { SECRET } } = process


const router = new Router()

//it find all users

router.get('/allUsers', (req, res)=>{
    User.find({}, (error, users)=>{
        if (error){
            res.status(400).send('Ha habido un error')
        }
        res.json(users)
    })
} )

// New user 
router.post('/register', (req, res)=>{
    const {body: {username, email, password}} = req
    //  const hashedPassword = await bcrypt.hash(req.body.password, 10)
    validateEmail(email)
    validatePassword(password)

    const newUser = new User({
        username: username,
        email: email,
        password: password
    })
    
    return newUser.save()
    .then(user => res.send(user))
    .catch(console.error)

        
    })


    //Modificar contraseña y encriptación

    router.put('/user/password/:id', (req, res)=>{
        const {params: {id}}= req

        User.findById(id, (error, user)=>{

            if(error){
                res.status(400).send('Usuario no encontrado')
                return
            }
            user.password = req.body.password
            user.save()
            .then((usuarioActualizado)=>{
                return res.status(200).send(usuarioActualizado)
            })
        })
    })

    
    
//Realizar un login con async await
    router.post('/login', async (req, res)=>{
        // const body = req.body
        const user = await User.findOne({ email: req.body.email })

        if (user){
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(validPassword){
                
                const token = jwt.sign({id: user._id}, SECRET, {
                    expiresIn: 120
                })
                res.json({auth: true, token})
                // res.status(200).json({message: 'Contraseña correcta'})
            } else{
                res.status(400).json({error: 'Contraseña Incorrecta'})
            }
        }  
         else{
                res.status(401).json({error: 'El usuario no existe'})
            }
        })


//Realizar un login sin async await
// router.post('/login', (req, res)=>{
//      User.findOne({ email: req.body.email}).then(user =>{

//          if (!user){
//                 return res.status(401).send('email no valido')
//              }
//              bcrypt.compare(req.body.password, user.password)
//              .then(validPassword =>{
//                  if(validPassword){
//                      res.status(200).send('Contraseña correctA')
//                  }
//                  else{
//                      res.status(401).send('Contraseña incorrecta')
//                  }
//              })
//          })

//      })



   
    







    
module.exports = router