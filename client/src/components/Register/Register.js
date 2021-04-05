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

        <input type="text" 
         name="username" 
         value={register.username} 
         onChange={usernameRegister}/>

         <input type="email" 
         name="email" 
         value={register.email} 
         onChange={emailRegister}/>

         <input type="password" 
         name="password" 
         value={register.password} 
         onChange={passwordRegister}/>

         <button type="submit" onClick={submitRegister}>Registrarse</button>
         {errorRegister && <div><p>{errorRegister}</p></div>}
         {registerCorrecto && <div><p>{registerCorrecto}</p></div>}


     </form>
     </div>

    )



}

export default withRouter(Register);

// import React, { useState } from 'react';
// import { withRouter } from "react-router-dom";
// import {ACCES_TOKEN_NAME } from '../constants/constants';
// import axios from "axios";



// function Register(props) {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     const handleSubmitClick = (e) => {
//         e.preventDefault();
//         if (password === confirmPassword) {
//             sendDetailsToServer();
//         } else {
//             console.log('Passwords do not match');
//         }
//     };

//     const sendDetailsToServer = async () => {
//         if (!username.length && !email.length && !password.length) {
//             return console.log('Please enter valid username and password');
//         }


//         const payload = {
//             username,
//             email,
//             password,
//             passwordValidation: confirmPassword
//         };
//         try {
//             const response = await axios.post(`http://localhost:5000/register`, payload);
//             console.log(response);
//             if (!response.data.success) {
//                 return console.log(response.data);
//             }
//             console.log(response.data);
//             localStorage.setItem(ACCES_TOKEN_NAME, response.data.token);
//             redirectToHome();
//         }

//         catch (err) {
//             console.log(err);

//         }

//     };

//     const redirectToHome = () => {
//         props.history.push('/');
//     };
//     const redirectToLogin = () => {
//         props.history.push('/login');
//     };

//     return (
//         <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
//             <form>
//                 <div className="form-group text-left">
//                     <label htmlFor="username">Username</label>
//                     <input type="username"
//                         className="form-control"
//                         id="username"
//                         aria-describedby="usernameHelp"
//                         placeholder="Enter username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group text-left">
//                     <label htmlFor="exampleInputEmail1">Email address</label>
//                     <input type="email"
//                         className="form-control"
//                         id="email"
//                         aria-describedby="emailHelp"
//                         placeholder="Enter email"
//                         value={email}
//                         onChange={e => setEmail(e.target.value)}
//                     />
//                     <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
//                 </div>
//                 <div className="form-group text-left">
//                     <label htmlFor="exampleInputPassword1">Password</label>
//                     <input type="password"
//                         className="form-control"
//                         id="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={e => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <div className="form-group text-left">
//                     <label htmlFor="exampleInputPassword1">Confirm Password</label>
//                     <input type="password"
//                         className="form-control"
//                         id="confirmPassword"
//                         placeholder="Confirm Password"
//                         value={confirmPassword}
//                         onChange={e => setConfirmPassword(e.target.value)}
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="btn btn-primary"
//                     onClick={handleSubmitClick}
//                 >
//                     Register
//           </button>
//             </form>
//             <div className="mt-2">
//                 <span>Already have an account? </span>
//                 <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>
//             </div>
//         </div>
//     );
// };

// export default withRouter(Register);