import axios from 'axios'
import {useState} from 'react'
import {ACCES_TOKEN_NAME} from '../constants/constants'
import { withRouter } from "react-router-dom";
import '../Login/login.css'
import logo from '../../assets/mapa-rutas_caceres.png' 

const Login = (props)=>{
const [userLogin, setUserLogin]= useState({email:"", password:""})

const emailLogin = (event) => setUserLogin({...userLogin, email: event.target.value})
const passwordLogin = (event) => setUserLogin({...userLogin, password: event.target.value})

const submitLogin = (e) =>{

    e.preventDefault()
    axios.post('/login', {...userLogin})
    .then(response =>{
        setLoginCorrecto(response.data.message)
         localStorage.setItem(ACCES_TOKEN_NAME, response.data.token)
         redirectToHome()
         
    })
    .catch((error)=>{
            setErrorLogin(error.response.data)
            console.log(error.response.data)
                
    })


}
    const [errorLogin, setErrorLogin]=useState("")
    const [loginCorrecto, setLoginCorrecto]=useState("")
    
    const redirectToRegister = () => {
        props.history.push('/register');
    };
    const redirectToHome = () => {
        props.history.push('/home');
    };

    return(
        <div>
        <img className="logo" src={logo} alt="img"></img>
        <div className="formulario">
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
           <h1>Log in</h1> 
        

        <form action = "POST" onSubmit={submitLogin}>
           <div className="email">
            <label>Email</label>
            <input type="email" 
            name="email" 
            value={userLogin.email} 
            onChange={emailLogin}/>
            </div>

            <div className="contraseña">
            <label>Contraseña</label>
            <input type="password" 
            name="password" 
            value={userLogin.password} 
            onChange={passwordLogin}/>
            </div>
            
            <button className="btn btn-primary btn-lg" type="submit" onClick={submitLogin} >Iniciar Sesión</button>

            
            <div className="mt-2">
                <span>¿Aún no tienes cuenta? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Regístrate</span>
            </div>
    
            {errorLogin && <div><p className="error">{errorLogin}</p></div>}
          

        </form>
        </div>
        </div>
        </div>
    )

}

export default withRouter(Login)



