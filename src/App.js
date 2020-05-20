import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar/NavBar'
import Accueil from './Accueil/Acceuil'
import Login from './login_register/Login'
import Register from './login_register/Register'


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Accueil} />
            {/* Ici faut voir mais je pense que ça serait intéressant de mettre le Login
            et le Register dans le composant Accueil. Genre dans Accueil on met un state 0,1,2 
            0 -> Accueil avec boutons Login et Register
            1 -> Accueil avec au milieu le composant Login
            2 -> Accueil avec au milieu le composant Register 
            Théo le fera la prochaine fois  */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />

          </Switch>
          <NavBar />
        </div>
      </BrowserRouter>
    );
  }
}


export default App;