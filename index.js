require('dotenv').config()
const route = require('color-convert/route')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const placesRouter = require('./routes/placesRoute')
const cors = require('cors')



const {env: {MONGODB_URL}}= process

mongoose.connect(MONGODB_URL, {useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    
    const router = require('./routes/index')
    const guideRoute = require('./routes/guideRoute')
    const placesRouter = require ('./routes/placesRoute')
    
    //Middleware
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(router)
    app.use(guideRoute)
    app.use(placesRouter)
    app.use(express.static("storage/imgs"))
    app.use(cors())

    const port = 5000
    app.listen(port, ()=>{
        console.log(`El servidor se ha inicializado en el puerto ${port}`)
    })
})


.catch((error)=>{ 
    console.log(error)
    if (mongoose.connection.readyState === 1)
            return mongoose.disconnect()
                .catch(console.error)
                .then(() => process.exit())
})