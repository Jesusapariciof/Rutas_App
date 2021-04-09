import axios from 'axios'
import { useEffect, useState } from 'react'
import FormData from 'form-data'
import './NewPlace.css'
import { withRouter } from "react-router-dom";




function NewPlace(props) {

    const [newImage, setNewImage] = useState({
        image: []
    })

    const handleChangeImage = (event) => {
        setNewImage({
            image: event.target.files[0]
        })
    }

    const [newPlace, setNewPlace] = useState({
        name: "",
        town: "",
        description: "",
        guideId: ""
    });

    const handleChangeInput = (event) => {
        setNewPlace({
            ...newPlace,
            [event.target.name]: event.target.value
        })
    }

    const createPlace = (event) => {
        event.preventDefault()

        const formData = new FormData();
        formData.append("name", newPlace.name)
        formData.append("image", newImage.image)
        formData.append("town", newPlace.town)
        formData.append("description", newPlace.description)
        formData.append("guideId", newPlace.guideId)

        axios.post('http://localhost:5000/newplace', formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('jwt-token')}`
                }
            })

            .then((response) => {
                setWellDone(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                   setErrorMessage(error.response.data)
                console.log(error.response.data)
            })
    }

    const [errorMessage, setErrorMessage]= useState(" ")
    const [wellDone, setWellDone] = useState(" ")

    const redirectToLugaresCreados = () => {
        props.history.push('/createdplaces')
    }

    return (
        <div className="card">
            <h1 className="titulo">Crea y comparte tus lugares favoritos</h1>
            
            <form action="POST" className="card-body" onSubmit={createPlace} encType="multipart/form-data" >
                <p>Nombre</p>
                <input name="name" type="text" required onChange={handleChangeInput} />
                <p>Imagen</p>
                <input name="image" type="file" accept="image/*" required onChange={handleChangeImage} />
                <p>Población</p>
                <input name="town" type="text"required onChange={handleChangeInput} />
                <p>Description</p>
                <input name="description" type="text" required onChange={handleChangeInput} />
                <p>Elige una zona</p>
                <label for="place-select"></label>

                <select name="guideId" id="place-select" required onChange={handleChangeInput}>
                    <option value="">--Elige una zona--</option>
                    <option value="604748f3b00d760602aef79b">La Vera</option>
                    <option value="6048880166466a0408d4e53e">Las Hurdes</option>
                    <option value="605496744086d806bf865917">Monfragüe</option>
                   
                </select>
                {/* <input name="guideId" type="text" onChange={handleChangeInput} /> */}
                <div>
                <button className="btn btn-primary" onClick={createPlace}>Crear lugar</button>
                </div>
                {/* {errorMessage && <div>{errorMessage}</div>} */}
                {wellDone && <div><p className="correcto">{wellDone}</p></div>}
                {errorMessage && <div><p className="error">{errorMessage}</p></div>}
            <div className="mt-2">
                <span>Vuelve a  </span>
                <span className="link" onClick={() => redirectToLugaresCreados()}>MIS LUGARES</span>
            </div>
            </form>

        </div>

    )
}

export default withRouter(NewPlace);