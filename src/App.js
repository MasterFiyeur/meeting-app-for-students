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
            <Preference/>
          </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}


export default App;

export const URL_API = 'http://localhost/projet-web/projet-web_bdd/'
