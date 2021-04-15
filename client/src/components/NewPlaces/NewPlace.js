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

        axios.post('/newplace', formData,
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
                
                   setBotonLogin(error.response.data)
                console.log(error.response.data)
            })
    }

    const [wellDone, setWellDone] = useState(" ")
    const [botonLogin, setBotonLogin]= useState(" ")

    const redirectToLugaresCreados = () => {
        props.history.push('/createdplaces')
    }
    const redirectToLogin = () => {
        props.history.push('/')
    }

    return (
        <div className="card">
            <h1 className="titulo">Crea y comparte tus lugares favoritos</h1>
            
            <form action="POST" className="card-body" onSubmit={createPlace} encType="multipart/form-data" >
                <p>Nombre</p>
                <input name="name" type="text" required onChange={handleChangeInput} />
                <p>Imagen</p>
                <input name="image" type="file" accept="image/*" onChange={handleChangeImage} />
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
                    <option value="607413f953cc88070c69eb7a">Cáceres</option>
                    <option value="6074141d53cc88070c69eb7b">Miajadas-Trujillo</option>
                    <option value="6074143653cc88070c69eb7c">Montánchez-Tamuja</option>
                    <option value="6074145453cc88070c69eb7d">Plasencia</option>
                    <option value="6074146e53cc88070c69eb7e">Sierra de Gata</option>
                    <option value="607414a753cc88070c69eb80">Granadilla</option>
                    <option value="607414e453cc88070c69eb83">Valle del Jerte</option>
                    <option value="607414f253cc88070c69eb84">Villuercas Ibores Jara</option>
                   
                </select>
                {/* <input name="guideId" type="text" onChange={handleChangeInput} /> */}
                <div>
                <button className="btn btn-primary" onClick={createPlace}>Crear lugar</button>
                </div>
                
                {wellDone && <div><p className="correcto">{wellDone}</p></div>}
                {botonLogin &&  <p className="irlogin" onClick={() => redirectToLogin()}> {botonLogin}</p> }
            <div className="mt-2">
                <span>Ir a  </span>
                <span className="link" onClick={() => redirectToLugaresCreados()}>MIS LUGARES</span>
            </div>
            </form>

        </div>

    )
}

export default withRouter(NewPlace);