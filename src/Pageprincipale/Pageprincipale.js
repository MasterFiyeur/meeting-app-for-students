import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";
import {URL_API} from '../App';

class Pageprincipale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: true //true : utilisateur connecté; false : utilisateur non connecté
        }
      }
    
    /**
     * Page mise à jour
     */
    componentDidMount(){
        /* Vérif des cookies ID et KEY */
        this.verifConnexion();
        //Il est plus judicieux de faire cette vérif dans PHP
        //lors de chaque requêtes avec une variable renvoyé pour
        //pouvoir rediriger si le couple n'est pas bon
    }
    
    /**
     * Met à jour l'état connected selon la véracité 
     * du couple (Cookie.get("ID"),Cookie.get("KEY"))
     */
    verifConnexion() {
        /* A executer à chaque fois que l'on veut utiliser l'id :
            this.verifConnexion();
            if(this.state.connected){
                alors on est assuré de l'identité du user
            }*/
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
            console.log("Connecté ? "+res.data.connect); //Réponse dans la console
            if(!res.data.connect){ //Mise à jour de connected si réponse négative
                this.setState({
                    connected:false
                })
            }
        })
        .catch(err => {
            console.log(err);
        });
        if(!(Cookies.get("ID")>0)){//Si Cookies.get("ID") n'existe pas on se déconnecte
            this.setState({
                connected:false
            })
        }
    }
    
    /**
     * Déconnecte l'utilisateur en changeant l'état connected
     */
    deconnect(){
        this.setState({
            connected:false
        })
    }

    /**
     * Test le couple (ID,KEY) en 
     * appelant la fonction verifConnexion()
     */
    test(){
        this.verifConnexion();
    }


    /**
     * Rendu
     */
    render(){
        /* Utilisateur redirigé si non connecté */
        if(!this.state.connected){
            Cookies.remove("ID");//Supression du cookie
            Cookies.remove("KEY");//Suppression du cookie
            return (<Redirect to='/'/>); //Renvoi à la page de connexion
        }
      return(
        <div>
            <button 
            className="btn btn-danger" 
            onClick={() => this.deconnect()}
            >Déconnexion
            </button>
            <br/>
            <button 
            className="btn btn-danger" 
            onClick={() => this.test()}
            >Tester (id,key)
            </button>
        </div>
      );
    }
}


export default Pageprincipale;

