
import { Route } from 'react-router-dom';
import './App.css';
import Places from './components/Places/Places'
import GuideID from './components/Guide/Guide'
import PlacesById from './components/PlacesById/PlacesById';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import NewPlace from './components/NewPlaces/NewPlace';
import Register from './components/Register/Register'
import Login from './components/Login/Login';
import useToken from './hooks/hooks'
import Guide from './components/Guide/Guide'
import Perfil from './components/Perfil/Perfil';
import Modify from './components/Modify/Modify';
import Home from './components/Home/Home';
import CreatedPlaces from './components/CreatedPlaces/CreatedPlaces';



function App() {

  // const { token, setToken } = useToken();

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }

  return (
      <Router>
      <div className="App">
        <Switch>
          <Route path= "/" exact component={Login} />
          <Route path= "/newplace" component={NewPlace} />
          <Route path="/place/:id" component={Places} />
          <Route path="/placesById/:id" component={PlacesById} />
          {/* <Route path = "placesById" component={PlacesById} /> */}
          <Route path="/guide" component={Guide} />
          <Route path = "/miperfil" component = {Perfil} />
          <Route path="/register" component = {Register} />
          <Route path="/modify/:id" component = {Modify} />
          <Route path="/home" component={Home} />
          <Route path="/createdplaces" component={CreatedPlaces} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
