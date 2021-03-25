const Router = require('express')
const Guide = require('../models/guide')
const User = require('../models/user')


const guideRoute = new Router()


//it finds all the guides

guideRoute.get('/guide', (req, res)=>{
    Guide.find({}, (error, guides)=>{
        if(error){
            res.status(400).send('Se ha producido un error, inténtalo de nuevo')
        }
        res.json(guides)
    })
})

//CREAR GET PARA COGER UNA GUÍA ESPECÍFICA.

guideRoute.get('/guide/:id', (req, res)=>{
    const {params: {id}}= req
    Guide.findById(id, (error, guide)=>{
        if(error){
            res.status(400).send('Se ha producido un error')
        }
        res.json(guide)
    })
})

//delete a guide

guideRoute.delete('/guide/:id', (req, res)=>{
    const {params: {id}} = req
    Guide.findByIdAndRemove(id, (error, content)=>{
        if (error){
            res.status(400).send('No ha sido posible realizar los cambios')
        }
        // if(!User){
        //     res.status(400).send("No está autorizado para borrar esta ruta")
        // }
        res.status(200).send('Eliminado correctamente')
    })
    
})


// New guide
guideRoute.post('/guide', (req, res)=>{
    const {body: {name, image, description, places}} = req
    
    const guide = new Guide({
            name: name,
            image: image,
            description: description,
            places: places
    })
        
        return guide.save()
        .then(guide => res.status(201).send (guide))
        .catch(console.error)

     })

    
module.exports = guideRoute