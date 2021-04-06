import axios from 'axios'
import {useState} from 'react'
import {ACCES_TOKEN_NAME} from '../constants/constants'
import { withRouter } from "react-router-dom";

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
    
         }
    
        const [errorRegister, setErrorRegister]=useState("")
        const [registerCorrecto, setRegisterCorrecto]=useState("")
    
         const redirectToLogin = () =>{
        props.history.push('/')
         }

    return(

         <div>
        <h1>Registro</h1> 
     
     <form action = "POST" onSubmit={submitRegister}>

        <p>Usuario</p>
        <input type="text" 
         name="username" 
         value={register.username} 
         onChange={usernameRegister}/>
        <p>Email</p>
         <input type="email" 
         name="email" 
         value={register.email} 
         onChange={emailRegister}/>
        <p>Contraseña</p>
         <input type="password" 
         name="password" 
         value={register.password} 
         onChange={passwordRegister}/>
         <br></br>

         <button type="submit" onClick={submitRegister}>Registrarse</button>
         {errorRegister && <div><p>{errorRegister}</p></div>}
         {registerCorrecto && <div><p>{registerCorrecto}</p></div>}


     </form>
     </div>

    )



}

export default withRouter(Register);
