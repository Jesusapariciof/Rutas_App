const Router = require('express')
const places = require('../models/places')
const Place = require('../models/places')
const user = require('../models/user')
const User = require('../models/user')
const placesRouter = new Router()
const express = require('express')
const multer = require('../routes/multer')




//new places
placesRouter.post('/places', multer.single('image'), (req, res) => {
    // const { body: { name, town, description, guideId } } = req
    const name = req.body.name
    const image = req.file.filename
    const town = req.body.town
    const description = req.body.description
    const guideId= req.body.guideId
    const usuarioInteresado = req.body.usuarioInteresado

    const place = new Place({
        name: name,
        image: image,
        town: town,
        description: description,
        guideId: guideId,
        usuarioInteresado: usuarioInteresado
    })

    place.save()
        .then(newPlace => {

            return res.status(201).send(newPlace)
        })
})

//it finds all the places

placesRouter.get('/allplaces', (req, res) => {
    Place.find({}, (error, places) => {
        if (error) {
            res.status(400).send('Se ha producido un error')
        }
        res.json(places)
    })
})

// find the places with the same guideId
placesRouter.get('/guideId/:id', (req, res) => {
    Place.find({ guideId: req.params.id })
        .populate("Guide")
        .exec((error, places) => {
            if (error) {
                res.status(400).send('Ha habido un error')
            }
            res.json(places)
        })
})



//delete places
placesRouter.delete('/places/:id', (req, res) => {
    const { params: { id } } = req

    Place.findByIdAndRemove(id, (error, place) => {
        if (error) {
            res.status(400).send('No ha sido posible eliminar')
        }
        // if(!User){
        //     res.status(400).send('No está autorizado para eliminar')
        // }
        res.json(place)
    })
})

//modify a place
placesRouter.put('/modificar', (req, res) => {
    let body = req.body;
    Place.updateOne({ _id: body._id }, {
        $set: req.body
    },
        function (error, info) {
            if (error) {
                res.status(400).send('Se ha producido un error')
            }
            res.json(info)
        }
    )

})
//Selecciona los lugares que le interesan al usuario (con su id)
placesRouter.get('/newplaces/user/:id', (req, res)=>{
    const {params: {id}}= req;

    Place.find({usuarioInteresado:id})
    .populate("guideId", "name")
    .populate("usuarioInteresado", ["email","password", "username"])
    .exec((error, place)=>{
        if(error){
            res.sendStatus(400)
        }
        res.json(place)
       console.log(place)
    })

})







module.exports = placesRouter