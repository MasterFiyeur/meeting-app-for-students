import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Accueil from './Accueil/Acceuil';
import Preference from './Profil/Preference';
//Ici il faut export le lien de la bdd

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/" exact component={Accueil} />
            <Route path="/preference" exact component={Preference} />
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}


export default App;

//J'ai enlevé le fichier projet-web_bdd et mis les fichiers dans /src/api
export const URL_API = 'http://localhost/Projet/projet-web/src/api/';
