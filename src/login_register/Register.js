import React, { Component } from 'react';

class Register extends Component{
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
        <h2>Création du compte</h2>
          {/* Formulaire d'enregistrement de la personne' */}
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
            <label htmlFor="Student_Card">Carte étudiante :</label>
            <br/>
            <input type="file" name="StudentCard" id="Student_Card"/>{/* Faire tuto https://www.youtube.com/watch?v=sp9r6hSWH_o */}
            <br/>
            <button type="submit">S'enregister</button>
          </form>
        </div>
      );
    }
}

export default Register;