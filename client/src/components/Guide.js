import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

const Guide = (props) => {

    const [lugar, setLugar] = useState([])
    console.log(lugar)
    useEffect(() => {

        axios.get('http://localhost:5000/guide')
            .then(response => setLugar(response.data))
    }, [])

    return (
        <div>
            <h1>Rutas turísticas</h1>
            {
                lugar.map((item, index) =>
                    <div key={index}>
                        {/* <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary" type="button">{item.name}</button>
                        </div> */}

                        <h3>{item.name}</h3>
                        <Link to={'/placesById/' + item._id} >Saber más</Link>
                    </div>
                )
            }

        </div>
    )
}
export default Guide;