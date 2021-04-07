import {ACCES_TOKEN_NAME} from "../constants/constants"
import { withRouter, Link } from "react-router-dom";
import './Perfil.css'
import logo from '../../assets/flecha.jpeg' 

const Perfil =(props)=>{

    const logout = ()=>{
        localStorage.removeItem(ACCES_TOKEN_NAME)
       props.history.push('/')
    }
    const redirectToLugaresCreados = () =>{
        props.history.push('/createdplaces')
    }
    const redirectToFavoritos = () =>{
        props.history.push('/favoritos')
    }
    const redirectToHome = () =>{
        props.history.push('/home')
    }

    return(
        <div>
            <div className="atras" >
            <img onClick={()=>redirectToHome()} src={logo} alt="boton atrás"></img>
            </div>
            <div className="lugares-fav"> 
            <div className="card">
                <div className="card-body">
                <h1 onClick={()=>redirectToLugaresCreados()}>Lugares Creados</h1>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
            <h1 onClick={()=>redirectToFavoritos()}>Favoritos</h1>
            </div>
            </div>
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-primary me-md-2" onClick={()=> logout()}>Cerrar Sesión</button>
            </div>

        </div>
    )
}
export default withRouter (Perfil)