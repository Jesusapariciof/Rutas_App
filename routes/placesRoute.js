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
placesRouter.post('/places', verifyToken, multer.single('image'), async (req, res, next) => {
    // const { body: { name, town, description, guideId } } = req

    const name = req.body.name
    const image = req.file.filename
    const town = req.body.town
    const description = req.body.description
    const guideId = req.body.guideId
    const userId = req.userId

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
            return res.status(400).send('No está autorizado')
        }
        place.save()
            .then(newPlace => {
                user.lugaresCreados.push(newPlace._id)
                user.save()
                    .then(() => { })
                return res.send('Lugar creado')
            })
            .catch(console.error)
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
                            .then(place => res.send('Lugar eliminado'))
                            .catch(error => res.send('Ha ocurrido un error'))
                    })
                }
            })

        .catch(error => res.send('Se ha producido un error'))
})


//modificar un lugar
// placesRouter.patch('/modificar', verifyToken, function(req, res) {
//     const body = req.body;
//     Place.findOneAndUpdate({ _id: body._id },{

//             $set: req.body
//         },
//         function(error,info) {
//             if (error){
//                 res.send('error');
//             }else{
//                 res.json(info)

//             }
//         }
//     )
// });


//modify a place. (Para modificar con postman hay que copiar el _id del lugar)
// placesRouter.put('/modificar/:id', verifyToken, (req, res) => {
//     let body = req.body;
//     let _id = req.params.id
//     let userId = req.userId
//     return User.findById(userId).lean()
//     .then(user => {
//         if (!user) throw new Error(`user with id ${userId} not found`)
//      Place.findByIdAndUpdate(_id, {
//         $set: {body}
//     },
//         function (error, info) {
//             if (error) {
//                 res.status(400).send('Se ha producido un error')
//             }
//             res.json(info)
//         }
//     )
//     })
// })

//Selecciona los lugares que le interesan (favoritos) y los asocia a su id.
//usuarioInteresado lleva la misma Id que crea automáticamente moongodb
placesRouter.get('/favoritesplaces/user/:placeId', verifyToken, (req, res) => {
    const { params: { placeId }, userId } = req;

    return User.findById(userId).lean()
        .then(user => {
            if (!user) throw new Error(`user with id ${userId} not found`)
            const { _id } = user
            let { favoritos } = user
            user = { userId: _id }
            return Place.findById(placeId).lean()
                .then(place => {
                    if (!place) throw new Error(`Place not found`)

                    if (favoritos.length) {
                        const index = favoritos.findIndex(place => place._id.toString() === placeId)
                        index < 0 ? favoritos.push(placeId) : favoritos.splice(index, 1)

                        return User.updateOne({ _id }, { $set: { favoritos } })
                            .then(result => res.send('Actualizado en tus lugares favoritos'))

                    } else {
                        favoritos.push(placeId)

                        return User.updateOne({ _id }, { $set: { favoritos } })
                            .then(result => res.send('Actualizado en tus lugares favoritos'))
                    }
                })

        })

})




module.exports = placesRouter