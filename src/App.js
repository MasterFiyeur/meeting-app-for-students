import React from 'react';
import logo from './logo.svg';
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
          <Switch>
            <Route path="/" exact component={Accueil} />
            <Preference/>
          </Switch>
          <NavBar />
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
export const URL_API = 'http://localhost/projet-web/projet-web_bdd/'