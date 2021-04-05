import axios from 'axios'
import {useState} from 'react'
import {ACCES_TOKEN_NAME} from '../constants/constants'
import { withRouter } from "react-router-dom";

const Login = (props)=>{
const [userLogin, setUserLogin]= useState({email:"", password:""})

const emailLogin = (event) => setUserLogin({...userLogin, email: event.target.value})
const passwordLogin = (event) => setUserLogin({...userLogin, password: event.target.value})

const submitLogin = (e) =>{

    e.preventDefault()
    axios.post('http://localhost:5000/login', {...userLogin})
    .then(response =>{
        setLoginCorrecto(response.data.message)
         localStorage.setItem(ACCES_TOKEN_NAME, response.data.token)
         redirectToHome()
    })


}
    const [errorLogin, setErrorLogin]=useState("")
    const [loginCorrecto, setLoginCorrecto]=useState("")
    
    const redirectToRegister = () => {
        props.history.push('/register');
    };
    const redirectToHome = () => {
        props.history.push('/guide');
    };



    return(
        <div>
           <h1>Log in</h1> 
        
        <form action = "POST" onSubmit={submitLogin}>
            <input type="email" 
            name="email" 
            value={userLogin.email} 
            onChange={emailLogin}/>

            <input type="password" 
            name="password" 
            value={userLogin.password} 
            onChange={passwordLogin}/>

            <button type="submit" onClick={submitLogin} >Iniciar Sesión</button>

           
            <div className="mt-2">
                <span>¿Aún no tienes cuenta? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Regístrate</span>
            </div>
    

            {errorLogin && <div><p>{errorLogin}</p></div>}
            {loginCorrecto && <div><p>{loginCorrecto}</p></div>}


        </form>
        </div>

    )

}

export default withRouter(Login)



