import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Cookies from 'js-cookie';
import { Redirect } from "react-router-dom";

import {URL_API} from '../App';

class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
          alertShow: false, alertMessage : "", alertVariant:"",//Affichage, message et type de l'alerte
          email: "", password : "", //Input mail et password
          connected : false
        };
      }

      sendLogin(event) {
        event.preventDefault();
        const axios = require('axios').default;  //Requêtes HTTP
        const sha256 = require('hash-anything').sha256; //Hash du mdp
        const url = URL_API+'getPrenom.php?mail='+this.state.email+'&password='+sha256(this.state.password);
        axios.get(url)
        .then(res => {
          if(res.data.id>0){
            //Se connecter
            Cookies.set("ID",res.data.id);
            Cookies.set("KEY",res.data.key);
            console.log("Vous êtes connecté, redirection vers la page principale !");
            this.setState({
              connected:true
            });
          }else{
            //Affichage en rouge du message de mdp incorrect
            console.log(res);
            this.setState({alertShow:true,alertMessage:"Adresse mail ou mot de passe incorrect.",alertVariant:"danger"});
          }
        })
        .catch(err => {
          console.log(err);
          //Affichage en jaune qu'il y a une erreur dans la requête
          this.setState({alertShow:true,alertMessage:"Une erreur s'est produite.",alertVariant:"warning"});
        });
      }
     
      inputChange(event) {
        event.preventDefault();
        /* Mise à jour des valeurs des inputs */
        const { name, value } = event.target;
        this.setState({
          [name]: value
        })
      }

    render(){
        if(this.state.connected){
          return(<Redirect to='/principale'/>);
        }
      return(
        <div>
          {/* Alert affichée lorsque le couple (e-mail,mdp) n'est pas trouvé dans la base de donnée */}
          <Alert
          variant={this.state.alertVariant} 
          id="AlertIncorrect" 
          show={this.state.alertShow} 
          onClose={() => this.setState({alertShow:false})}
          dismissible>
            {this.state.alertMessage}
          </Alert>

          {/* Formulaire de connexion */}
          <form onSubmit={event => this.sendLogin(event)}>
            <input className="input"
              name="email"
              type="text"
              placeholder="Ton adresse e-mail"
              value={this.state.email}
              onChange={event => this.inputChange(event)} 
            />
            <br />
            <br />
            <input className="input"
              name="password"
              type="password"
              placeholder="Ton mot de passe"
              value={this.state.password}
              onChange={event => this.inputChange(event)} 
            />
            <br />
            <button className="btn btn-danger" type="submit">Connexion</button>
          </form>

          {/* Mot de passe oublié, redirection à définir, accueil pour l'instant */}
          <NavLink className="text-pink" to="/" >Mot de passe oublié ?</NavLink>
        </div>
      );
    }
}

export default Login;