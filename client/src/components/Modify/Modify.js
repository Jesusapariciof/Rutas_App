import axios from 'axios'
import { useState } from 'react';
import { ACCES_TOKEN_NAME } from '../constants/constants';

const Modify = () =>{

    const[modificarLugar, setModificarLugar]=useState({})
    console.log(modificarLugar)

    const editarRuta = (event, id)=>{
        event.preventDefault()

        const token = localStorage.getItem(ACCES_TOKEN_NAME)
        const config = {headers: {authorization: `Bearer ${token}`}}

        axios.put(`http://localhost:5000/places/user/`+ id + `/modificar`, modificarLugar, config)
        
        .then(response=>{
            console.log(response.data)
        })
        .catch(error =>{
            console.log(error.response.data)
        })
    }

    const changeInput= (event)=>{
        setModificarLugar({
            ...modificarLugar,
            [event.target.name] : event.target.value
        })
    }

    return (
        <div>
            <h1>Modificar un lugar</h1>

            <form action="POST" onSubmit={editarRuta} encType="multipart/form-data" >
                
                <p>Nombre</p>
                <input name="name" type="text" value={modificarLugar.name} onChange={changeInput} />
                <p>Imagen</p>
                <input name="image" type="file" accept="image/*" value={modificarLugar.image} onChange={changeInput} />
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
                <button className="btn btn-primary" type= "submit" onClick={editarRuta}>Modificar lugar</button>
                </div>
            </form>

        </div>
    )
}

export default Modify;