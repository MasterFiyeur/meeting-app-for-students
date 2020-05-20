import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert'

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
        <div>
          {/* Alert affichée lorsque l'e-mail et le mdp ne sont pas trouvé dans la base de donnée */}
          <Alert variant="danger" id="AlertIncorrect" show={this.state.show}>
            Adresse mail ou mot de passe incorrect.
          </Alert>

          {/* Proposition de s'enregistrer s'il n'est pas encore dans la BDD */}
          <p>Tu n'as toujours pas de compte ? <a href="/register" >Je cours m'en faire un !</a></p>
          <h2>Connexion</h2>
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

          {/* Mot de passe oublié, redirection à définir accueil pour l'instant */}
          <a href="/" >Mot de passe oublié ?</a>
        </div>
      );
    }
}

export default Login;