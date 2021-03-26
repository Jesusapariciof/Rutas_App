import axios from 'axios'
import {useEffect, useState} from 'react'



const Places = ()=>{
    
    const[places, setPlaces]= useState([])
    console.log(places)
useEffect(()=>{

    axios.get('http://localhost:5000/allplaces')
    .then(response =>setPlaces(response.data))
},[])
    

    return(
        <div>
        {
            places.map((item)=>
            <div>
                <h1>LUGAR</h1>
                <p>{item.name}</p>
                <h3>Descripción</h3>
                <p>{item.description}</p>
                <h3>Imagen</h3>
                <img src= {item.image} alt="Foto_lugar"/>
                
                </div>
            )
        }
        
        </div>
    )
    }
export default Places;