import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
          show: false, //Affichage ou non de l'alerte
          email: null, //Valeur du input email
          password : null //Valeur du input password
        };
      }
     
      sendLogin(event) {
        event.preventDefault();
        alert("email: " + this.state.email+'\n'+"mdp :"+this.state.password);
        /* Affichage de l'alert */
        this.setState({
          show:true
        })
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
      return(
        <>
          {/* Alert affichée lorsque l'e-mail et le mdp ne sont pas trouvé dans la base de donnée */}
          <Alert variant="danger" id="AlertIncorrect" show={this.state.show}>
            Adresse mail ou mot de passe incorrect.
          </Alert>

          {/* Formulaire de connexion */}
          <form onSubmit={event => this.sendLogin(event)}>
            <input
              name="email"
              type="text"
              placeholder="Ton adresse e-mail"
              value={this.state.email}
              onChange={event => this.inputChange(event)} 
            />
            <br />
            <input
              name="password"
              type="password"
              placeholder="Ton mot de passe"
              value={this.state.password}
              onChange={event => this.inputChange(event)} 
            />
            <br />
            <button type="submit">Connexion</button>
          </form>

          {/* Mot de passe oublié, redirection à définir, accueil pour l'instant */}
          <NavLink to="/" >Mot de passe oublié ?</NavLink>
        </>
      );
    }
}

export default Login;