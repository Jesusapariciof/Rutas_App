import axios from 'axios'
import {useEffect, useState} from 'react'

const Perfil = ()=>{

     const [myPlace, setMyPlace]= useState([])
     console.log(myPlace)

useEffect(()=>{

    axios.get('http://localhost:5000/allUsers')
    .then(response => setMyPlace(response.data))
    

},[])


    return(
        <div>
            <h1>Lugares Creados</h1>

            {
                myPlace.map((item, index)=>
                
                <div key={index}>
                    <h3>{item.username}</h3>

                </div>
                )

            }


        </div>

    )
}

export default Perfil;