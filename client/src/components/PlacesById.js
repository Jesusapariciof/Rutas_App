import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'


const PlacesById = () => {

    const [guideId, setguideId] = useState([])
    console.log(guideId)
    useEffect(() => {

        axios.get('http://localhost:5000/guideId/605496744086d806bf865917')
            .then(response => setguideId(response.data))

    }, [])


    return (
        <div>
            <h1>La Vera</h1>

            <button className="crearbutton">Crear lugar</button>
            {
                guideId.map((item, index) =>
                
                    <div key={index} className="lugares">
                        <img src={`http://localhost:5000/storage/${item.image}`} className="card-img-top" alt="Foto_lugar" />
                        <div>
                            <h3>{item.name}</h3>
                            <Link to={'/place/' + item._id} >Saber más</Link>
                        </div>
                       
                    </div>
                    
                )
            }
        </div>
    )
}


export default PlacesById;