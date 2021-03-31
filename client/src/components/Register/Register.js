import axios from 'axios'
import {useEffect, useState} from 'react'

const Register = ()=>{

    const [register, newRegister]= useState()

    useEffect(()=>{
        axios.post('http://localhost:5000/register')
        .then(response => newRegister(response.data))
    })


    return(

        <h1>Registro</h1>

    )



}

export default Register;