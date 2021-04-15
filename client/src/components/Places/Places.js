import axios from 'axios'
import { useEffect, useState } from 'react'

const Places = (props) => {
console.log(props)
    const [places, setplaces] = useState([])
    console.log(places)

 

    useEffect(() => {

        axios.get('/place/'+ props.match.params.id)
            .then(response => setplaces(response.data))
    }, [])
    return (
        <div>
            { places &&

                <div className="lugar">
                    <h1>{places.name}</h1>
                    <div className="localidad">
                        <h3>Localidad</h3>
                        <h4 className="letra">{places.town}</h4>
                    </div>
                    <div className="descripcion">
                        <h3>Descripción</h3>
                        <h4 className="letra">{places.description}</h4>
                    </div>
                    <div className="imagen">
                        {/* <h3>Imagen</h3> */}
                        <img src={`/storage/${places.image}`} className="card-img-top" alt="Foto_lugar" />
                    </div>
                </div>

            }
        </div>
    )
}
export default Places;