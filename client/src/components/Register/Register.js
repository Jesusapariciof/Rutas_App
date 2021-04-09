import axios from 'axios'
import {useState} from 'react'
import {ACCES_TOKEN_NAME} from '../constants/constants'
import { withRouter } from "react-router-dom";
import './Register.css'
import logo from '../../assets/mapa-rutas_caceres.png' 

const Register = (props)=>{

    const [register, setNewRegister]= useState({username:"", email:"", password:""})

    const usernameRegister = (event) => setNewRegister({...register, username:event.target.value})
    const emailRegister = (event) => setNewRegister({...register, email: event.target.value})
    const passwordRegister = (event) => setNewRegister({...register, password: event.target.value})

    const submitRegister = (e) =>{
     e.preventDefault()

        axios.post('http://localhost:5000/register', {...register})
        .then(response =>{
            setRegisterCorrecto(response.data.message)
            localStorage.setItem(ACCES_TOKEN_NAME, response.data.token)
             console.log(response.data)
             redirectToLogin()
        })

        .catch((error)=>{
            setErrorRegister(error.response.data)
            console.log(error.response.data)
                
    })
    
         }
    
        const [errorRegister, setErrorRegister]=useState("")
        const [registerCorrecto, setRegisterCorrecto]=useState("")
    
         const redirectToLogin = () =>{
        props.history.push('/')
         }

    return(

         <div className="bloque">
         <img className="logo" src={logo} alt="img"></img>
     <div className="registro">
     <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
     <h1>Registro</h1> 
     <form action = "POST" onSubmit={submitRegister}>

        <div className="usuario">
        <p>Usuario</p>
        <input type="text" 
         name="username" 
         value={register.username} 
         onChange={usernameRegister}/>
        </div>

        <div className="email">
        <p>Email</p>
         <input type="email" 
         name="email" 
         value={register.email} 
         onChange={emailRegister}/>
         </div>

         <div className="contraseña">
        <p>Contraseña</p>
         <input type="password" 
         name="password" 
         value={register.password} 
         onChange={passwordRegister}/>
         </div>
         <br></br>

         <button className="btn btn-primary btn-lg" type="submit" onClick={submitRegister}>Registrarse</button>
         <div className="mt-2">
                <span>¿Ya tienes cuenta? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Log in</span>
            </div>
         {errorRegister && <div><p className="error">{errorRegister}</p></div>}
         

     </form>
     </div>
     </div>
         </div>

    )



}

export default withRouter(Register);
