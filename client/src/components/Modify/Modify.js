import axios from 'axios'
import { useState } from 'react';
import { withRouter } from "react-router-dom";
import './Modify.css'

const Modify = (props) => {
console.log(props)
    const [modificarLugar, setModificarLugar] = useState({})

    const [newImage, setNewImage] = useState({
        image: []
    })


    const handleChangeImage = (event) => {
        setNewImage({
            image: event.target.files[0]
        })
    }
    const formData = new FormData();
    formData.append("image", newImage.image)

    const editarRuta = (event) => {
        event.preventDefault()

        
        

        axios.put(`http://localhost:5000/places/user/` + props.match.params.id + `/modificar`,modificarLugar, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt-token')}`
            },
            formData
        }
        )

            .then(response => {
                setModificarCorrecto(response.data)
                console.log(response.data)
            })
            // .catch(error => {
            //     setErrorModificar(error.response.data)
            //     console.log(error.response.data)
            // })
    }

    const changeInput = (event) => {
        setModificarLugar({
            ...modificarLugar,
            [event.target.name]: event.target.value
        })
    }

    const redirectToLugaresCreados = () => {
        props.history.push('/createdplaces')
    }

    // const [errorModificar, setErrorModificar]=useState("")
    const [modificarCorrecto, setModificarCorrecto]=useState("")



    return (
        <div>
            <h1>Modificar un lugar</h1>

            <form action="POST" onSubmit={editarRuta} encType="multipart/form-data" >

                <p>Nombre</p>
                <input name="name" type="text" value={modificarLugar.name} onChange={changeInput} placeholder={props.match.params.name} />
                <p>Imagen</p>
                <input name="image" type="file" accept="image/*" required onChange={handleChangeImage} />
                <p>Población</p>
                <input name="town" type="text" value={modificarLugar.town} onChange={changeInput} />
                <p>Description</p>
                <input name="description" type="text" value={modificarLugar.description} onChange={changeInput} />
                <p>guideId</p>
                <label for="place-select">Elige una zona</label>
                <select name="guideId" id="place-select" value={modificarLugar.guideId} onChange={changeInput} >
                    <option value="">--Elige una zona--</option>
                    <option value="604748f3b00d760602aef79b">La Vera</option>
                    <option value="6048880166466a0408d4e53e">Las Hurdes</option>
                    <option value="605496744086d806bf865917">Monfragüe</option>
                </select>
                <div>
                    <button className="btn btn-primary" type="submit" onClick={editarRuta}>Modificar lugar</button>
                </div>
            </form>
            {/* {errorModificar && <div><p className="error">{errorModificar}</p></div>} */}
            {modificarCorrecto && <div><p className="correcto">{modificarCorrecto}</p></div>}
            <div className="mt-2">
                <span>Vuelve a  </span>
                <span className="link" onClick={() => redirectToLugaresCreados()}>MIS LUGARES</span>
            </div>
        </div>
    )
}
export default withRouter(Modify);