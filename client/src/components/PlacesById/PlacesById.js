import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './PlacesById.css'


const PlacesById = (props) => {
    console.log(props)
    const [guideId, setguideId] = useState([])
    console.log(guideId)
    useEffect(() => {

        axios.get('/guideId/' + props.match.params.id)
            .then(response => setguideId(response.data))

    }, [])

    const redirectToNewPlace = () =>{
        props.history.push('/newplace')
         }

    return (
        <div>
            
            <h1>Conoce tus lugares preferidos</h1>
            <div className="crealugar">
            <button className="btn btn-success" onClick={() => redirectToNewPlace()}>Crear lugar</button>
            </div>
            <div className="organizacion">
            {
                guideId.map((item, index) =>
                    
                    <div key={index} className="lugares">
                        
                        <img src={`/storage/${item.image}`}className="card-img-top" alt="Foto_lugar" />
                        <div className="info">
                            <h3>{item.name}</h3>
                            <button className="btn btn-primary"> <Link className="infotext" to={'/place/' + item._id} >Saber más</Link></button> 
                        </div>
                       
                    </div>
                )
            }
                   </div>
        </div>
    )
}


export default PlacesById;