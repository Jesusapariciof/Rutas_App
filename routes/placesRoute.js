const Router = require ('express')
const places = require('../models/places')
const Place = require('../models/places')
const User = require('../models/user')

const placesRouter = new Router()

//new places
placesRouter.post('/places', (req, res)=>{
    const {body: { name, image, town, description, guideId}} = req
    
    const place = new Place({
        name: name,
        image: image,
        town: town,
        description: description,
        guideId: guideId
    })

    place.save()
    .then(newPlace=>{

     return res.status(201).send(newPlace)
    })
})

//it finds all the places
placesRouter.get('/allplaces', (req, res)=>{
    Place.find({}, (error, places)=>{
        if(error){
            res.status(400).send('Se ha producido un error')
        }
        res.json(places)
    })
})

// find the places with the same guideId
placesRouter.get('/:id', (req, res)=>{
    Place.find({guideId: req.params.id})
    .populate("Guide")
    .exec((error, places)=>{
        if (error){
            res.status(400).send('Ha habido un error')
        }
        res.json(places)
    })
})



//delete places
placesRouter.delete('/places/:id', (req, res)=>{
    const {params: {id}} = req

    Place.findByIdAndRemove(id, (error, place)=>{
        if (error){
            res.status(400).send ('No ha sido posible eliminar')
        }
        // if(!User){
        //     res.status(400).send('No está autorizado para eliminar')
        // }
        res.json(place)
    })
})

//modify a place
placesRouter.post('/modificar', (req, res)=>{
let body = req.body;
Place.updateOne({_id: body._id}, {
    $set: req.body
},
function (error, info){
    if (error){
        res.status(400).send('Se ha producido un error')
    }
    res.json(info)
}
)

})

module.exports=placesRouter