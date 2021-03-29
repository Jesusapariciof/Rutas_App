
import { Route } from 'react-router-dom';
import './App.css';
import Places from './components/Places'
import GuideID from './components/Guide'
import PlacesById from './components/PlacesById';
import { BrowserRouter as Router, Switch } from "react-router-dom";


function App() {
  return (
    // <div className="App">
        /* <Guide />  */
       /* <Places /> 
       <PlacesById />  */
      <Router>
      <div className="App">
        <Switch>
          <Route path="/place" component={Places} />
          <Route path="/guideId" component={GuideID} />
          <Route path="/placesById" component={PlacesById} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
