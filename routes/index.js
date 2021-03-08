const { Router } = require('express')
const User = require('../models/user')


const router = new Router()

// New user
router.post('/user', (req, res)=>{
    const {body: {username, email, password}} = req
    
    const user = new User({
        username: username,
        email: email,
        password: password
    })
    
    return user.save()
    .then(user => res.send(user))
    .catch(console.error)

    })


    
module.exports = router