const Router = require ('express')
const Place = require('../models/places')

const placesRouter = new Router()

//new places
placesRouter.post('/places', (req, res)=>{
    const {body: { name, image, town, description}} = req
    
    const place = new Place({
        name: name,
        image: image,
        town: town,
        description: description
    })

    place.save()
    res.status(201).send(place)
    
})

module.exports=placesRouter