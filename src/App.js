import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar/NavBar'
import Accueil from './Accueil/Acceuil'
import Login from './login_register/Login'
import Register from './login_register/Register'

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