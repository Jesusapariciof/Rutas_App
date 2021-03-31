import axios from 'axios'
import {useEffect, useState} from 'react'
import Places from '../Places'
import PlacesById from '../PlacesById'

const tokendemierda = JSON.parse(localStorage.getItem("token"))
console.log(tokendemierda)

const NewPlace = () =>{

    const [newPlace, setNewPlace] = useState([])
    console.log(newPlace)
    const [name, setName] = useState()
    const [image, setImage] = useState()
    const [town, setTown] = useState()
    const [description, setDescription] = useState()
    const [guideId, setGuideId] = useState()

    const handleSubmit = ()=>{

        setNewPlace([
            name,
            image,
            town,
            description,
            guideId

        ])
    }

    useEffect(()=>{

        axios.post('http://localhost:5000/newplace',
        {headers:{
            "Authorization":`Bearer ${tokendemierda}`
        }
    })
        .then(response => setNewPlace(response.data))
    }, [])


    return(
        <div>
        <h1>Crea y comparte tus lugares favoritos</h1>

        <form onSubmit={handleSubmit}>

        <input name="name" type="text" onChange={e => setName(e.target.value)} />
        {/* <input name="image" type="text" onChange={e => setImage(e.target.value)} /> */}
        <input name="town" type="text" onChange={e => setTown(e.target.value)} />
        <input name="description" type="text" onChange={e => setDescription(e.target.value)} />
        <input name="guideId" type="text" onChange={e => setGuideId(e.target.value)} />

        <button type="submit">Crear lugar</button>
            
        </form>
        
        </div>
        
    )
}

export default NewPlace;