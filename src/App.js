import React from 'react';
import './App.css';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Accueil from './Accueil/Acceuil';
import Preference from './Profil/Preference';
import Position from './Position/Position';

class App extends React.Component {
  render() {
    return (
      <HashRouter basename={"/"}>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/" exact component={Accueil} />
            <Route path="/preference" exact component={Preference} />
            <Route path="/position" exact component={Position} />
          </Switch>
          
        </div>
      </HashRouter>
    );
  }
}


export default App;

//J'ai enlevé le fichier projet-web_bdd et mis les fichiers dans /src/api
export const URL_API = 'https://projetsiteeisti.yj.fr/api/';

