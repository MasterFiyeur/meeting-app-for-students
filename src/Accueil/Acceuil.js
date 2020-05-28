import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import Login from '../login_register/Login'
import Register from '../login_register/Register'

class Accueil extends Component{
    constructor(props) {
        super(props);

        this.state = {
            show: 0, 
            /* Correspondance show
            * 0 -> Accueil
            * 1 -> Accueil + Login
            * 2 -> Accueil + Register 
            */
        };
    }
    
    /**
     * Changement du state.show
     * @param {*} etat : attribut la valeur etat à state.show
     */
    changeShow(etat){
        this.setState({
            show: etat
        })
    }

    render(){
        return(
            <div>
                <h1 className="text-blue">RENCONTRES, DISCUSSIONS,</h1>
                <h2 className="text-purp">ET VOUS ? </h2>
                <h2 className="text-blue">QUI ALLEZ-VOUS ETUDIER ?</h2>
                
                {/* show = 0 -> on affiche deux bouton Login et Register */}
                {this.state.show === 0 && 
                    <div className="btn-group-vertical">
                        <button className="btn btn-danger" onClick={etat => this.changeShow(1)}>Se connecter</button>
                        <br/>
                        <button className="btn btn-danger" onClick={etat => this.changeShow(2)}>Se créer un compte</button>
                    </div>
                }
                {/* show = 1 -> on affiche Login */}
                {this.state.show === 1 && 
                    <div>
                        {/* Bouton de retour */}
                        <button className="close" onClick={etat => this.changeShow(0)} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        {/* Proposition de s'enregistrer s'il n'est pas encore dans la BDD */}
                        <p className="text-danger">Tu n'as toujours pas de compte ?&nbsp;
                            {/* Utilisation du NavLink pour ses propriétés graphiques */}
                            <NavLink className="text-pink" to="/" onClick={etat => this.changeShow(2)}>Je cours m'en faire un !</NavLink>
                        </p>
                        <h2 className="text-success">Connexion</h2>
                        <Login />
                    </div>
                }
                {/* show = 2 -> on affiche Register */}
                {this.state.show === 2 && 
                    <div>
                        {/* Bouton de retour */}
                        <button className="close" onClick={etat => this.changeShow(0)} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h2 className="text-success">Création du compte</h2>
                        <Register />
                    </div>
                }
            </div>
        );
    }
}

export default Accueil;