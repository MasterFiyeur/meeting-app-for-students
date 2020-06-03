import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import {URL_API} from '../App';

import Login from './Login'
import Register from './Register'
import NewMatch from '../messagerie/newMatch';

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
           connected : false
        };
    }

    /**
     * Page initialisée
     */
    componentDidMount(){
        /* Vérif des cookies ID et KEY */
        this.verifConnexion();
    }

    /**
     * Met à jour l'état connected selon la véracité 
     * du couple (Cookie.get("ID"),Cookie.get("KEY"))
     */
    verifConnexion() {
        const url = URL_API+'isConnected.php';
        const axios = require('axios').default;  //Requêtes HTTP
        let config = {
            headers: {
            logginid: Cookies.get("ID"),
            logginkey: Cookies.get("KEY")
            }
        }
        axios.get(url,config)
        .then(res => {
            if(res.data.connect){ //Mise à jour de connected si réponse positive 
                this.setState({
                    connected:true
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
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

    /**
     * Retourne un l'affichage de la page d'accueil.
     * - Deux boutons : Connexion & Création du compte
     * - L'affichage dépend de this.state.show
     */
    render(){
        /* Utilisateur redirigé si connecté */
        if(this.state.connected){
            return <Redirect to='/principale'/> //Renvoi à la page principale
        }
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
                        <NewMatch />
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