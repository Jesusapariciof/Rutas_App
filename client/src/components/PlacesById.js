import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'


const PlacesById = () => {

    const [guideId, setguideId] = useState([])
    console.log(guideId)
    useEffect(() => {

        axios.get('http://localhost:5000/guideId/6053a563b099c81cf35bda4f')
            .then(response => setguideId(response.data))

    }, [])


    return (
        <div>
            <h1>La Vera</h1>

            <button className="crearbutton">Crear lugar</button>
            {
                guideId.map((item, index) =>
                
                    <div key={index} className="lugares">
                        <img src="https://www.turismodeobservacion.com/media/fotografias/cascada-de-el-trabuquete-la-vera-caceres-81430-xl.jpg" className="card-img-top" alt="Foto_lugar" />
                        <div>
                            <h3>{item.name}</h3>
                            <Link to={'/place/' + item._id} >Saber más</Link>
                        </div>
                        <button>Fav</button>
                    </div>
                    
                )
            }
        </div>
    )
}


export default PlacesById;