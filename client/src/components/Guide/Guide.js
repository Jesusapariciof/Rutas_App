import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './Guide.css'

const Guide = (props) => {

    const [lugar, setLugar] = useState([])
    console.log(lugar)
    useEffect(() => {

        axios.get('http://localhost:5000/guide')
            .then(response => setLugar(response.data))
    }, [])

    return (
        <div className="fondo-guia">
            <br></br>
            {
                lugar.map((item, index) =>
                    <div  key={index}>
                        {/* <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary" type="button">{item.name}</button>
                        </div> */}
                        <div className="guia">
                        {/* <div className="d-grid gap-2 col-6 mx-auto"> */}
                        {/* <h3>{item.name}</h3> */}
                      <button className="btn btn-outline-light"> <Link className="saber" to={'/placesById/' + item._id} ><h5>{item.name} </h5> </Link> </button> 
                        </div>
                    </div>
                    // </div>
                )
            }

        </div>
    )
}
export default Guide;