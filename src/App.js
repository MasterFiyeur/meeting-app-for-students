import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Accueil from './Accueil/Acceuil';

//Ici il faut export le lien de la bdd

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Accueil} />

          </Switch>
          <NavBar />
        </div>
      </BrowserRouter>
    );
  }
}


export default App;
export const URL_API = 'http://localhost/Projet/projet-web/src/projet-web_bdd/'