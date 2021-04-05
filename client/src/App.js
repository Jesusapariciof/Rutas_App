
import { Route } from 'react-router-dom';
import './App.css';
import Places from './components/Places'
import GuideID from './components/Guide'
import PlacesById from './components/PlacesById';
import { BrowserRouter as Router, Switch } from "react-router-dom";
import NewPlace from './components/NewPlaces/NewPlace';
import Register from './components/Register/Register'
import Registration from './components/Login/Login';
import Login from './components/Login/Login';
import useToken from './hooks/hooks'
import Guide from './components/Guide'
import Perfil from './components/Perfil/Perfil';



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
          <Route path = "/perfil" component = {Perfil} />
          <Route path="/register" component = {Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
