// import axios from 'axios'
// import {useEffect, useState} from 'react'

// const Login = () =>{

//     const [email, setEmail] = useState()
//     const [password, setPassword] = useState()

// useEffect(()=>{

// axios({
//     method: 'post',
//     url: 'http://localhost:5000/login',
//     data: {
//       email, password
//     }
// })
// .then((response) => {
//     console.log(response);
//   }, (error) => {
//     console.log(error);
//   });


// },[])

// const handleSubmit = (event) =>{
//     event.preventDefault()
// const usuario = {email, password}
// console.log(usuario)
// }



// return(
//     <div>
//         <h1>Login</h1>
//         <form onSubmit={handleSubmit}>
//             <input type="email" name="email" onChange={event=>setEmail(event.target.value)}/>
//             <input type="password" name="password" onChange={event=>setPassword(event.target.value)} />
//             <button type="submit">Login</button>

//         </form>

//     </div>

// )


// }
// export default Login;

import axios from 'axios'
import {useState} from 'react'
import {ACCES_TOKEN_NAME} from '../constants/constants'

const Login = ()=>{
const [userLogin, setUserLogin]= useState({email:"", password:""})

const emailLogin = (event) => setUserLogin({...userLogin, email: event.target.value})
const passwordLogin = (event) => setUserLogin({...userLogin, password: event.target.value})

const submitLogin = (e) =>{

    e.preventDefault()
    axios.post('http://localhost:5000/login', {...userLogin})
    .then(response =>{
        setLoginCorrecto(response.data.message)
         localStorage.setItem(ACCES_TOKEN_NAME, response.data.token)
    })


}
    const [errorLogin, setErrorLogin]=useState("")
    const [loginCorrecto, setLoginCorrecto]=useState("")


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

            <button type="submit" onClick={submitLogin}>Iniciar Sesión</button>
            {errorLogin && <div><p>{errorLogin}</p></div>}
            {loginCorrecto && <div><p>{loginCorrecto}</p></div>}


        </form>
        </div>

    )

}

export default Login

// import React, { useState } from "react";
// import {AUTH_TOKEN} from "../constants/constants"


// async function loginUser(credentials) {
//     return fetch('http://localhost:5000/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })
//     .then(data => data.json())
// }

// export default function Login({ setToken }) {
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();

//     const handleSubmit = async e => {
//         e.preventDefault();
//         const token = await loginUser({
//             email,
//             password
//         });
//         setToken(token);
//     }

//   return (
//     <div className="login-wrapper">
//     <h1>Please Log In</h1>
//       <form onSubmit={handleSubmit}>
//         <fieldset>
//           <label>
//             <p>Email</p>
//             <input name="email" type="email" onChange={e => setEmail(e.target.value)} />
//           </label>
//         </fieldset>
//         <fieldset>
//           <label>
//             <p>Password</p>
//             <input name="password" type="password" onChange={e => setPassword(e.target.value)} />
//           </label>
//         </fieldset>
//         <button type="submit" >
//           LOG IN
//         </button>
//       </form>

//       <a href="/home"><p>Or create an account</p></a>
      
      
//     </div>
//   );
// }

