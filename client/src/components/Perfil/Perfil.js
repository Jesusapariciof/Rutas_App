import axios from 'axios'
import {useEffect, useState} from 'react'
import {ACCES_TOKEN_NAME} from "../constants/constants"
import { withRouter, Link } from "react-router-dom";
const Perfil = (props)=>{

     const [user, setUser]= useState(null)
     console.log(user)

     useEffect(() => {
        const token = localStorage.getItem(ACCES_TOKEN_NAME)
        console.log(token)
        axios.get(`http://localhost:5000/user/miperfil`,{
            headers:{
                authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data);
                setUser(response.data);
                
            })
            .catch(err => {
                console.log(err.response);
            }
            );
    }, []);

     const logout = ()=>{
         localStorage.removeItem(ACCES_TOKEN_NAME)
        props.history.push('/')
     }


    return(
        <div>
            <button onClick={()=> logout()}>Cerrar Sesión</button>
            <h1>Lugares Creados</h1>
            
               {user &&
                <div>
                    <ul>
                        {user.lugaresCreados.map(lugar =>{
                            return (
                                <div  className="lugares">
                        
                                <img src={`http://localhost:5000/storage/${lugar.image}`}className="card-img-top" alt="Foto_lugar" />
                                <div>
                                    <h3>{lugar.name}</h3>
                                    <Link to={'/modify/' + lugar._id} >Modificar</Link>
                                </div>
                               
                            </div>
                            )
                        })}
                    </ul>
                   </div>
                

                   
                    
            }
            
        </div>

    )
}

export default withRouter(Perfil);