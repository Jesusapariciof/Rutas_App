import { withRouter } from "react-router-dom";
import './Home.css'
import fondo from '../../assets/avenue-3464777_1280.jpeg' 


const Home = (props)=>{

    const redirectToPerfil = () => {
        props.history.push('/miperfil');
    };
    const redirectToGuias = () => {
        props.history.push('/guide');
    };

    return(
        <div className="fondo">
        
        <div className="botones">
        <div className="d-grid gap-2">
            <button className="btn btn-primary" onClick={()=>redirectToPerfil()}>Mi Perfil</button>
            <button className="btn btn-primary" onClick={()=> redirectToGuias()}>Guías Turísticas</button>
        </div>
        </div>
        </div>
    )
}
export default withRouter(Home);