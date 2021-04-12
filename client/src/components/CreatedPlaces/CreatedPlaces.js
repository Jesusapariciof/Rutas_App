import axios from 'axios'
import { useEffect, useState } from 'react'
import { ACCES_TOKEN_NAME } from "../constants/constants"
import { withRouter, Link } from "react-router-dom";
import './CreatedPlaces.css'
import logo from '../../assets/flecha.jpeg'

const CreatedPlace = (props) => {

    const [user, setUser] = useState(null)


    useEffect(() => {
        const token = localStorage.getItem(ACCES_TOKEN_NAME)
        console.log(token)
        axios.get(`http://localhost:5000/user/miperfil`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUser(response.data);

            })
            .catch(err => {
                console.log(err.response);
            }
            );
    }, []);




    const handleDeletePlace = (id) => {
        axios.delete(`http://localhost:5000/places/user/` + id + `/delete`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt-token')}`
            }
        })
            .then(response => {
                // setUser(response.data)
                console.log(response.data)
                redirectToCreatedPlaces()
            })

    }

    const redirectToCreatedPlaces = ()=>{
        props.history.push('/miperfil')}

    const redirectToHome = () =>{
        props.history.push('/home')
    }

    // const logout = () => {
    //     localStorage.removeItem(ACCES_TOKEN_NAME)
    //     props.history.push('/')
    // }


    return (
        <div className="fondo-creados">
             
            {/* <img className="atras" onClick={()=>redirectToHome()} src={logo} alt="boton atrás"></img> */}
            
            {/* <button onClick={() => logout()}>Cerrar Sesión</button> */}
            <div className="lugarescreados">
            <h1>Lugares Creados</h1>
            </div>

            {user &&
                <div>
                    
                        {user.lugaresCreados.map(lugar => {
                            return (
                                <div className="listalugares">
                                <div key={lugar._id} className="lugares">

                                    <img src={`http://localhost:5000/storage/${lugar.image}`} className="card-img-top" alt="Foto_lugar" />
                                    <div>
                                        <h3>{lugar.name}</h3>
                                        <div className="acciones">
                                        <button className="btn btn-warning"> < Link className="modificar" to={'/modify/' + lugar._id} >Modificar</Link> </button>
                                        <button className="btn btn-danger" onClick={() => handleDeletePlace(lugar._id)}>Eliminar</button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            )
                        })}
                    
                </div>




            }

        </div>

    )
}

export default withRouter(CreatedPlace);
