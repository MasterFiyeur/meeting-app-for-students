import React from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Accueil from './Accueil/Acceuil';
import Preference from './Profil/Preference';
import Filtre from './Profil/Filtre';
import Position from './Position/Position';
import Pageprincipale from './Pageprincipale/Pageprincipale';
import About from './About/About'
import Contact from './Contact/Contact';
import ListMatch from './messagerie/listeMatch'
class App extends React.Component {
  render() {
    return (
      <HashRouter basename={"/"}>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/" exact component={Accueil} />
            <Route path="/preference" exact component={Preference} />
            <Route path="/filtre" exact component={Filtre} />

            <Route path="/position" exact component={Position} />
            <Route path="/principale" exact component={Pageprincipale} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/mesmatch" component={ListMatch} />

          </Switch>
          
        </div>
      </HashRouter>
    );
  }
}


export default App;

//J'ai enlevé le fichier projet-web_bdd et mis les fichiers dans /src/api
export const URL_API = 'https://projetsiteeisti.yj.fr/api/';

