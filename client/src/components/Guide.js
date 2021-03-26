import axios from 'axios'
import {useEffect, useState} from 'react'

const Guide = ()=>{
    
    const[lugar, setLugar]= useState([])
    console.log(lugar)
useEffect(()=>{

    axios.get('http://localhost:5000/guide')
    .then(response =>setLugar(response.data))
},[])
    

    return(
        <div>
        {
            lugar.map((item)=>
            <div>
                <h1>LUGAR</h1>
                <p>{item.name}</p>
                <h3>Descripción</h3>
                <p>{item.description}</p>
                <h3>Imagen</h3>
                <p>{item.image}</p>
                
                </div>
            )
        }
        
        </div>
    )
    }
export default Guide;