require('dotenv').config()
const Router = require('express')
const places = require('../models/places')
const Place = require('../models/places')
const user = require('../models/user')
const User = require('../models/user')
const placesRouter = new Router()
const express = require('express')
const multer = require('../routes/multer')
const jwt = require('jsonwebtoken')
const { validateName, validateTown, validateDescription } = require('../validations/validators')

const verifyToken = require('../models/verifyToken')

const { env: { SECRET } } = process


//new places
placesRouter.post('/newplace',verifyToken, multer.single('image'), async (req, res, next) => {
    // const { body: { name, town, description, guideId } } = req
    
    const name = req.body.name
    const image = req.file.filename
    const town = req.body.town
    const description = req.body.description
    const guideId = req.body.guideId
    const userId = req.userId
    try{


    validateName(name)
    validateTown(town)
    validateDescription(description)
    const place = new Place({
        name: name,
        image: image,
        town: town,
        description: description,
        guideId: guideId,

    })
    

    User.findById(userId, (error, user) => {
        if (error) {
            return res.status(400).send('Ha ocurrido un error')
        }
        if (!user) {
            return res.status(400).send('No hay usuario')
        }
        place.save()
            .then(newPlace => {
                user.lugaresCreados.push(newPlace._id)
                user.save()
                    .then(() => { 

                        return res.status(201).send('Lugar creado')
                    })
            })
        })
           
        }
        catch(error){

            return res.status(400).send(error.message)
        }
            
})

//it finds all the places

placesRouter.get('/allplaces', (req, res) => {
    Place.find({})
    .populate('guideId')
    .exec((error, places) => {
        if (error) {
            res.status(400).send('Se ha producido un error')
        }
         res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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
            // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

            res.json(places)
        })
})


//delete a place
placesRouter.delete('/places/user/:id/delete', verifyToken, (req, res) => {
    const { params: { id }, userId } = req
    return User.findById(userId)
        .then(user => {
            console.log(user)
            const index = user.lugaresCreados.indexOf(id)
            console.log(index)
            if (index == -1) {
               return res.status(401).send('Este usuario no tiene permisos para borrar el lugar indicado')
            }
            else {
                return User.findByIdAndUpdate(userId, { $pull: { lugaresCreados: id } })
                    .then(doc => {
                        return Place.findByIdAndRemove(id).lean()
                            .then(place => res.status(200).send('Lugar eliminado'))
                            .catch(error => res.status(400).send('Ha ocurrido un error'))
                    })
                }
            })

        .catch(error => res.send('Se ha producido un error'))
})

//modify a place
placesRouter.put('/places/user/:id/modificar', verifyToken, (req, res) => {
    const { params: { id }, userId } = req
    let body = req.body;
    return User.findById(userId).lean()
    .then(user => {
        const index = user.lugaresCreados.findIndex(({_id})=>{ 
            return id===_id.toString()})
        console.log(user.lugaresCreados)
        console.log(index)
        if(index == -1){
             res.status(401).send('Este usuario no tiene permiso para modificar el lugar seleccionado')
        }else{
           return Place.findByIdAndUpdate(id, { $set: body })
            .then(doc => res.status(200).send('Lugar modificado'))
            .catch(error => res.status(400).send('Ha ocurrido un error'))
        }
    })
.catch(error => res.send('Se ha producido un error'))
})
    
//Selecciona los lugares que le interesan (favoritos) y los asocia a su id.
//usuarioInteresado lleva la misma Id que crea automáticamente moongodb
placesRouter.get('/favoritesplaces/user/:placeId', verifyToken, (req, res) => {
    const { params: { placeId }, userId } = req;

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new Error(`Usuario con id ${userId} no encontrado`)
            const { _id } = user
            let { favoritos } = user
            user = { userId: _id }
            return Place.findById(placeId).lean()
                .then(place => {
                    if (!place) throw new Error(`Lugar no encontrado`)

                    if (favoritos.length) {
                        const index = favoritos.findIndex(place => place._id.toString() === placeId)
                        index < 0 ? favoritos.push(placeId) : favoritos.splice(index, 1)

                        return User.updateOne({ _id }, { $set: { favoritos } })
                            .then(result => res.status(200).send('Actualizado en tus lugares favoritos'))

                    } else {
                        favoritos.push(placeId)

                        return User.updateOne({ _id }, { $set: { favoritos } })
                            .then(result => res.status(200).send('Actualizado en tus lugares favoritos'))
                    }
                })

        })

})

//CREAR GET PARA COGER UN LUGAR ESPECÍFICO.

placesRouter.get('/place/:id', (req, res)=>{
    const {params: {id}}= req
    Place.findById(id, (error, place)=>{
        if(error){
            res.status(400).send('Se ha producido un error')
        }
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

        res.json(place)
    })
})




module.exports = placesRouter