import axios from 'axios'
import {useEffect, useState} from 'react'

const Places = ()=>{
    
    const [places, setplaces]=useState([])
        console.log(places)
        useEffect(()=>{

            axios.get('http://localhost:5000/place/60545def004d1303cbc162e4')
            .then(response => setplaces(response.data))
        }, [])
    
    return(
        <div>
                    <div className="lugar">
                    <h1>{places.name}</h1>
                    <div className="localidad">
                    <h3>Localidad</h3>
                    <h4>{places.town}</h4>
                    </div>
                    <div className="descripcion">
                    <h3>Descripción</h3>
                    <h4>{places.description}</h4>
                    </div>
                    <div className="imagen">
                    <h3>Imagen</h3>
                    <img src="https://www.turismodeobservacion.com/media/fotografias/cascada-de-el-trabuquete-la-vera-caceres-81430-xl.jpg" className="card-img-top" alt="Foto_lugar" />
                    </div>
                    </div>



                    </div>
        
                )
            

       
    
}

export default Places;